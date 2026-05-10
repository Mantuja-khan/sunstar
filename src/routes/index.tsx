import { createFileRoute } from "@tanstack/react-router";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ServiceCards from "@/components/ServiceCards";
import About from "@/components/About";
import Products from "@/components/Products";
import Footer from "@/components/Footer";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Sun Start Packers — Premium Custom Packaging Manufacturer" },
      {
        name: "description",
        content:
          "Sun Start Packers is India's leading custom packaging manufacturer. We design and deliver custom rigid boxes, mono cartons, corrugated boxes, and MDF boxes.",
      },
    ],
  }),
});
function Index() {
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
