import { About } from "@/components/landing/About";
import { BankStrip } from "@/components/landing/BankStrip";
import { Features } from "@/components/landing/Features";
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
      </main>
    </>
  );
}
