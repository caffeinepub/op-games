import { Button } from "@/components/ui/button";
import { ChevronDown, Gamepad2 } from "lucide-react";
import { motion } from "motion/react";

export function HeroSection() {
  const handleScrollToGames = () => {
    document.getElementById("games")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: "oklch(0.09 0.008 265)",
      }}
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
        style={{
          backgroundImage: "url('/assets/generated/hero-bg.dim_1920x1080.jpg')",
        }}
      />

      {/* Grid overlay */}
      <div className="absolute inset-0 grid-bg opacity-60" />

      {/* Radial gradient vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 30%, oklch(0.09 0.008 265) 80%)",
        }}
      />

      {/* Ambient glows */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl animate-pulse-slow"
        style={{ background: "oklch(0.72 0.22 290)" }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-10 blur-3xl animate-pulse-slow"
        style={{ background: "oklch(0.75 0.18 195)", animationDelay: "1.5s" }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex items-center justify-center gap-3 mb-6"
        >
          <Gamepad2
            className="w-10 h-10 text-neon-purple"
            style={{ filter: "drop-shadow(0 0 12px oklch(0.72 0.22 290))" }}
          />
          <span
            className="text-sm font-display tracking-[0.4em] uppercase font-medium"
            style={{ color: "oklch(0.72 0.22 290)" }}
          >
            Est. 2022
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="font-display text-7xl md:text-9xl font-black tracking-tight leading-none mb-4"
        >
          <span className="text-foreground">OP</span>
          <br />
          <span
            className="neon-text-purple"
            style={{ color: "oklch(0.72 0.22 290)" }}
          >
            GAMES
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45, ease: "easeOut" }}
          className="text-xl md:text-2xl font-body font-light tracking-widest uppercase mb-3"
          style={{ color: "oklch(0.75 0.18 195)" }}
        >
          We Build Worlds
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="text-base md:text-lg text-muted-foreground font-body mb-10 max-w-xl mx-auto"
        >
          Indie game studio pushing the boundaries of interactive experiences.
          From retro platformers to epic space strategies.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.75, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Button
            onClick={handleScrollToGames}
            data-ocid="hero.primary_button"
            size="lg"
            className="font-display font-bold tracking-widest uppercase px-10 py-6 text-base border-0"
            style={{
              background: "oklch(0.72 0.22 290)",
              color: "oklch(0.98 0 0)",
              boxShadow:
                "0 0 30px oklch(0.72 0.22 290 / 0.5), 0 0 60px oklch(0.72 0.22 290 / 0.2)",
            }}
          >
            Explore Games
          </Button>
          <Button
            onClick={() =>
              document
                .getElementById("about")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            data-ocid="hero.secondary_button"
            variant="outline"
            size="lg"
            className="font-display font-bold tracking-widest uppercase px-10 py-6 text-base"
            style={{
              borderColor: "oklch(0.75 0.18 195)",
              color: "oklch(0.75 0.18 195)",
              background: "transparent",
            }}
          >
            Our Story
          </Button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={handleScrollToGames}
        data-ocid="hero.button"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer bg-transparent border-0"
      >
        <span className="text-xs font-display tracking-widest uppercase">
          Scroll
        </span>
        <ChevronDown className="w-5 h-5 animate-bounce" />
      </motion.button>
    </section>
  );
}
