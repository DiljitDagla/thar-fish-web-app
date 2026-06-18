import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { AuthGuard } from "@/components/auth-guard";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </AuthGuard>
  );
}
