import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useMemo, useEffect } from "react";
import { Filter, ChevronRight, LayoutGrid, SlidersHorizontal, ArrowLeft, Heart, Search, ChevronDown, ShoppingCart } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ALL_PRODUCTS } from "@/data";

export const Route = createFileRoute("/products")({
  validateSearch: (search: Record<string, unknown>) => {
    return {
      category: (search.category as string) || undefined,
      material: (search.material as string) || undefined,
      q: (search.q as string) || undefined,
    };
  },
  component: ProductsPage,
});



const CATEGORIES = [
  "All",
  "Cosmetics Packaging",
  "Clothing Packaging",
  "Gift Packaging",
  "Spiritual Packaging",
  "Jewellery Packaging",
  "Pharmacy Packaging",
  "Electronics Packaging",
  "Food Packaging",
  "Foot Wear Packaging",
  "E-Commerce Packaging",
];

const MATERIALS = [
  "All",
  "Corrugated Boxes",
  "Rigid Boxes",
  "MDF Boxes",
  "Mono Cartons",
  "Paper Bags",
];

function ProductsPage() {
  const { category, material, q } = Route.useSearch();
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState(category || "All");
  const [selectedMaterial, setSelectedMaterial] = useState(material || "All");
  const [searchQuery, setSearchQuery] = useState(q || "");

  // Update local state when route search params change
  useEffect(() => {
    setSearchQuery(q || "");
  }, [q]);

  useEffect(() => {
    setSelectedCategory(category || "All");
  }, [category]);

  useEffect(() => {
    setSelectedMaterial(material || "All");
  }, [material]);

  const productsWithImages = useMemo(() => {
    return ALL_PRODUCTS;
  }, []);

  const [cartIds, setCartIds] = useState<string[]>([]);

  // Track which product IDs are currently in the cart
  useEffect(() => {
    const syncCart = () => {
      try {
        const saved = localStorage.getItem("sunstar-cart");
        const items = saved ? JSON.parse(saved) : [];
        setCartIds(items.map((it: any) => it.id));
      } catch { }
    };
    syncCart();
    window.addEventListener("cart-updated", syncCart);
    return () => window.removeEventListener("cart-updated", syncCart);
  }, []);

  const handleAddToWishlistCart = (product: any) => {
    try {
      const saved = localStorage.getItem("sunstar-cart");
      const currentCart = saved ? JSON.parse(saved) : [];

      const existingIndex = currentCart.findIndex((item: any) => item.id === product.id);
      if (existingIndex > -1) {
        currentCart[existingIndex].qty += 1;
      } else {
        const numericPrice = parseInt(product.price.replace(/[^\d]/g, "")) || 50;
        currentCart.push({
          id: product.id,
          name: product.name,
          price: numericPrice,
          qty: 1,
          emoji: product.emoji,
          image: product.image
        });
      }

      localStorage.setItem("sunstar-cart", JSON.stringify(currentCart));
      window.dispatchEvent(new Event("cart-updated"));
      window.dispatchEvent(new CustomEvent("cart-toast", {
        detail: {
          name: product.name,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })
        }
      }));
    } catch (e) {
      console.error(e);
    }
  };

  const filteredProducts = useMemo(() => {
    return productsWithImages.filter((product) => {
      const matchCat =
        selectedCategory === "All" || product.category === selectedCategory;
      const matchMat =
        selectedMaterial === "All" || product.material === selectedMaterial;
      const matchSearch =
        searchQuery.trim() === "" ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.brand && product.brand.toLowerCase().includes(searchQuery.toLowerCase())) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.material.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchMat && matchSearch;
    });
  }, [productsWithImages, selectedCategory, selectedMaterial, searchQuery]);

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    setSelectedMaterial("All");
    navigate({
      to: "/products",
      search: { category: cat === "All" ? undefined : cat, material: undefined, q: searchQuery || undefined },
    });
  };

  const handleMaterialChange = (mat: string) => {
    setSelectedMaterial(mat);
    setSelectedCategory("All");
    navigate({
      to: "/products",
      search: { category: undefined, material: mat === "All" ? undefined : mat, q: searchQuery || undefined },
    });
  };

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Header section with background image & blur overlay */}
      <section
        className="relative overflow-hidden py-20 bg-cover bg-center"
        style={{ backgroundImage: 'url("https://i.pinimg.com/1200x/6c/6e/f1/6c6ef150f6002e280ea2a57250c18ba7.jpg")' }}
      >
        {/* Lighter white translucent overlay with blur */}
        <div className="absolute inset-0 bg-white/0 backdrop-blur-xs"></div>

        <div className="relative container mx-auto px-4 text-center md:text-left">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary hover:underline mb-3"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Link>
          <h1 className="text-4xl font-extrabold text-primary-dark md:text-5xl">Our Custom Products</h1>
          <p className="mt-4 max-w-2xl text-muted-foreground font-medium">
            Browse our exceptional range of custom premium packaging designed to elevate your brand presence and keep your products perfectly safe.
          </p>
        </div>
      </section>

      {/* Grid of filters and products */}
      <section className="container mx-auto px-4 py-12">
        <div className="w-full">

          {/* Top filter bar with Search and Dropdown selectors */}
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between border-b border-border pb-6 mb-8">
            {/* Left part: Showing X products + search */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 flex-1 max-w-xl">
              <div className="flex items-center gap-2 shrink-0">
                <LayoutGrid className="h-5 w-5 text-primary" />
                <span className="text-sm font-bold text-muted-foreground whitespace-nowrap">
                  Showing {filteredProducts.length} Products
                </span>
              </div>
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    navigate({
                      to: "/products",
                      search: {
                        category: selectedCategory === "All" ? undefined : selectedCategory,
                        material: selectedMaterial === "All" ? undefined : selectedMaterial,
                        q: e.target.value || undefined,
                      },
                    });
                  }}
                  className="w-full rounded-md border border-border bg-card py-2.5 pl-10 pr-4 text-xs font-semibold outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground/85 text-foreground"
                />
                <Search className="absolute left-3.5 top-3 h-4 w-4 text-muted-foreground/80" />
              </div>
            </div>

            {/* Right part: Dropdown filters */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Category select dropdown */}
              <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                  className="appearance-none rounded-md border border-border bg-card pl-4 pr-10 py-2.5 text-xs font-bold text-foreground cursor-pointer outline-none transition hover:bg-muted/50 focus:ring-2 focus:ring-primary/20"
                >
                  <option value="All">All Industries</option>
                  {CATEGORIES.filter(cat => cat !== "All").map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3.5 top-3.5 h-3.5 w-3.5 pointer-events-none opacity-60" />
              </div>

              {/* Material select dropdown */}
              <div className="relative">
                <select
                  value={selectedMaterial}
                  onChange={(e) => handleMaterialChange(e.target.value)}
                  className="appearance-none rounded-md border border-border bg-card pl-4 pr-10 py-2.5 text-xs font-bold text-foreground cursor-pointer outline-none transition hover:bg-muted/50 focus:ring-2 focus:ring-primary/20"
                >
                  <option value="All">All Materials</option>
                  {MATERIALS.filter(mat => mat !== "All").map((mat) => (
                    <option key={mat} value={mat}>{mat}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3.5 top-3.5 h-3.5 w-3.5 pointer-events-none opacity-60" />
              </div>

              {/* Clear filters button */}
              {(selectedCategory !== "All" || selectedMaterial !== "All" || searchQuery !== "") && (
                <button
                  onClick={() => {
                    setSelectedCategory("All");
                    setSelectedMaterial("All");
                    setSearchQuery("");
                    navigate({ to: "/products", search: { category: undefined, material: undefined, q: undefined } });
                  }}
                  className="text-xs font-bold text-primary hover:underline px-2 py-1"
                >
                  Clear All
                </button>
              )}
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="rounded-xl border border-dashed border-border p-12 text-center">
              <span className="text-4xl">🔍</span>
              <h3 className="mt-4 text-lg font-bold text-primary-dark">No products found</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Try clearing some filters to see more custom packaging options.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {filteredProducts.map((p) => {
                const isInCart = cartIds.includes(p.id);
                return (
                  <article
                    key={p.id}
                    className="group flex flex-col rounded-xl bg-card p-5 shadow-card ring-1 ring-border transition hover:-translate-y-1 hover:shadow-elegant relative"
                  >
                    <div className="mb-4 relative w-full aspect-[4/3] overflow-hidden rounded-lg bg-white border border-border shadow-inner flex items-center justify-center">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500 ease-out"
                        loading="lazy"
                      />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">
                          {p.category}
                        </span>
                        <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-bold text-muted-foreground">
                          {p.material}
                        </span>
                      </div>
                      <h3 className="mt-3 text-base font-extrabold text-primary-dark group-hover:text-primary transition">
                        {p.name}
                      </h3>
                      <p className="mt-1.5 text-xs text-muted-foreground line-clamp-2">
                        {p.description}
                      </p>
                    </div>

                    <div className="mt-4 flex flex-col sm:flex-row gap-2">
                      <button
                        onClick={() => handleAddToWishlistCart(p)}
                        className={`flex-1 rounded-md py-2 text-center text-xs font-bold uppercase tracking-wider transition duration-200 active:scale-95 flex items-center justify-center gap-1.5 ${isInCart
                          ? "bg-emerald-600 text-white hover:bg-emerald-700"
                          : "bg-primary text-primary-foreground hover:bg-primary-dark"
                          }`}
                      >
                        <ShoppingCart className="h-3.5 w-3.5" />
                        {isInCart ? "Added" : "Add"}
                      </button>
                      <a
                        href={`https://wa.me/917665556786?text=${encodeURIComponent(`Hi, I want to get the price of this product: ${p.name}`)}`}
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
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
