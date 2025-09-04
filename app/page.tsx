import React from "react";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/hero-section";
const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        {/* <FeaturedProducts /> */}
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default Home;
