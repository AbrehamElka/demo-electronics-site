import { Header } from "@/components/Header";
import { Footer } from "@/components/footer";
import { ContactSection } from "@/components/contact-section";

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
