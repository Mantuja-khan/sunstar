export default function About() {
  const features = [
    { title: "PREMIUM QUALITY", desc: "FSC-certified paperboard, food-grade inks and rigorous QC on every batch." },
    { title: "CUSTOM DESIGNS", desc: "In-house design studio for structural & graphic packaging tailored to your brand." },
    { title: "FAST DELIVERY", desc: "Pan-India fulfilment with on-time dispatch from our Noida facility." },
  ];
  return (
    <section className="relative bg-gradient-dark py-16 text-topbar-foreground">
      <div className="container mx-auto grid grid-cols-1 gap-10 px-4 md:grid-cols-3">
        <aside className="space-y-1">
          <div className="bg-primary-dark/60 px-6 py-5">
            <h3 className="text-2xl font-extrabold tracking-wide">WHY CHOOSE US</h3>
          </div>
          {features.map((f) => (
            <div key={f.title}>
              <div className="bg-primary px-6 py-3 text-sm font-bold tracking-wider text-primary-foreground">
                {f.title}
              </div>
              <div className="bg-background/95 px-4 py-3 text-xs leading-relaxed text-foreground">
                {f.desc}
              </div>
            </div>
          ))}
        </aside>

        <div className="md:col-span-2">
          <p className="text-sm uppercase tracking-[0.3em] text-primary-glow">
            Welcome to
          </p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight md:text-4xl">
            SUN START PACKERS
          </h2>
          <div className="mt-6 space-y-4 text-sm leading-relaxed text-white/90">
            <p>
              Sun Start Packers is a leading manufacturer of premium custom
              packaging in India. From cosmetics, jewellery and food to
              electronics and e-commerce, we build boxes that protect your
              product and elevate your brand.
            </p>
            <p>
              With a 40,000 sq.ft. plant in Noida, advanced offset & digital
              printing, die-cutting, foiling, embossing and rigid box assembly
              lines, we deliver everything from rapid prototypes to bulk
              production runs of 100,000+ units.
            </p>
            <p>
              Our team works with startups and enterprises alike — combining
              sustainable materials, structural engineering and standout
              graphics to create packaging that wins shelves and hearts.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-4 text-center">
            {[
              ["12+", "Years"],
              ["500+", "Brands"],
              ["10M+", "Boxes / yr"],
            ].map(([n, l]) => (
              <div key={l} className="rounded-lg bg-primary-dark/60 p-4">
                <div className="text-2xl font-extrabold text-primary-glow">{n}</div>
                <div className="text-xs uppercase tracking-wider">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
