import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";

const categories = [
  {
    title: "Cosmetics Packaging",
  },
  {
    title: "Jewellery Packaging",
  },
  {
    title: "Food Packaging",
  },
  {
    title: "Corrugated Boxes",
  },
];

export default function Products() {
  return (
    <section className="bg-secondary py-16">
      <div className="container mx-auto px-4">
        <div className="mb-10 flex items-end justify-between border-b border-border pb-4">
          <h2 className="text-2xl font-extrabold tracking-tight text-primary-dark md:text-3xl">
            Custom Packaging for Every Industry
          </h2>
          <Link
            to="/products"
            className="hidden items-center gap-1 text-sm font-bold text-primary hover:text-primary-dark md:flex"
          >
            View All <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((c) => (
            <article
              key={c.title}
              className="group flex flex-col rounded-xl bg-card p-5 shadow-card ring-1 ring-border transition hover:-translate-y-1 hover:shadow-elegant"
            >
              <h3 className="text-lg font-extrabold text-primary-dark mb-4">
                {c.title}
              </h3>

              <div className="mb-5 relative w-full aspect-[4/3] overflow-hidden rounded-lg bg-white border border-border shadow-inner flex items-center justify-center">
                <img
                  src="https://i.pinimg.com/736x/06/fb/93/06fb93ae87d7c885b4d6a505034c504b.jpg"
                  alt={c.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500 ease-out"
                  loading="lazy"
                />
              </div>

              <Link
                to="/products"
                search={{ category: c.title }}
                className="mt-auto w-full inline-flex items-center justify-center gap-1.5 rounded-md bg-primary py-2.5 text-xs font-bold uppercase tracking-wider text-primary-foreground transition hover:bg-primary-dark"
              >
                View More <ArrowRight className="h-4 w-4" />
              </Link>
            </article>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 rounded-md bg-primary px-7 py-3 text-sm font-bold uppercase tracking-wider text-primary-foreground shadow-card transition hover:bg-primary-dark"
          >
            View All Products <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
