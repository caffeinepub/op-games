import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "motion/react";
import { useGetGames } from "../hooks/useQueries";
import { GameCard } from "./GameCard";

function GameCardSkeleton({ id }: { id: number }) {
  return (
    <div
      key={id}
      className="rounded-lg overflow-hidden"
      style={{
        background: "oklch(0.12 0.012 265 / 0.8)",
        border: "1px solid oklch(0.22 0.02 265)",
      }}
    >
      <Skeleton
        className="h-48 w-full"
        style={{ background: "oklch(0.18 0.015 265)" }}
      />
      <div className="p-5 space-y-3">
        <Skeleton
          className="h-5 w-3/4"
          style={{ background: "oklch(0.18 0.015 265)" }}
        />
        <Skeleton
          className="h-4 w-1/3"
          style={{ background: "oklch(0.18 0.015 265)" }}
        />
        <Skeleton
          className="h-16 w-full"
          style={{ background: "oklch(0.18 0.015 265)" }}
        />
        <Skeleton
          className="h-8 w-full"
          style={{ background: "oklch(0.18 0.015 265)" }}
        />
      </div>
    </div>
  );
}

export function GamesSection() {
  const { data: games, isLoading, isError } = useGetGames();

  return (
    <section
      id="games"
      className="relative py-24 px-6"
      style={{ background: "oklch(0.09 0.008 265)" }}
    >
      {/* Background grid */}
      <div className="absolute inset-0 grid-bg opacity-30" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p
            className="text-sm font-display tracking-[0.4em] uppercase font-medium mb-3"
            style={{ color: "oklch(0.72 0.22 290)" }}
          >
            Our Portfolio
          </p>
          <h2 className="font-display text-5xl md:text-6xl font-black tracking-tight text-foreground mb-4">
            THE GAMES
          </h2>
          <div
            className="h-px w-32 mx-auto"
            style={{
              background:
                "linear-gradient(90deg, transparent, oklch(0.72 0.22 290), transparent)",
            }}
          />
        </motion.div>

        {/* Games grid */}
        {isLoading && (
          <div
            data-ocid="games.loading_state"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            <GameCardSkeleton id={1} />
            <GameCardSkeleton id={2} />
            <GameCardSkeleton id={3} />
            <GameCardSkeleton id={4} />
          </div>
        )}

        {isError && (
          <div data-ocid="games.error_state" className="text-center py-16">
            <p
              className="font-display text-lg"
              style={{ color: "oklch(0.65 0.25 25)" }}
            >
              Failed to load games. Please try again.
            </p>
          </div>
        )}

        {!isLoading && !isError && games && games.length === 0 && (
          <div data-ocid="games.empty_state" className="text-center py-16">
            <p className="font-display text-lg text-muted-foreground">
              No games yet. Coming soon!
            </p>
          </div>
        )}

        {!isLoading && !isError && games && games.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {games.map((game, index) => (
              <GameCard key={game.id} game={game} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
