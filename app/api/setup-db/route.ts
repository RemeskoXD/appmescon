import { NextResponse } from "next/server";
import pool from "@/lib/db";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const sqlFilePath = path.join(process.cwd(), "databaze.sql");
    const sqlFileContent = fs.readFileSync(sqlFilePath, "utf-8");

    // Execute the entire SQL file content
    await pool.query(sqlFileContent);

    // Also run the migration for leads and additional columns
    const columnsToAdd = [
      "INSERT IGNORE INTO roles (name, description) VALUES ('CLIENT', 'Zákaznický účet pro přístup do klientského portálu.')",
      "ALTER TABLE users ADD COLUMN IF NOT EXISTS phone VARCHAR(50) DEFAULT NULL",
      "ALTER TABLE users ADD COLUMN IF NOT EXISTS company_name VARCHAR(255) DEFAULT NULL",
      "ALTER TABLE users ADD COLUMN IF NOT EXISTS ico VARCHAR(20) DEFAULT NULL",
      "ALTER TABLE users ADD COLUMN IF NOT EXISTS dic VARCHAR(20) DEFAULT NULL",
      "ALTER TABLE users ADD COLUMN IF NOT EXISTS street VARCHAR(255) DEFAULT NULL",
      "ALTER TABLE users ADD COLUMN IF NOT EXISTS city VARCHAR(100) DEFAULT NULL",
      "ALTER TABLE users ADD COLUMN IF NOT EXISTS zip VARCHAR(20) DEFAULT NULL",
      "ALTER TABLE users ADD COLUMN IF NOT EXISTS bank_account VARCHAR(100) DEFAULT NULL",
      "ALTER TABLE users ADD COLUMN IF NOT EXISTS referral_code VARCHAR(50) DEFAULT NULL UNIQUE",
      `CREATE TABLE IF NOT EXISTS leads (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT DEFAULT NULL,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50) DEFAULT NULL,
        source VARCHAR(50) DEFAULT 'REGISTRATION',
        status ENUM('NEW', 'CONTACTED', 'CONVERTED', 'REJECTED') DEFAULT 'NEW',
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
      `CREATE TABLE IF NOT EXISTS portfolio_items (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        url VARCHAR(255) NOT NULL,
        image_url VARCHAR(255) DEFAULT NULL,
        description TEXT,
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
      `CREATE TABLE IF NOT EXISTS customer_history (
        id INT AUTO_INCREMENT PRIMARY KEY,
        customer_id INT NOT NULL,
        created_by INT DEFAULT NULL,
        action_type VARCHAR(50) NOT NULL,
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE,
        FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
      `CREATE TABLE IF NOT EXISTS meetings (
        id INT AUTO_INCREMENT PRIMARY KEY,
        customer_id INT NOT NULL,
        organizer_id INT NOT NULL,
        meeting_date DATETIME NOT NULL,
        description TEXT,
        status VARCHAR(50) DEFAULT 'PLANNED',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE,
        FOREIGN KEY (organizer_id) REFERENCES users(id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`
    ];

    for (const sql of columnsToAdd) {
      try {
        await pool.query(sql);
      } catch (e) {
        console.error(`Error executing migration:`, e);
      }
    }

    // Seed portfolio items if empty
    const [portfolioCount]: any = await pool.query("SELECT COUNT(*) as count FROM portfolio_items");
    if (portfolioCount[0].count === 0) {
      const initialPortfolio = [
        "https://lenaivanic.cz", "https://www.martinfromel.cz", "https://instavgroup.cz",
        "https://kraslirna.cz", "https://revizone.cz/", "https://svojan.cz", "https://svojan.eu",
        "https://pojisteni-zdravi.cz/", "https://www.kvetinarstvipetry.cz/", "https://hugofin.cz",
        "https://brucounek.cz/", "https://poctiva-flotila.cz/", "https://vaclavikjan.cz/",
        "https://kuryrexpres.cz", "https://kuryrexpress.cz", "https://laserdesignbrno.cz",
        "https://chalupaorechov.cz/", "https://daspra-rent.cz/", "https://apartmanypodprasivou.cz/",
        "https://gtauta.cz/", "https://ucetnictvi-vesela.cz/", "https://www.regalovesystemy.cz/",
        "https://www.koraldesign.com/", "https://jantrulley.cz/", "https://redant.cz/",
        "https://janaki.cz/", "https://kovovyroba-chlad.cz/", "https://stavimprovas.cz/",
        "https://truhlarstvihubinka.cz/", "https://pilajakubin.cz/", "https://hansbau.cz/",
        "https://stavime.hansbau.cz/", "https://jaflicars.cz/", "http://www.tuttobuono.cz",
        "https://ghbaugroup.com/", "https://restaurace-burgsberg.cz/", "https://alexstavennt.cz/",
        "https://www.kruska-polak.de/", "https://akbauer.cz/", "https://mmmetodika.cz/",
        "https://taago.cz/", "https://lomega.cz/", "https://vachystrechy.cz/",
        "https://www.akfranc.cz/", "https://autoskolaprochazka-plzen.cz/", "https://www.pizzanemanice.cz/",
        "https://www.bruci.cz/", "https://momsvicky.cz", "https://volfrybarstvi.cz",
        "https://nejstavitelstvi.cz/", "https://sebmaxstav.cz", "https://franzjosefdecin.cz",
        "https://zahradnickysen.cz", "https://gsqweld.com", "https://www.rson.cz/",
        "https://davidzelina.cz", "https://vdtrans.cz/", "https://daperhair.com",
        "https://cooltechnics.cz", "https://cirkev-panny-marie.online/"
      ];

      for (const url of initialPortfolio) {
        let cleanUrl = url.trim();
        if (!cleanUrl.startsWith('http')) cleanUrl = 'https://' + cleanUrl;
        const title = cleanUrl.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
        const imageUrl = `https://image.thum.io/get/width/600/crop/800/${cleanUrl}`;
        await pool.query(
          "INSERT INTO portfolio_items (title, url, image_url, description) VALUES (?, ?, ?, ?)",
          [title, cleanUrl, imageUrl, "Webová prezentace na míru."]
        );
      }
    }

    return NextResponse.json({ success: true, message: "Database setup completed successfully from databaze.sql and migrations." });
  } catch (error: any) {
    console.error("Setup DB error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
