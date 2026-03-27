import { Cpu, Shield, Users, Zap } from "lucide-react";
import { motion } from "motion/react";

const pillars = [
  {
    icon: Zap,
    title: "Fast Iteration",
    desc: "We ship quickly, learn fast, and build better with every release.",
    color: "oklch(0.82 0.2 85)",
  },
  {
    icon: Shield,
    title: "Quality First",
    desc: "Every mechanic is tested, polished, and built to last.",
    color: "oklch(0.72 0.22 290)",
  },
  {
    icon: Cpu,
    title: "Tech-Driven",
    desc: "Cutting-edge platforms and decentralized architecture power our games.",
    color: "oklch(0.75 0.18 195)",
  },
  {
    icon: Users,
    title: "Community",
    desc: "Built with players, for players. We listen and evolve.",
    color: "oklch(0.72 0.22 145)",
  },
];

export function AboutSection() {
  return (
    <section
      id="about"
      className="relative py-24 px-6 overflow-hidden"
      style={{ background: "oklch(0.1 0.01 265)" }}
    >
      {/* Ambient glow */}
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-5 blur-3xl pointer-events-none"
        style={{ background: "oklch(0.72 0.22 290)" }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p
              className="text-sm font-display tracking-[0.4em] uppercase font-medium mb-3"
              style={{ color: "oklch(0.75 0.18 195)" }}
            >
              About Us
            </p>
            <h2 className="font-display text-5xl md:text-6xl font-black tracking-tight text-foreground mb-6">
              INDIE.
              <br />
              <span style={{ color: "oklch(0.72 0.22 290)" }}>PASSIONATE.</span>
              <br />
              FEARLESS.
            </h2>
            <p
              className="font-body text-lg leading-relaxed mb-4"
              style={{ color: "oklch(0.7 0.015 260)" }}
            >
              OP Games is an indie game studio with an obsession for creative,
              original worlds. We believe the best games aren't made by the
              biggest teams — they're made by the most dedicated ones.
            </p>
            <p
              className="font-body text-base leading-relaxed"
              style={{ color: "oklch(0.55 0.015 260)" }}
            >
              From puzzle games to epic RPGs and space strategies, we explore
              every genre with the same core belief: games should be
              unforgettable. We build on the cutting edge — including
              decentralized platforms — so our games are as innovative
              technically as they are creatively.
            </p>

            {/* Stats row */}
            <div className="flex gap-10 mt-8">
              {[
                { value: "4+", label: "Games Built" },
                { value: "2022", label: "Founded" },
                { value: "∞", label: "Ambition" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div
                    className="font-display text-3xl font-black"
                    style={{ color: "oklch(0.72 0.22 290)" }}
                  >
                    {stat.value}
                  </div>
                  <div className="font-body text-xs uppercase tracking-widest text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Pillars grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="grid grid-cols-2 gap-4"
          >
            {pillars.map((pillar, i) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * i }}
                className="p-5 rounded-lg"
                style={{
                  background: "oklch(0.12 0.012 265 / 0.7)",
                  border: `1px solid ${pillar.color.replace(")", " / 0.2)")}`,
                }}
              >
                <pillar.icon
                  className="w-7 h-7 mb-3"
                  style={{ color: pillar.color }}
                />
                <h4 className="font-display font-bold text-sm mb-1 text-foreground">
                  {pillar.title}
                </h4>
                <p
                  className="font-body text-xs leading-relaxed"
                  style={{ color: "oklch(0.55 0.015 260)" }}
                >
                  {pillar.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
