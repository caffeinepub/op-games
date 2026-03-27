import { Gamepad2, Heart } from "lucide-react";

function NavLink({ label, id }: { label: string; id: string }) {
  return (
    <button
      type="button"
      onClick={() =>
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
      }
      className="font-display text-xs tracking-widest uppercase bg-transparent border-0 cursor-pointer transition-colors duration-200 hover:text-primary"
      style={{ color: "oklch(0.45 0.01 260)" }}
    >
      {label}
    </button>
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`;

  return (
    <footer
      className="relative py-12 px-6"
      style={{
        background: "oklch(0.07 0.006 265)",
        borderTop: "1px solid oklch(0.18 0.015 265)",
      }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Top row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
          <div className="flex items-center gap-2">
            <Gamepad2
              className="w-6 h-6"
              style={{ color: "oklch(0.72 0.22 290)" }}
            />
            <span
              className="font-display font-black text-lg tracking-wider"
              style={{ color: "oklch(0.95 0.01 260)" }}
            >
              OP<span style={{ color: "oklch(0.72 0.22 290)" }}>GAMES</span>
            </span>
          </div>

          <div className="flex items-center gap-8">
            <NavLink label="Games" id="games" />
            <NavLink label="About" id="about" />
          </div>
        </div>

        {/* Divider */}
        <div
          className="h-px w-full mb-6"
          style={{
            background:
              "linear-gradient(90deg, transparent, oklch(0.22 0.02 265), transparent)",
          }}
        />

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-center">
          <p
            className="font-body text-xs"
            style={{ color: "oklch(0.4 0.01 260)" }}
          >
            © {year} OP Games. All rights reserved.
          </p>
          <p
            className="font-body text-xs flex items-center gap-1"
            style={{ color: "oklch(0.4 0.01 260)" }}
          >
            Built with{" "}
            <Heart
              className="w-3 h-3 inline"
              style={{ color: "oklch(0.65 0.25 25)" }}
            />{" "}
            using{" "}
            <a
              href={caffeineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-200 hover:text-primary"
              style={{ color: "oklch(0.6 0.01 260)" }}
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
