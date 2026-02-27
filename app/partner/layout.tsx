import Sidebar from "@/components/partner/Sidebar";

export default function PartnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#020617]">
      <Sidebar />
      <div className="lg:ml-64 min-h-screen">
        <main className="p-4 md:p-8 lg:p-10 max-w-[1600px] mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
