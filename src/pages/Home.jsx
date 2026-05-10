import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ServiceCards from "../components/ServiceCards";
import About from "../components/About";
import Products from "../components/Products";
import Footer from "../components/Footer";

export default function Home() {
  React.useEffect(() => {
    document.title = "Sun Start Packers — Premium Custom Packaging Manufacturer";
  }, []);

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <ServiceCards />
      <About />
      <Products />
      <Footer />
    </main>
  );
}
