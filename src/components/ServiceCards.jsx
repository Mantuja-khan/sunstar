import commercial from "@/assets/commercial-moving.jpg";
import residential from "@/assets/residential-moving.jpg";
import longDistance from "@/assets/long-distance.jpg";

const items = [
  { title: "COMMERCIAL MOVING", img: commercial },
  { title: "RESIDENTIAL MOVING", img: residential },
  { title: "LONG DISTANCE MOVING", img: longDistance },
];

export default function ServiceCards() {
  return (
    <section className="bg-background py-10">
      <div className="container mx-auto grid grid-cols-1 gap-6 px-4 md:grid-cols-3">
        {items.map((it) => (
          <article
            key={it.title}
            className="group relative overflow-hidden rounded-md shadow-card transition hover:shadow-elegant"
          >
            <img
              src={it.img}
              alt={it.title}
              loading="lazy"
              width={800}
              height={600}
              className="h-48 w-full object-cover transition duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-x-0 bottom-0 bg-primary py-3 text-center text-sm font-bold tracking-wider text-primary-foreground">
              {it.title}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
