import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import pool from "@/lib/db";
import bcrypt from "bcryptjs";
import { RowDataPacket } from "mysql2";

// Fix for NextAuth in preview environment
if (process.env.APP_URL && !process.env.NEXTAUTH_URL) {
  process.env.NEXTAUTH_URL = process.env.APP_URL;
}

interface User extends RowDataPacket {
  id: number;
  email: string;
  password_hash: string;
  first_name: string;
  last_name: string;
  role_id: number;
  role_name?: string;
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const [rows] = await pool.query<User[]>(
            `SELECT u.*, r.name as role_name 
             FROM users u 
             JOIN roles r ON u.role_id = r.id 
             WHERE u.email = ?`,
            [credentials.email]
          );

          const user = rows[0];

          if (!user) {
            return null;
          }

          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password_hash
          );

          if (!isPasswordValid) {
            return null;
          }

          return {
            id: user.id.toString(),
            email: user.email,
            name: `${user.first_name} ${user.last_name}`,
            role: user.role_name,
          };
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      }
    })
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        try {
          // Check if user exists
          const [rows] = await pool.query<User[]>(
            "SELECT id, role_id FROM users WHERE email = ?",
            [user.email]
          );

          if (rows.length === 0) {
            // Create user if not exists
            const googleProfile = profile as any;
            const firstName = googleProfile?.given_name || user.name?.split(" ")[0] || "User";
            const lastName = googleProfile?.family_name || user.name?.split(" ").slice(1).join(" ") || "";
            
            const [result] = await pool.query<any>(
              "INSERT INTO users (first_name, last_name, email, role_id, is_active) VALUES (?, ?, ?, 2, 1)",
              [firstName, lastName, user.email]
            );
            user.id = result.insertId.toString();
            user.role = "USER";
          } else {
            user.id = rows[0].id.toString();
            // Fetch role name
            const [roleRows] = await pool.query<any[]>(
              "SELECT name FROM roles WHERE id = ?",
              [rows[0].role_id]
            );
            user.role = roleRows[0]?.name || "USER";
          }
          return true;
        } catch (error) {
          console.error("Google sign in error:", error);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string;
        session.user.id = token.id as string;
      }
      return session;
    }
  },
  pages: {
    signIn: "/login",
  },
  cookies: {
    sessionToken: {
      name: `__Secure-next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'none',
        path: '/',
        secure: true
      }
    },
    callbackUrl: {
      name: `__Secure-next-auth.callback-url`,
      options: {
        sameSite: 'none',
        path: '/',
        secure: true
      }
    },
    csrfToken: {
      name: `__Host-next-auth.csrf-token`,
      options: {
        httpOnly: true,
        sameSite: 'none',
        path: '/',
        secure: true
      }
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET || "fallback_development_secret_do_not_use_in_production",
};
