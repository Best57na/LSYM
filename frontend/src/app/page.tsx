import { About } from "@/components/landing/About";
import { BankStrip } from "@/components/landing/BankStrip";
import { CtaBanner } from "@/components/landing/CtaBanner";
import { Features } from "@/components/landing/Features";
import { Footer } from "@/components/landing/Footer";
import { Hero } from "@/components/landing/Hero";
import { Navbar } from "@/components/landing/Navbar";
import { Pricing } from "@/components/landing/Pricing";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <BankStrip />
        <Features />
        <Pricing />
        <About />
        <CtaBanner />
      </main>
      <Footer />
    </>
  );
}
