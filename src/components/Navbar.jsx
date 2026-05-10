import { useState, useEffect } from "react";
import { ChevronDown, Search, ShoppingCart, Menu, X, Trash2, CheckCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import logo from "@/assets/logo.png";
import { ALL_PRODUCTS } from "@/data";

const navItems = [
  { label: "HOME", href: "/" },
  {
    label: "PRODUCTS",
    children: [
      { name: "Cosmetics Packaging", href: "/products", search: { category: "Cosmetics Packaging" } },
      { name: "Clothing Packaging", href: "/products", search: { category: "Clothing Packaging" } },
      { name: "Gift Packaging", href: "/products", search: { category: "Gift Packaging" } },
      { name: "Spiritual Packaging", href: "/products", search: { category: "Spiritual Packaging" } },
      { name: "Jewellery Packaging", href: "/products", search: { category: "Jewellery Packaging" } },
      { name: "Pharmacy Packaging", href: "/products", search: { category: "Pharmacy Packaging" } },
      { name: "Electronics Packaging", href: "/products", search: { category: "Electronics Packaging" } },
      { name: "Food Packaging", href: "/products", search: { category: "Food Packaging" } },
      { name: "Foot Wear Packaging", href: "/products", search: { category: "Foot Wear Packaging" } },
      { name: "E-Commerce Packaging", href: "/products", search: { category: "E-Commerce Packaging" } },
    ],
  },
  {
    label: "BY MATERIALS",
    children: [
      { name: "Corrugated Boxes", href: "/products", search: { material: "Corrugated Boxes" } },
      { name: "Rigid Boxes", href: "/products", search: { material: "Rigid Boxes" } },
      { name: "MDF Boxes", href: "/products", search: { material: "MDF Boxes" } },
      { name: "Mono Cartons", href: "/products", search: { material: "Mono Cartons" } },
      { name: "Paper Bags", href: "/products", search: { material: "Paper Bags" } },
    ],
  },
  {
    label: "COMPANY",
    children: [
      { name: "About", href: "/about" },
      { name: "Contact", href: "/contact" },
    ],
  },
];

export default function Navbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileSub, setMobileSub] = useState(null); // expanded section in mobile menu
  const [toast, setToast] = useState(null);

  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem("sunstar-cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    const handleUpdate = () => {
      try {
        const saved = localStorage.getItem("sunstar-cart");
        setCartItems(saved ? JSON.parse(saved) : []);
      } catch {}
    };
    window.addEventListener("cart-updated", handleUpdate);
    return () => window.removeEventListener("cart-updated", handleUpdate);
  }, []);

  const handleRemoveItem = (id) => {
    const updated = cartItems.filter((item) => item.id !== id);
    localStorage.setItem("sunstar-cart", JSON.stringify(updated));
    window.dispatchEvent(new Event("cart-updated"));
  };

  useEffect(() => {
    const handleToast = (e) => {
      setToast(e.detail);
    };
    window.addEventListener("cart-toast", handleToast);
    return () => window.removeEventListener("cart-toast", handleToast);
  }, []);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/products?q=${encodeURIComponent(query.trim())}`);
      setSearchOpen(false);
    }
  };

  const cartTotal = cartItems.reduce((s, i) => s + i.price * i.qty, 0);
  const cartCount = cartItems.reduce((s, i) => s + i.qty, 0);

  const liveSearchResults = query.trim() === "" ? [] : ALL_PRODUCTS.filter((product) => {
    return (
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase()) ||
      (product.brand && product.brand.toLowerCase().includes(query.toLowerCase())) ||
      product.description.toLowerCase().includes(query.toLowerCase())
    );
  }).slice(0, 5);

  return (
    <>
      {toast && (
        <div className="fixed right-4 top-4 z-[9999] max-w-sm animate-slide-in rounded-xl border border-emerald-500/20 bg-card/95 p-4 shadow-elegant backdrop-blur-md transition-all duration-300">
          <div className="flex items-start gap-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-500">
              <CheckCircle className="h-4.5 w-4.5" />
            </span>
            <div className="text-left">
              <h4 className="text-xs font-bold text-foreground">Added to Cart!</h4>
              <p className="mt-1 text-[11px] font-semibold text-muted-foreground leading-normal">
                <span className="text-primary font-bold">"{toast.name}"</span> was added at {toast.timestamp}.
              </p>
            </div>
          </div>
        </div>
      )}
      <header className="relative z-30">
      {/* Logo + contact strip */}
      <div className="bg-background">
        <div className="container mx-auto px-4 py-4">
          {/* Top row */}
          <div className="flex items-center justify-between gap-3">
            {/* Logo */}
            <a href="/" className="flex items-center gap-2 md:gap-3 shrink-0">
              <img src={logo} alt="Sun Star Packers logo" className="h-10 w-10 md:h-14 md:w-14 object-contain" />
              <div className="leading-tight">
                <div className="text-lg md:text-2xl font-extrabold tracking-tight" style={{ color: "#E8631C" }}>
                  Sun Star
                </div>
                <div className="-mt-1 text-[10px] md:text-sm font-extrabold tracking-[0.25em] md:tracking-[0.3em]" style={{ color: "#E8631C" }}>
                  PACKERS
                </div>
              </div>
            </a>

            {/* Search bar — desktop with live results dropdown */}
            <div className="hidden md:block flex-1 max-w-md mx-6 relative">
              <form onSubmit={handleSearchSubmit}>
                <div className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 shadow-card focus-within:ring-2 focus-within:ring-primary/40">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search packaging boxes, materials..."
                    className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                  />
                </div>
              </form>
              {liveSearchResults.length > 0 && (
                <div className="absolute left-0 right-0 top-full z-50 mt-2 rounded-xl bg-card text-foreground shadow-elegant ring-1 ring-border p-3 space-y-2">
                  <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider px-1">
                    Live Matches
                  </div>
                  <ul className="divide-y divide-border/60">
                    {liveSearchResults.map((p) => (
                      <li key={p.id} className="flex items-center justify-between gap-3 py-2.5 first:pt-0 last:pb-0">
                        <Link
                          to={`/products?q=${encodeURIComponent(p.name)}`}
                          onClick={() => setQuery("")}
                          className="flex items-center gap-2.5 hover:opacity-85 transition text-left flex-1"
                        >
                          <img
                            src={p.image || "https://i.pinimg.com/736x/06/fb/93/06fb93ae87d7c885b4d6a505034c504b.jpg"}
                            alt={p.name}
                            className="h-9 w-12 rounded object-cover border border-border bg-white"
                          />
                          <div className="leading-tight">
                            <div className="font-extrabold text-xs text-primary-dark">{p.name}</div>
                            <div className="text-[10px] text-muted-foreground font-semibold mt-0.5">{p.category}</div>
                          </div>
                        </Link>
                        <button
                          onClick={() => {
                            try {
                              const saved = localStorage.getItem("sunstar-cart");
                              const currentCart = saved ? JSON.parse(saved) : [];
                              const existingIndex = currentCart.findIndex((item) => item.id === p.id);
                              if (existingIndex > -1) {
                                currentCart[existingIndex].qty += 1;
                              } else {
                                currentCart.push({
                                  id: p.id,
                                  name: p.name,
                                  qty: 1,
                                  emoji: p.emoji || "📦",
                                  image: p.image,
                                  price: parseInt(p.price?.replace(/[^\d]/g, "")) || 50
                                });
                              }
                              localStorage.setItem("sunstar-cart", JSON.stringify(currentCart));
                              window.dispatchEvent(new Event("cart-updated"));
                              window.dispatchEvent(new CustomEvent("cart-toast", {
                                detail: {
                                  name: p.name,
                                  timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })
                                }
                              }));
                            } catch (e) {
                              console.error(e);
                            }
                            setQuery("");
                          }}
                          className="rounded bg-primary px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-foreground hover:bg-primary-dark transition shrink-0"
                        >
                          + Cart
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Right side actions */}
            <div className="flex items-center gap-2">
              {/* Search icon — mobile */}
              <button
                onClick={() => setSearchOpen(true)}
                className="md:hidden flex h-10 w-10 items-center justify-center rounded-full bg-card border border-border text-primary-dark"
                aria-label="Open search"
              >
                <Search className="h-5 w-5" />
              </button>

              {/* Cart */}
              <div className="relative">
                <button
                  onClick={() => setCartOpen((v) => !v)}
                  className="relative flex h-10 w-10 md:h-11 md:w-11 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-elegant transition hover:bg-primary-dark"
                  aria-label="Open cart"
                >
                  <ShoppingCart className="h-5 w-5" />
                  {cartCount > 0 && (
                    <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary-glow text-[10px] font-bold text-primary-dark ring-2 ring-background">
                      {cartCount}
                    </span>
                  )}
                </button>
                {cartOpen && (
                  <div className="absolute right-0 top-full z-50 mt-2 w-72 sm:w-80 rounded-md bg-card text-foreground shadow-elegant ring-1 ring-border">
                    <div className="border-b border-border px-4 py-3 text-sm font-bold text-primary-dark">
                      Your Cart ({cartCount})
                    </div>
                    <ul className="max-h-64 overflow-auto py-2 divide-y divide-border">
                      {cartItems.length === 0 && (
                        <li className="px-4 py-6 text-center text-sm text-muted-foreground">
                          Your cart is empty
                        </li>
                      )}
                      {cartItems.map((it) => (
                        <li key={it.id} className="flex items-center justify-between gap-3 px-4 py-3 text-sm hover:bg-muted/35">
                          <div className="flex items-center gap-2.5 flex-1 min-w-0">
                            {it.image ? (
                              <img src={it.image} alt={it.name} className="h-10 w-10 rounded-md object-cover border border-border flex-shrink-0" />
                            ) : (
                              <span className="text-xl shrink-0">{it.emoji || "📦"}</span>
                            )}
                            <div className="text-left">
                              <div className="font-bold text-xs text-foreground leading-tight line-clamp-1">{it.name}</div>
                              <div className="text-[10px] font-semibold text-muted-foreground mt-0.5">
                                Qty: <span className="text-primary font-bold">{it.qty}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <button
                              onClick={() => handleRemoveItem(it.id)}
                              className="rounded p-1 text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition"
                              title="Remove item"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                    <div className="flex items-center justify-between border-t border-border px-4 py-3">
                      <span className="text-sm font-semibold">Total Items</span>
                      <span className="font-extrabold text-primary-dark">{cartCount}</span>
                    </div>
                    <Link to="/contact" onClick={() => setCartOpen(false)} className="block w-full text-center rounded-b-md bg-primary py-2.5 text-sm font-bold uppercase tracking-wide text-primary-foreground hover:bg-primary-dark">
                      Get Custom Quote
                    </Link>
                  </div>
                )}
              </div>

              {/* Contact strip — desktop only */}
              <div className="hidden lg:block bg-primary-dark px-6 py-3 text-topbar-foreground clip-slant-l">
                <div className="flex flex-col items-end text-sm">
                  <span className="text-xs font-semibold uppercase tracking-wider text-primary-glow">
                    Call us
                  </span>
                  <a href="tel:+910000000000" className="font-bold">
                    +91 00000 00000
                  </a>
                </div>
              </div>

              {/* Mobile toggle */}
              <button
                onClick={() => setMobileOpen((v) => !v)}
                className="md:hidden flex h-10 w-10 items-center justify-center rounded-full bg-primary-dark text-topbar-foreground"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Mobile full-width search overlay */}
          {searchOpen && (
            <div className="md:hidden mt-3 flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 shadow-card">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                autoFocus
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search packaging boxes, materials..."
                className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
              <button
                onClick={() => setSearchOpen(false)}
                className="flex h-7 w-7 items-center justify-center rounded-full bg-primary-dark text-topbar-foreground"
                aria-label="Close search"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Desktop nav bar */}
      <div className="hidden md:block bg-primary-dark text-topbar-foreground shadow-elegant">
        <nav className="container mx-auto px-4">
          <ul className="flex flex-wrap items-center justify-center gap-x-2 py-1 text-[13px] font-semibold tracking-wide">
            {navItems.map((item) => (
              <li
                key={item.label}
                className="relative"
                onMouseEnter={() => setOpen(item.label)}
                onMouseLeave={() => setOpen(null)}
              >
                {item.href ? (
                  <Link
                    to={item.href}
                    className="flex items-center gap-1 px-4 py-3 transition-colors hover:text-primary-glow"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <a
                    href="#"
                    className="flex items-center gap-1 px-4 py-3 transition-colors hover:text-primary-glow"
                  >
                    {item.label}
                    {item.children && <ChevronDown className="h-3.5 w-3.5" />}
                  </a>
                )}
                {item.children && open === item.label && (
                  <div className="absolute left-0 top-full z-40 min-w-[300px] rounded-md bg-card text-foreground shadow-elegant ring-1 ring-border">
                    <ul className="py-2">
                      {item.children.map((c) => (
                        <li key={c.name}>
                          <Link
                            to={c.search ? `${c.href}?${new URLSearchParams(c.search).toString()}` : c.href}
                            className="block px-4 py-2 text-[13px] font-semibold hover:bg-primary/10 hover:text-primary"
                          >
                            {c.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Mobile dropdown menu */}
      {mobileOpen && (
        <div className="md:hidden bg-primary-dark text-topbar-foreground shadow-elegant">
          <ul className="container mx-auto px-4 py-2 text-sm font-semibold">
            {navItems.map((item) => (
              <li key={item.label} className="border-b border-white/10 last:border-0">
                {item.href ? (
                  <Link
                    to={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="block py-3"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <>
                    <button
                      onClick={() => setMobileSub(mobileSub === item.label ? null : item.label)}
                      className="flex w-full items-center justify-between py-3"
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${mobileSub === item.label ? "rotate-180" : ""}`}
                      />
                    </button>
                    {mobileSub === item.label && (
                      <ul className="pb-3 pl-3 space-y-2">
                        {item.children?.map((c) => (
                          <li key={c.name}>
                            <Link
                              to={c.search ? `${c.href}?${new URLSearchParams(c.search).toString()}` : c.href}
                              onClick={() => setMobileOpen(false)}
                              className="block py-1 text-[13px] text-primary-glow"
                            >
                              {c.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                )}
              </li>
            ))}
            <li className="pt-3">
              <a
                href="tel:+910000000000"
                className="block rounded-md bg-primary-glow px-4 py-2 text-center font-bold text-primary-dark"
              >
                Call: +91 00000 00000
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
    </>
  );
}
