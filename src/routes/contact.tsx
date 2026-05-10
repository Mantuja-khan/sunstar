import { createFileRoute } from "@tanstack/react-router";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import FeaturedFooterProducts from "@/components/FeaturedFooterProducts";
import Footer from "@/components/Footer";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({
    meta: [
      { title: "Contact — Sun Start Packers" },
      { name: "description", content: "Get a quote for custom packaging boxes — call, email or visit Sun Start Packers." },
    ],
  }),
});

function ContactPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <section 
        className="relative overflow-hidden py-20 bg-cover bg-center"
        style={{ backgroundImage: 'url("https://i.pinimg.com/1200x/6c/6e/f1/6c6ef150f6002e280ea2a57250c18ba7.jpg")' }}
      >
        {/* Lighter white translucent overlay with blur */}
        <div className="absolute inset-0 bg-white/40 backdrop-blur-md"></div>

        <div className="relative container mx-auto px-4">
          <p className="text-sm uppercase tracking-[0.3em] text-primary font-bold">Get in Touch</p>
          <h1 className="mt-2 text-4xl font-extrabold text-primary-dark md:text-5xl">Contact Us</h1>
          <p className="mt-4 max-w-2xl text-muted-foreground font-medium text-lg">
            Have a packaging requirement? Send us your specs and we'll respond
            within 24 hours with samples, pricing and lead times.
          </p>
        </div>
      </section>

      <section className="container mx-auto grid grid-cols-1 gap-10 px-4 py-16 lg:grid-cols-3">
        {/* Info cards */}
        <div className="space-y-4">
          {[
            { icon: MapPin, title: "Visit Us", lines: ["Plot 24, Industrial Area Phase II", "Noida, Uttar Pradesh 201305"] },
            { icon: Phone, title: "Call Us", lines: ["+91 98100 12345", "+91 98100 67890"] },
            { icon: Mail, title: "Email Us", lines: ["sales@sunstarpackers.in", "support@sunstarpackers.in"] },
            { icon: Clock, title: "Working Hours", lines: ["Mon – Sat: 9:30 AM – 7:00 PM", "Sunday: Closed"] },
          ].map(({ icon: Icon, title, lines }) => (
            <div key={title} className="flex gap-4 rounded-xl bg-card p-5 shadow-card ring-1 ring-border">
              <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-primary-dark">{title}</h3>
                {lines.map((l) => (
                  <p key={l} className="text-sm text-muted-foreground">{l}</p>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Form */}
        <form
          className="lg:col-span-2 rounded-xl bg-card p-8 shadow-elegant ring-1 ring-border"
          onSubmit={(e) => {
            e.preventDefault();
            alert("Thanks! We'll be in touch within 24 hours.");
          }}
        >
          <h2 className="text-2xl font-extrabold text-primary-dark">Request a Quote</h2>
          <p className="mt-1 text-sm text-muted-foreground">Tell us about your project.</p>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            <Field label="Full Name" name="name" required />
            <Field label="Company" name="company" />
            <Field label="Email" name="email" type="email" required />
            <Field label="Phone" name="phone" type="tel" />
            <div className="md:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-primary-dark">
                Box Type
              </label>
              <select className="mt-2 w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/40">
                {["Cosmetics Box", "Jewellery Box", "Food Box", "Corrugated Carton", "Rigid Box", "Mono Carton", "Paper Bag", "Other"].map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            </div>
            <Field label="Quantity" name="qty" type="number" placeholder="e.g. 1000" />
            <Field label="Target Price (₹)" name="price" type="number" />
            <div className="md:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-primary-dark">
                Project Details
              </label>
              <textarea
                rows={4}
                placeholder="Dimensions, material, finishing, deadline..."
                className="mt-2 w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/40"
              />
            </div>
          </div>

          <button
            type="submit"
            className="mt-6 inline-flex items-center gap-2 rounded-md bg-primary px-7 py-3 text-sm font-bold uppercase tracking-wider text-primary-foreground shadow-card transition hover:bg-primary-dark"
          >
            Send Enquiry
          </button>
        </form>
      </section>

      <Footer />
    </main>
  );
}

function Field({ label, name, type = "text", required, placeholder }: any) {
  return (
    <div>
      <label className="block text-xs font-bold uppercase tracking-wider text-primary-dark">
        {label}{required && " *"}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="mt-2 w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/40"
      />
    </div>
  );
}
