import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Tag, ShoppingCart } from "lucide-react";

const FEATURED_ITEMS = [
  {
    category: "Cosmetics Packaging",
    name: "Skincare Hamper Box",
    desc: "Luxury magnetic closure box wrapping premium skin and face care kits.",
  },
  {
    category: "Rigid Boxes",
    name: "Magnetic Closure Box",
    desc: "Heavy-board structural box covered in rich art paper with strong hidden magnets.",
  },
  {
    category: "MDF Boxes",
    name: "Wedding Invite MDF Box",
    desc: "Laser-cut pine-wood customized wedding and ceremonial invite box.",
  },
  {
    category: "Food Packaging",
    name: "Cake Window Box",
    desc: "Sturdy board cake box with a clear PET top-window and durable carrying handles.",
  },
];

export default function FeaturedFooterProducts() {
  const [cartIds, setCartIds] = useState([]);

  useEffect(() => {
    const syncCart = () => {
      try {
        const saved = localStorage.getItem("sunstar-cart");
        const items = saved ? JSON.parse(saved) : [];
        setCartIds(items.map((it) => it.id));
      } catch {}
    };
    syncCart();
    window.addEventListener("cart-updated", syncCart);
    return () => window.removeEventListener("cart-updated", syncCart);
  }, []);

  const handleAddToCart = (item) => {
    try {
      const saved = localStorage.getItem("sunstar-cart");
      const currentCart = saved ? JSON.parse(saved) : [];
      
      const existingIndex = currentCart.findIndex((it) => it.id === item.name);
      if (existingIndex > -1) {
        currentCart[existingIndex].qty += 1;
      } else {
        currentCart.push({
          id: item.name,
          name: item.name,
          qty: 1,
          emoji: "📦",
          image: "https://i.pinimg.com/736x/06/fb/93/06fb93ae87d7c885b4d6a505034c504b.jpg"
        });
      }
      
      localStorage.setItem("sunstar-cart", JSON.stringify(currentCart));
      window.dispatchEvent(new Event("cart-updated"));
      window.dispatchEvent(new CustomEvent("cart-toast", {
        detail: {
          name: item.name,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })
        }
      }));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <section className="bg-gradient-to-b from-background to-secondary py-16 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="mb-10 text-center">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-primary">
            Curated Picks
          </span>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-primary-dark md:text-4xl">
            Featured Categories & Products
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
            Our most popular, hand-crafted custom packaging designs chosen by top retail brands.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURED_ITEMS.map((item) => {
            const isInCart = cartIds.includes(item.name);
            return (
              <article
                key={item.name}
                className="group relative flex flex-col rounded-2xl bg-card p-5 shadow-card ring-1 ring-border transition duration-300 hover:-translate-y-2 hover:shadow-elegant"
              >
                <div className="mb-4 relative w-full aspect-[4/3] overflow-hidden rounded-xl bg-white border border-border shadow-inner flex items-center justify-center">
                  <img
                    src="https://i.pinimg.com/736x/06/fb/93/06fb93ae87d7c885b4d6a505034c504b.jpg"
                    alt={item.name}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500 ease-out"
                    loading="lazy"
                  />
                </div>

                <div className="flex-1">
                  <div className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-bold text-primary">
                    <Tag className="h-3 w-3" />
                    {item.category}
                  </div>
                  <h3 className="mt-3 text-base font-extrabold text-primary-dark group-hover:text-primary transition duration-200">
                    {item.name}
                  </h3>
                  <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-4 flex flex-col sm:flex-row gap-2">
                  <button
                    onClick={() => handleAddToCart(item)}
                    className={`flex-1 rounded-md py-2 text-center text-xs font-bold uppercase tracking-wider transition duration-200 active:scale-95 flex items-center justify-center gap-1.5 ${
                      isInCart
                        ? "bg-emerald-600 text-white hover:bg-emerald-700"
                        : "bg-primary text-primary-foreground hover:bg-primary-dark"
                    }`}
                  >
                    <ShoppingCart className="h-3.5 w-3.5" />
                    {isInCart ? "Added" : "Add"}
                  </button>
                  <a
                    href={`https://wa.me/917665556786?text=${encodeURIComponent(`Hi, I want to get the price of this product: ${item.name}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 rounded-md py-2 text-center text-xs font-bold uppercase tracking-wider transition duration-200 active:scale-95 bg-[#25D366] text-white hover:bg-[#128C7E] flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    Get
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
