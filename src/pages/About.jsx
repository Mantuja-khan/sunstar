import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function About() {
  React.useEffect(() => {
    document.title = "About — Sun Star Packers";
  }, []);

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <section 
        className="relative overflow-hidden py-20 bg-cover bg-center"
        style={{ backgroundImage: 'url("https://i.pinimg.com/1200x/6c/6e/f1/6c6ef150f6002e280ea2a57250c18ba7.jpg")' }}
      >
        <div className="absolute inset-0 bg-white/40 backdrop-blur-md"></div>

        <div className="relative container mx-auto px-4">
          <p className="text-sm uppercase tracking-[0.3em] text-primary font-bold">About Us</p>
          <h1 className="mt-2 text-4xl font-extrabold text-primary-dark md:text-5xl">Sun Star Packers</h1>
          <p className="mt-4 max-w-3xl text-muted-foreground font-medium text-lg">
            Crafting premium custom packaging for India's most loved brands since 2013.
          </p>
        </div>
      </section>

      <section className="container mx-auto grid grid-cols-1 gap-10 px-4 py-16 md:grid-cols-2">
        <div>
          <h2 className="text-3xl font-extrabold text-primary-dark">Our Story</h2>
          <p className="mt-4 text-muted-foreground">
            Sun Star Packers began as a small carton workshop in Noida in 2013
            with a single offset press and a big idea — packaging should not
            just protect a product, it should tell its story. Twelve years
            later, we run a 40,000 sq.ft. integrated facility serving 500+
            brands across cosmetics, jewellery, food, pharma, electronics and
            e-commerce.
          </p>
          <p className="mt-3 text-muted-foreground">
            Every box we ship is a promise of quality, sustainability and
            craftsmanship. From FSC-certified paperboards to soy-based inks,
            we obsess over the details so your brand always shows up at its
            best.
          </p>
        </div>
        <div>
          <h2 className="text-3xl font-extrabold text-primary-dark">What We Do</h2>
          <ul className="mt-4 space-y-3 text-muted-foreground">
            <li>✓ Custom rigid boxes, mono cartons & corrugated packaging</li>
            <li>✓ Structural design, prototyping & 3D mockups</li>
            <li>✓ Offset, digital & flexo printing with foiling and embossing</li>
            <li>✓ Eco-friendly kraft, MDF and recycled materials</li>
            <li>✓ Pan-India dispatch with on-time delivery guarantee</li>
          </ul>
        </div>
      </section>

      <section className="bg-secondary py-16">
        <div className="container mx-auto grid grid-cols-2 gap-6 px-4 text-center md:grid-cols-4">
          {[["12+", "Years"], ["500+", "Brands Served"], ["10M+", "Boxes / year"], ["40k", "Sq.ft. Plant"]].map(
            ([n, l]) => (
              <div key={l} className="rounded-xl bg-card p-6 shadow-card ring-1 ring-border">
                <div className="text-3xl font-extrabold text-primary">{n}</div>
                <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{l}</div>
              </div>
            )
          )}
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-extrabold text-primary-dark text-center">Our Values</h2>
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          {[
            { t: "Quality First", d: "Every batch passes 7-stage QC before dispatch." },
            { t: "Sustainable", d: "Recycled and FSC-certified materials by default." },
            { t: "Customer Obsessed", d: "Dedicated account manager for every brand." },
          ].map((v) => (
            <div key={v.t} className="rounded-xl bg-card p-6 shadow-card ring-1 ring-border">
              <h3 className="text-lg font-extrabold text-primary-dark">{v.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{v.d}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
