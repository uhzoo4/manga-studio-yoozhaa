import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PanelGrid from "@/components/PanelGrid";
import Characters from "@/components/Characters";
import Features from "@/components/Features";
import Cta from "@/components/Cta";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-[var(--color-manga-white)]">
      <Navbar />
      <section id="story"><Hero /></section>
      <section id="panels"><PanelGrid /></section>
      <section id="characters"><Characters /></section>
      <section id="action"><Features /></section>
      <section id="join"><Cta /></section>
      <Footer />
    </main>
  );
}