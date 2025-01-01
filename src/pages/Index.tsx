import { useEffect } from "react";
import HeroSection from "@/components/HeroSection";
import Biography from "@/components/Biography";
import Memories from "@/components/Memories";
import Album from "@/components/Album";
import GuestBook from "@/components/GuestBook";
import Navigation from "@/components/Navigation";
import ScrollToTop from "@/components/ScrollToTop";
import Footer from "@/components/Footer";

const Index = () => {
  useEffect(() => {
    document.title = "Em Memória de Benedito Antonio Carneiro Rodrigues";
  }, []);

  return (
    <>
      <Navigation />
      <ScrollToTop />
      <main className="min-h-screen bg-white">
        <section id="hero">
          <HeroSection />
        </section>
        <section id="biography">
          <Biography />
        </section>
        <section id="memories">
          <Memories />
        </section>
        <section id="album">
          <Album />
        </section>
        <section id="guestbook">
          <GuestBook />
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Index;