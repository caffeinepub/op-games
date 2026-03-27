import { Gamepad2, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "Games", href: "#games" },
  { label: "About", href: "#about" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "oklch(0.09 0.008 265 / 0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid oklch(0.22 0.02 265)" : "none",
      }}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <button
          type="button"
          data-ocid="nav.link"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2 group bg-transparent border-0 cursor-pointer p-0"
        >
          <Gamepad2
            className="w-7 h-7 transition-colors duration-300"
            style={{ color: "oklch(0.72 0.22 290)" }}
          />
          <span
            className="font-display font-black text-xl tracking-wider"
            style={{ color: "oklch(0.95 0.01 260)" }}
          >
            OP<span style={{ color: "oklch(0.72 0.22 290)" }}>GAMES</span>
          </span>
        </button>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.label}
              type="button"
              onClick={() => handleNavClick(link.href)}
              data-ocid={`nav.${link.label.toLowerCase()}.link`}
              className="font-display font-medium text-sm tracking-widest uppercase transition-colors duration-200 bg-transparent border-0 cursor-pointer hover:text-primary"
              style={{ color: "oklch(0.65 0.015 260)" }}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          data-ocid="nav.toggle"
          className="md:hidden bg-transparent border-0 cursor-pointer"
          style={{ color: "oklch(0.75 0.015 260)" }}
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden"
            style={{
              background: "oklch(0.09 0.008 265 / 0.98)",
              borderBottom: "1px solid oklch(0.22 0.02 265)",
            }}
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  type="button"
                  onClick={() => handleNavClick(link.href)}
                  className="font-display font-bold text-sm tracking-widest uppercase text-left bg-transparent border-0 cursor-pointer"
                  style={{ color: "oklch(0.75 0.015 260)" }}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
