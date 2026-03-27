import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, ExternalLink, Tag } from "lucide-react";
import { motion } from "motion/react";
import type { Game, Status } from "../backend.d.ts";

const GAME_IMAGES: Record<string, string> = {
  "1": "/assets/generated/game-pixel-quest.dim_600x400.jpg",
  "2": "/assets/generated/game-sages-journey.dim_600x400.jpg",
  "3": "/assets/generated/game-brain-puzzle.dim_600x400.jpg",
  "4": "/assets/generated/game-galactic-conqueror.dim_600x400.jpg",
};

type StatusConfig = {
  label: string;
  style: React.CSSProperties;
};

function getStatusConfig(status: Status): StatusConfig {
  switch (status) {
    case "released":
      return {
        label: "Released",
        style: {
          background: "oklch(0.72 0.22 145 / 0.15)",
          color: "oklch(0.72 0.22 145)",
          border: "1px solid oklch(0.72 0.22 145 / 0.4)",
        },
      };
    case "inDevelopment":
      return {
        label: "In Development",
        style: {
          background: "oklch(0.82 0.2 85 / 0.15)",
          color: "oklch(0.82 0.2 85)",
          border: "1px solid oklch(0.82 0.2 85 / 0.4)",
        },
      };
    case "comingSoon":
      return {
        label: "Coming Soon",
        style: {
          background: "oklch(0.75 0.18 195 / 0.15)",
          color: "oklch(0.75 0.18 195)",
          border: "1px solid oklch(0.75 0.18 195 / 0.4)",
        },
      };
    default:
      return {
        label: "Unknown",
        style: {
          background: "oklch(0.3 0.01 260 / 0.5)",
          color: "oklch(0.6 0.01 260)",
          border: "1px solid oklch(0.4 0.01 260)",
        },
      };
  }
}

interface GameCardProps {
  game: Game;
  index: number;
}

export function GameCard({ game, index }: GameCardProps) {
  const statusConfig = getStatusConfig(game.status);
  const image = GAME_IMAGES[game.id];

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      data-ocid={`games.item.${index + 1}`}
      className="group relative rounded-lg overflow-hidden card-hover cursor-default"
      style={{
        background: "oklch(0.12 0.012 265 / 0.8)",
        border: "1px solid oklch(0.22 0.02 265)",
        backdropFilter: "blur(16px)",
      }}
    >
      {/* Hover glow border effect */}
      <div
        className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          boxShadow:
            "inset 0 0 0 1px oklch(0.72 0.22 290 / 0.6), 0 0 30px oklch(0.72 0.22 290 / 0.2)",
        }}
      />

      {/* Game cover image */}
      {image && (
        <div className="relative h-48 overflow-hidden">
          <img
            src={image}
            alt={game.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, transparent 40%, oklch(0.12 0.012 265) 100%)",
            }}
          />
          {/* Status badge overlaid on image */}
          <div className="absolute top-3 right-3">
            <span
              className="text-xs font-display font-bold tracking-wider uppercase px-3 py-1 rounded-full"
              style={statusConfig.style}
            >
              {statusConfig.label}
            </span>
          </div>
        </div>
      )}

      {/* Card content */}
      <div className="p-5">
        {/* Title and year */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3
            className="font-display font-bold text-lg leading-tight text-foreground group-hover:text-neon-purple transition-colors duration-300"
            style={{}}
          >
            {game.title}
          </h3>
          <div
            className="flex items-center gap-1 text-xs shrink-0"
            style={{ color: "oklch(0.55 0.02 260)" }}
          >
            <Calendar className="w-3 h-3" />
            <span className="font-body">{game.year.toString()}</span>
          </div>
        </div>

        {/* Genre badge */}
        <div className="flex items-center gap-2 mb-3">
          <Tag className="w-3 h-3" style={{ color: "oklch(0.75 0.18 195)" }} />
          <span
            className="text-xs font-display font-medium tracking-wider uppercase"
            style={{ color: "oklch(0.75 0.18 195)" }}
          >
            {game.genre}
          </span>
        </div>

        {/* Status badge for cards without image */}
        {!image && (
          <div className="mb-3">
            <span
              className="text-xs font-display font-bold tracking-wider uppercase px-3 py-1 rounded-full"
              style={statusConfig.style}
            >
              {statusConfig.label}
            </span>
          </div>
        )}

        {/* Description */}
        <p
          className="text-sm font-body leading-relaxed mb-4"
          style={{ color: "oklch(0.65 0.015 260)" }}
        >
          {game.description}
        </p>

        {/* Link button */}
        {game.link && (
          <a
            href={game.link}
            target="_blank"
            rel="noopener noreferrer"
            data-ocid={`games.link.${index + 1}`}
          >
            <Button
              variant="outline"
              size="sm"
              className="w-full font-display font-bold tracking-wider uppercase text-xs gap-2 transition-all duration-300"
              style={{
                borderColor: "oklch(0.72 0.22 290 / 0.4)",
                color: "oklch(0.72 0.22 290)",
                background: "transparent",
              }}
            >
              <ExternalLink className="w-3 h-3" />
              Play Now
            </Button>
          </a>
        )}
        {!game.link && (
          <Button
            variant="outline"
            size="sm"
            disabled
            className="w-full font-display font-bold tracking-wider uppercase text-xs gap-2"
            style={{
              borderColor: "oklch(0.22 0.02 265)",
              color: "oklch(0.4 0.01 260)",
              background: "transparent",
            }}
          >
            Coming Soon
          </Button>
        )}
      </div>
    </motion.article>
  );
}
