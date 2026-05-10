import { Link } from "@tanstack/react-router";
import logo from "@/assets/logo.png";

export default function Footer() {


  return (
    <footer className="bg-primary-dark text-topbar-foreground border-t border-white/10">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          {/* Logo & About Column */}
          <div className="space-y-4">
            <a href="/" className="flex items-center gap-2.5">
              <img src={logo} alt="Sun Star Packers logo" className="h-12 w-12 object-contain bg-white rounded-full p-0.5" />
              <div className="leading-tight">
                <div className="text-xl font-extrabold tracking-tight text-white">
                  Sun Star
                </div>
                <div className="-mt-1 text-xs font-extrabold tracking-[0.2em] text-primary-glow">
                  PACKERS
                </div>
              </div>
            </a>
            <p className="text-xs text-white/70 leading-relaxed max-w-xs">
              Sun Star Packers is India's leading designer and custom manufacturer of premium luxury boxes, mono-cartons, and corporate packaging solutions. We elevate your brand identity with state-of-the-art sustainable packaging.
            </p>
          </div>

          {/* Contact Details Column */}
          <div className="space-y-4 text-left">
            <div className="text-xs font-bold uppercase tracking-wider text-primary-glow">
              Contact Us
            </div>
            <ul className="space-y-2.5 text-xs text-white/80">
              <li>
                <span className="font-semibold block text-white">Address:</span>
                Plot 24, Industrial Area, Phase II, Noida, UP 201305
              </li>
              <li>
                <span className="font-semibold block text-white">Phone No:</span>
                +91 98100 12345 / +91 98100 67890
              </li>
              <li>
                <span className="font-semibold block text-white">Email Us:</span>
                sales@sunstarpackers.in / support@sunstarpackers.in
              </li>
            </ul>
          </div>

          {/* Product Categories Column (Text Only) */}
          <div className="space-y-4 text-left">
            <div className="text-xs font-bold uppercase tracking-wider text-primary-glow">
              Product Categories
            </div>
            <ul className="space-y-2 text-xs text-white/80 list-none leading-relaxed">
              <li className="hover:text-primary-glow transition duration-150">• Cosmetics Packaging</li>
              <li className="hover:text-primary-glow transition duration-150">• Clothing Packaging</li>
              <li className="hover:text-primary-glow transition duration-150">• Gift Packaging</li>
              <li className="hover:text-primary-glow transition duration-150">• Spiritual Packaging</li>
              <li className="hover:text-primary-glow transition duration-150">• Jewellery Packaging</li>
              <li className="hover:text-primary-glow transition duration-150">• Pharmacy Packaging</li>
              <li className="hover:text-primary-glow transition duration-150">• Electronics Packaging</li>
              <li className="hover:text-primary-glow transition duration-150">• Food Packaging</li>
              <li className="hover:text-primary-glow transition duration-150">• E-Commerce Packaging</li>
            </ul>
          </div>

          {/* Follow Us / Social Links */}
          <div className="space-y-4">
            <div className="text-xs font-bold uppercase tracking-wider text-primary-glow">
              Follow Our Work
            </div>
            <div className="flex gap-2">
              {["f", "t", "in", "ig", "p"].map((s) => (
                <span
                  key={s}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground cursor-pointer hover:bg-primary-dark transition duration-150"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Strip */}
      <div className="border-t border-white/10 bg-black/20 py-5 text-center text-xs font-semibold tracking-wider text-white/80">
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 mb-2">
          <Link to="/" className="hover:text-primary-glow transition">HOME</Link>
          <span className="opacity-40">|</span>
          <Link to="/products" className="hover:text-primary-glow transition">PRODUCTS</Link>
          <span className="opacity-40">|</span>
          <Link to="/about" className="hover:text-primary-glow transition">ABOUT</Link>
          <span className="opacity-40">|</span>
          <Link to="/contact" className="hover:text-primary-glow transition">CONTACT</Link>
        </div>
        <div className="text-white/40 font-normal mt-1">
          © {new Date().getFullYear()} Sun Star Packers. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
