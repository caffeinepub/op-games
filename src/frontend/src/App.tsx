import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ChevronDown,
  Crosshair,
  Gamepad2,
  Menu,
  QrCode,
  Shield,
  Trash2,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { type Game, Status } from "./backend.d";
import { useGetGames } from "./hooks/useQueries";
import { useQRScanner } from "./qr-code/useQRScanner";

const GAME_IMAGES: Record<string, string> = {
  "Shadow Strike OP": "/assets/generated/shadow-strike-op.dim_400x500.jpg",
  "Warzone Legends": "/assets/generated/warzone-legends.dim_400x500.jpg",
  "Elite Ops: FireStorm":
    "/assets/generated/elite-ops-firestorm.dim_400x500.jpg",
  "Phantom Battle X": "/assets/generated/phantom-battle-x.dim_400x500.jpg",
  "Sniper Fury OP": "/assets/generated/sniper-fury-op.dim_400x500.jpg",
  "Last Survivor OP": "/assets/generated/last-survivor-op.dim_400x500.jpg",
  "DeadZone Royale": "/assets/generated/deadzone-royale.dim_400x500.jpg",
  "Survival King X": "/assets/generated/survival-king-x.dim_400x500.jpg",
  "BattleGround Fury": "/assets/generated/battleground-fury.dim_400x500.jpg",
};

const FALLBACK_GAMES: Game[] = [
  {
    id: "1",
    title: "Shadow Strike OP",
    description:
      "Master the shadows in this intense third-person action game. Stealth, speed, and strategy define your path to victory in neon-lit urban battlegrounds.",
    genre: "Action / Battle",
    status: Status.released,
    year: 2024n,
  },
  {
    id: "2",
    title: "Warzone Legends",
    description:
      "Lead your squad through explosive third-person war zones. Tactical combat meets raw firepower in the ultimate battle arena.",
    genre: "Action / Battle",
    status: Status.released,
    year: 2024n,
  },
  {
    id: "3",
    title: "Elite Ops: FireStorm",
    description:
      "Command elite operatives through firestorm-level missions. Every decision counts in this high-octane third-person battle experience.",
    genre: "Action / Battle",
    status: Status.released,
    year: 2024n,
  },
  {
    id: "4",
    title: "Phantom Battle X",
    description:
      "Harness phantom powers in brutal third-person combat. Spectral abilities meet tactical warfare in the most intense battle yet.",
    genre: "Action / Battle",
    status: Status.comingSoon,
    year: 2025n,
  },
  {
    id: "5",
    title: "Sniper Fury OP",
    description:
      "Take precise third-person sniper control across massive open environments. Hunt or be hunted in the most realistic tactical shooter.",
    genre: "Action / Battle",
    status: Status.released,
    year: 2024n,
  },
  {
    id: "6",
    title: "Last Survivor OP",
    description:
      "Be the last one standing in this brutal third-person survival battle. Scavenge, build, and fight your way to the top.",
    genre: "Survival / Battle",
    status: Status.released,
    year: 2024n,
  },
  {
    id: "7",
    title: "DeadZone Royale",
    description:
      "Fight for survival in toxic dead zones where the environment is as deadly as your enemies. Third-person battle royale at its finest.",
    genre: "Survival / Battle",
    status: Status.released,
    year: 2024n,
  },
  {
    id: "8",
    title: "Survival King X",
    description:
      "Claim the throne in this ultimate third-person survival challenge. Outsmart, outlast, and outfight every opponent.",
    genre: "Survival / Battle",
    status: Status.inDevelopment,
    year: 2025n,
  },
  {
    id: "9",
    title: "BattleGround Fury",
    description:
      "Unleash unstoppable fury across vast battlegrounds. Third-person combat intensity pushed to the absolute limit.",
    genre: "Survival / Battle",
    status: Status.comingSoon,
    year: 2025n,
  },
];

const SKELETON_KEYS = ["sk1", "sk2", "sk3", "sk4", "sk5", "sk6"];

type FilterTab = "all" | "action" | "survival";

function isSurvivalGame(genre: string) {
  return genre.toLowerCase().includes("survival");
}

function StatusBadge({ status }: { status: Status }) {
  if (status === Status.released) {
    return (
      <span
        style={{
          background: "oklch(0.72 0.22 145 / 0.2)",
          border: "1px solid oklch(0.72 0.22 145 / 0.5)",
          color: "oklch(0.72 0.22 145)",
        }}
        className="text-xs font-semibold px-2 py-0.5 rounded-full"
      >
        Released
      </span>
    );
  }
  if (status === Status.inDevelopment) {
    return (
      <span
        style={{
          background: "oklch(0.85 0.18 90 / 0.2)",
          border: "1px solid oklch(0.85 0.18 90 / 0.5)",
          color: "oklch(0.85 0.18 90)",
        }}
        className="text-xs font-semibold px-2 py-0.5 rounded-full"
      >
        In Development
      </span>
    );
  }
  return (
    <span
      style={{
        background: "oklch(0.75 0.18 195 / 0.2)",
        border: "1px solid oklch(0.75 0.18 195 / 0.5)",
        color: "oklch(0.75 0.18 195)",
      }}
      className="text-xs font-semibold px-2 py-0.5 rounded-full"
    >
      Coming Soon
    </span>
  );
}

function GenreBadge({ genre }: { genre: string }) {
  const isSurvival = isSurvivalGame(genre);
  return (
    <span
      style={
        isSurvival
          ? {
              background: "oklch(0.72 0.22 145 / 0.2)",
              color: "oklch(0.72 0.22 145)",
              border: "1px solid oklch(0.72 0.22 145 / 0.4)",
            }
          : {
              background: "oklch(0.65 0.28 290 / 0.2)",
              color: "oklch(0.65 0.28 290)",
              border: "1px solid oklch(0.65 0.28 290 / 0.4)",
            }
      }
      className="text-xs font-semibold px-2 py-0.5 rounded-full"
    >
      {genre}
    </span>
  );
}

function GameCard({ game, index }: { game: Game; index: number }) {
  const imgSrc = GAME_IMAGES[game.title];
  const survival = isSurvivalGame(game.genre);
  const cardClass = survival
    ? "game-card survival rounded-xl overflow-hidden flex flex-col"
    : "game-card rounded-xl overflow-hidden flex flex-col";
  const ocid = `games.item.${index + 1}`;
  const btnOcid =
    game.status === Status.released
      ? `games.primary_button.${index + 1}`
      : `games.secondary_button.${index + 1}`;
  return (
    <motion.article
      data-ocid={ocid}
      className={cardClass}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
    >
      {/* Cover image */}
      <div className="relative overflow-hidden" style={{ aspectRatio: "16/9" }}>
        {imgSrc ? (
          <img
            src={imgSrc}
            alt={game.title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div
            style={{
              background: survival
                ? "oklch(0.20 0.10 145)"
                : "oklch(0.20 0.12 290)",
            }}
            className="w-full h-full flex items-center justify-center"
          >
            <Gamepad2 className="w-16 h-16 opacity-30" />
          </div>
        )}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(8,8,16,0.95) 0%, rgba(8,8,16,0.3) 50%, transparent 100%)",
          }}
        />
        <div className="absolute top-3 right-3">
          <StatusBadge status={game.status} />
        </div>
      </div>

      {/* Card content */}
      <div className="flex flex-col gap-2 p-4 flex-1">
        <h3 className="font-orbitron font-bold text-white text-base leading-tight">
          {game.title}
        </h3>
        <div className="flex flex-wrap gap-1.5 items-center">
          <GenreBadge genre={game.genre} />
          <span
            style={{
              background: "rgba(255,255,255,0.08)",
              color: "rgba(255,255,255,0.7)",
              border: "1px solid rgba(255,255,255,0.15)",
            }}
            className="text-xs font-medium px-2 py-0.5 rounded-full"
          >
            3rd Person
          </span>
          <span
            style={{ color: "rgba(255,255,255,0.4)" }}
            className="text-xs ml-auto"
          >
            {String(game.year)}
          </span>
        </div>
        <p
          className="text-xs leading-relaxed"
          style={{ color: "rgba(255,255,255,0.55)" }}
        >
          {game.description}
        </p>
        <div className="mt-auto pt-2">
          {game.status === Status.released ? (
            <Button
              type="button"
              data-ocid={btnOcid}
              className="w-full font-orbitron font-bold text-sm h-10 rounded-lg"
              style={{
                background: "oklch(0.65 0.28 290)",
                color: "white",
                border: "none",
              }}
              onClick={() => game.link && window.open(game.link, "_blank")}
            >
              ▶ PLAY NOW
            </Button>
          ) : (
            <Button
              type="button"
              data-ocid={btnOcid}
              disabled
              variant="outline"
              className="w-full font-orbitron font-bold text-sm h-10 rounded-lg"
              style={{
                borderColor: "oklch(0.75 0.18 195 / 0.5)",
                color: "oklch(0.75 0.18 195)",
                background: "transparent",
              }}
            >
              COMING SOON
            </Button>
          )}
        </div>
      </div>
    </motion.article>
  );
}

function GameCardSkeleton() {
  return (
    <div className="game-card rounded-xl overflow-hidden">
      <div
        className="skeleton"
        style={{
          aspectRatio: "16/9",
          background: "rgba(255,255,255,0.06)",
          borderRadius: "0",
        }}
      />
      <div className="p-4 space-y-3">
        <Skeleton
          className="h-5 w-3/4"
          style={{ background: "rgba(255,255,255,0.08)" }}
        />
        <Skeleton
          className="h-4 w-1/2"
          style={{ background: "rgba(255,255,255,0.06)" }}
        />
        <Skeleton
          className="h-12 w-full"
          style={{ background: "rgba(255,255,255,0.06)" }}
        />
        <Skeleton
          className="h-10 w-full"
          style={{ background: "rgba(255,255,255,0.06)" }}
        />
      </div>
    </div>
  );
}

function QRScannerModal({ onClose }: { onClose: () => void }) {
  const scanner = useQRScanner({ facingMode: "environment" });

  const handleToggle = async () => {
    if (scanner.isScanning) {
      await scanner.stopScanning();
    } else {
      await scanner.startScanning();
    }
  };

  const handleClose = async () => {
    if (scanner.isScanning) {
      await scanner.stopScanning();
    }
    onClose();
  };

  const formatTime = (ts: number) => {
    return new Date(ts).toLocaleTimeString();
  };

  return (
    <motion.div
      data-ocid="scanner.modal"
      className="fixed inset-0 z-[100] flex flex-col"
      style={{ background: "rgba(4,4,12,0.97)", backdropFilter: "blur(8px)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-5 py-4"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
      >
        <div className="flex items-center gap-3">
          <QrCode
            className="w-6 h-6"
            style={{ color: "oklch(0.75 0.18 195)" }}
          />
          <h2
            className="font-orbitron font-black tracking-widest"
            style={{ color: "oklch(0.75 0.18 195)", fontSize: "1.1rem" }}
          >
            QR SCANNER
          </h2>
        </div>
        <button
          type="button"
          data-ocid="scanner.close_button"
          onClick={handleClose}
          className="p-2 rounded-lg transition-colors"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "rgba(255,255,255,0.7)",
            cursor: "pointer",
          }}
          aria-label="Close scanner"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto flex flex-col lg:flex-row gap-6 p-5">
        {/* Camera Feed */}
        <div className="flex-1 flex flex-col gap-4">
          <div
            className="relative rounded-2xl overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
              aspectRatio: "4/3",
              minHeight: "200px",
            }}
          >
            <video
              ref={scanner.videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
              style={{ display: scanner.isScanning ? "block" : "none" }}
            />
            <canvas ref={scanner.canvasRef} style={{ display: "none" }} />

            {/* Idle state */}
            {!scanner.isScanning && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                <div
                  className="rounded-full p-6"
                  style={{
                    background: "oklch(0.75 0.18 195 / 0.1)",
                    border: "2px solid oklch(0.75 0.18 195 / 0.3)",
                  }}
                >
                  <QrCode
                    className="w-12 h-12"
                    style={{ color: "oklch(0.75 0.18 195 / 0.5)" }}
                  />
                </div>
                <p
                  className="font-orbitron text-xs tracking-wider text-center px-4"
                  style={{ color: "rgba(255,255,255,0.35)" }}
                >
                  Camera inactive — press START to scan
                </p>
              </div>
            )}

            {/* Scanning overlay */}
            {scanner.isScanning && (
              <div className="absolute inset-0 pointer-events-none">
                {/* Corner brackets */}
                {[
                  { pos: "top-4 left-4", border: "3px 0 0 3px" },
                  { pos: "top-4 right-4", border: "3px 3px 0 0" },
                  { pos: "bottom-4 left-4", border: "0 0 3px 3px" },
                  { pos: "bottom-4 right-4", border: "0 3px 3px 0" },
                ].map(({ pos, border }) => (
                  <div
                    key={pos}
                    className={`absolute w-8 h-8 ${pos}`}
                    style={{
                      borderColor: "oklch(0.75 0.18 195)",
                      borderStyle: "solid",
                      borderWidth: border,
                      boxShadow: "0 0 8px oklch(0.75 0.18 195 / 0.6)",
                    }}
                  />
                ))}
                {/* Scan line */}
                <motion.div
                  className="absolute left-4 right-4"
                  style={{
                    height: "2px",
                    background:
                      "linear-gradient(90deg, transparent, oklch(0.75 0.18 195), transparent)",
                    boxShadow: "0 0 8px oklch(0.75 0.18 195)",
                  }}
                  animate={{ top: ["15%", "85%", "15%"] }}
                  transition={{
                    duration: 2.5,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                />
              </div>
            )}

            {/* Error */}
            {scanner.error && (
              <div
                data-ocid="scanner.error_state"
                className="absolute inset-0 flex items-center justify-center p-4"
              >
                <p
                  className="font-orbitron text-xs text-center tracking-wide"
                  style={{ color: "oklch(0.7 0.22 25)" }}
                >
                  {scanner.error?.message ?? String(scanner.error)}
                </p>
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="flex gap-3">
            <button
              type="button"
              data-ocid="scanner.primary_button"
              onClick={handleToggle}
              className="flex-1 font-orbitron font-bold text-sm py-3 rounded-xl tracking-wider transition-all duration-200"
              style={{
                background: scanner.isScanning
                  ? "oklch(0.65 0.28 290 / 0.15)"
                  : "oklch(0.75 0.18 195)",
                border: scanner.isScanning
                  ? "1px solid oklch(0.65 0.28 290)"
                  : "none",
                color: scanner.isScanning ? "oklch(0.65 0.28 290)" : "#080810",
                cursor: "pointer",
                boxShadow: scanner.isScanning
                  ? "none"
                  : "0 0 20px oklch(0.75 0.18 195 / 0.4)",
              }}
            >
              {scanner.isScanning ? "⏹ STOP" : "▶ START SCAN"}
            </button>

            {scanner.qrResults.length > 0 && (
              <button
                type="button"
                data-ocid="scanner.delete_button"
                onClick={scanner.clearResults}
                className="p-3 rounded-xl transition-colors"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "rgba(255,255,255,0.5)",
                  cursor: "pointer",
                }}
                aria-label="Clear results"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Results Panel */}
        <div className="flex flex-col gap-3 lg:w-80">
          <h3
            className="font-orbitron font-bold text-xs tracking-widest"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            SCAN RESULTS
          </h3>

          {scanner.qrResults.length === 0 ? (
            <div
              data-ocid="scanner.empty_state"
              className="flex-1 flex flex-col items-center justify-center py-10 rounded-xl gap-3"
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <QrCode
                className="w-8 h-8"
                style={{ color: "rgba(255,255,255,0.15)" }}
              />
              <p
                className="font-orbitron text-xs tracking-wider text-center"
                style={{ color: "rgba(255,255,255,0.25)" }}
              >
                No codes scanned yet
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-2 max-h-96 lg:max-h-none overflow-y-auto">
              {scanner.qrResults.map((result, i) => (
                <motion.div
                  key={result.timestamp}
                  data-ocid={`scanner.item.${i + 1}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="rounded-xl p-4 flex flex-col gap-2"
                  style={{
                    background:
                      i === 0
                        ? "oklch(0.75 0.18 195 / 0.08)"
                        : "rgba(255,255,255,0.03)",
                    border:
                      i === 0
                        ? "1px solid oklch(0.75 0.18 195 / 0.3)"
                        : "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  {i === 0 && (
                    <span
                      className="font-orbitron text-xs font-bold tracking-widest"
                      style={{ color: "oklch(0.75 0.18 195)" }}
                    >
                      LATEST
                    </span>
                  )}
                  <p
                    className="text-sm break-all leading-relaxed"
                    style={{ color: "rgba(255,255,255,0.85)" }}
                  >
                    {result.data}
                  </p>
                  <span
                    className="font-orbitron text-xs"
                    style={{ color: "rgba(255,255,255,0.3)" }}
                  >
                    {formatTime(result.timestamp)}
                  </span>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

const NAV_LINKS = [
  { label: "Games", target: "games" },
  { label: "About", target: "about" },
  { label: "Contact", target: "contact" },
];

const FOOTER_LINKS = [
  { label: "Games", target: "games" },
  { label: "About", target: "about" },
];

const FEATURE_TAGS = ["3rd Person", "Action", "Battle", "Survival"];

const FILTER_TABS: { value: FilterTab; label: string }[] = [
  { value: "all", label: "All Games" },
  { value: "action", label: "Action / Battle" },
  { value: "survival", label: "Survival / Battle" },
];

const ABOUT_STATS = [
  {
    icon: <Gamepad2 className="w-8 h-8" />,
    value: "9",
    label: "Games",
    accent: "oklch(0.65 0.28 290)",
  },
  {
    icon: <Crosshair className="w-8 h-8" />,
    value: "3rd Person",
    label: "Perspective",
    accent: "oklch(0.75 0.18 195)",
  },
  {
    icon: <Shield className="w-8 h-8" />,
    value: "Mobile & Desktop",
    label: "Platforms",
    accent: "oklch(0.72 0.22 145)",
  },
];

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState<FilterTab>("all");
  const [scrolled, setScrolled] = useState(false);
  const [scannerOpen, setScannerOpen] = useState(false);

  const { data: gamesData, isLoading } = useGetGames();
  const games = gamesData && gamesData.length > 0 ? gamesData : FALLBACK_GAMES;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when scanner is open
  useEffect(() => {
    document.body.style.overflow = scannerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [scannerOpen]);

  const filteredGames = games.filter((g) => {
    if (filter === "action") return !isSurvivalGame(g.genre);
    if (filter === "survival") return isSurvivalGame(g.genre);
    return true;
  });

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={{ background: "#080810", minHeight: "100vh" }}>
      {/* ========== QR SCANNER MODAL ========== */}
      <AnimatePresence>
        {scannerOpen && (
          <QRScannerModal onClose={() => setScannerOpen(false)} />
        )}
      </AnimatePresence>

      {/* ========== NAVBAR ========== */}
      <header
        data-ocid="nav.panel"
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? "rgba(8,8,16,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <button
            type="button"
            data-ocid="nav.link"
            onClick={() => scrollTo("hero")}
            className="font-orbitron font-black text-xl tracking-widest neon-purple"
            style={{
              color: "oklch(0.65 0.28 290)",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            OP GAMES
          </button>

          <nav className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map(({ label, target }) => (
              <button
                type="button"
                key={target}
                data-ocid="nav.link"
                onClick={() => scrollTo(target)}
                className="font-orbitron font-semibold text-sm tracking-wider transition-colors duration-200"
                style={{
                  color: "rgba(255,255,255,0.7)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.color =
                    "oklch(0.65 0.28 290)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.color =
                    "rgba(255,255,255,0.7)";
                }}
              >
                {label}
              </button>
            ))}
            {/* Scanner button */}
            <button
              type="button"
              data-ocid="scanner.open_modal_button"
              onClick={() => setScannerOpen(true)}
              className="flex items-center gap-2 font-orbitron font-bold text-xs tracking-wider px-4 py-2 rounded-lg transition-all duration-200"
              style={{
                background: "oklch(0.75 0.18 195 / 0.1)",
                border: "1px solid oklch(0.75 0.18 195 / 0.4)",
                color: "oklch(0.75 0.18 195)",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "oklch(0.75 0.18 195 / 0.2)";
                e.currentTarget.style.boxShadow =
                  "0 0 12px oklch(0.75 0.18 195 / 0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "oklch(0.75 0.18 195 / 0.1)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <QrCode className="w-4 h-4" />
              SCANNER
            </button>
          </nav>

          <button
            type="button"
            data-ocid="nav.toggle"
            className="md:hidden p-2 rounded-lg"
            style={{
              color: "white",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              data-ocid="nav.modal"
              className="md:hidden mobile-menu"
              style={{
                background: "rgba(8,8,16,0.97)",
                borderBottom: "1px solid rgba(255,255,255,0.08)",
              }}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              <nav className="flex flex-col p-4 gap-1">
                {NAV_LINKS.map(({ label, target }) => (
                  <button
                    type="button"
                    key={target}
                    data-ocid="nav.link"
                    onClick={() => scrollTo(target)}
                    className="font-orbitron font-semibold text-sm tracking-wider py-3 px-4 rounded-lg text-left transition-colors"
                    style={{
                      color: "rgba(255,255,255,0.8)",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    {label}
                  </button>
                ))}
                {/* Scanner button in mobile menu */}
                <button
                  type="button"
                  data-ocid="scanner.open_modal_button"
                  onClick={() => {
                    setMenuOpen(false);
                    setScannerOpen(true);
                  }}
                  className="flex items-center gap-2 font-orbitron font-semibold text-sm tracking-wider py-3 px-4 rounded-lg text-left transition-colors"
                  style={{
                    color: "oklch(0.75 0.18 195)",
                    background: "oklch(0.75 0.18 195 / 0.07)",
                    border: "1px solid oklch(0.75 0.18 195 / 0.2)",
                    cursor: "pointer",
                  }}
                >
                  <QrCode className="w-4 h-4" />
                  Scanner
                </button>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main>
        {/* ========== HERO ========== */}
        <section
          id="hero"
          data-ocid="hero.section"
          className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 pt-16"
          style={{ background: "#080810" }}
        >
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div
              className="orb-purple absolute rounded-full"
              style={{
                width: "600px",
                height: "600px",
                top: "-150px",
                left: "-150px",
                background:
                  "radial-gradient(circle, oklch(0.65 0.28 290 / 0.18) 0%, transparent 70%)",
              }}
            />
            <div
              className="orb-cyan absolute rounded-full"
              style={{
                width: "500px",
                height: "500px",
                bottom: "-100px",
                right: "-100px",
                background:
                  "radial-gradient(circle, oklch(0.75 0.18 195 / 0.15) 0%, transparent 70%)",
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 50%, oklch(0.65 0.28 290 / 0.08) 0%, transparent 60%)",
              }}
            />
          </div>

          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(rgba(139,92,246,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.04) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />

          <div className="relative z-10 text-center flex flex-col items-center gap-6 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="hero-float"
            >
              <div
                className="font-orbitron font-black tracking-widest mb-2"
                style={{
                  fontSize: "clamp(3rem, 10vw, 7rem)",
                  color: "oklch(0.65 0.28 290)",
                  textShadow:
                    "0 0 20px oklch(0.65 0.28 290), 0 0 60px oklch(0.65 0.28 290 / 0.6), 0 0 120px oklch(0.65 0.28 290 / 0.3)",
                  lineHeight: 1,
                }}
              >
                OP GAMES
              </div>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="font-orbitron font-semibold tracking-widest"
              style={{
                fontSize: "clamp(0.9rem, 2.5vw, 1.3rem)",
                color: "oklch(0.75 0.18 195)",
                letterSpacing: "0.15em",
              }}
            >
              Third-Person Action &amp; Battle Games
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="font-orbitron font-bold"
              style={{
                fontSize: "clamp(1.1rem, 3vw, 1.6rem)",
                color: "rgba(255,255,255,0.9)",
                letterSpacing: "0.1em",
              }}
            >
              Dominate. Survive. Conquer.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-wrap gap-4 justify-center mt-2"
            >
              <button
                type="button"
                data-ocid="hero.primary_button"
                onClick={() => scrollTo("games")}
                className="font-orbitron font-bold text-sm tracking-wider px-8 py-3 rounded-lg transition-all duration-200 min-h-[44px]"
                style={{
                  background: "oklch(0.65 0.28 290)",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                  boxShadow: "0 0 20px oklch(0.65 0.28 290 / 0.5)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 0 40px oklch(0.65 0.28 290 / 0.8)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 0 20px oklch(0.65 0.28 290 / 0.5)";
                }}
              >
                ▶ PLAY NOW
              </button>
              <button
                type="button"
                data-ocid="hero.secondary_button"
                onClick={() => scrollTo("games")}
                className="font-orbitron font-bold text-sm tracking-wider px-8 py-3 rounded-lg transition-all duration-200 min-h-[44px]"
                style={{
                  background: "transparent",
                  color: "oklch(0.75 0.18 195)",
                  border: "2px solid oklch(0.75 0.18 195)",
                  cursor: "pointer",
                  boxShadow: "0 0 15px oklch(0.75 0.18 195 / 0.3) inset",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background =
                    "oklch(0.75 0.18 195 / 0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                }}
              >
                VIEW GAMES
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="flex flex-wrap gap-3 justify-center mt-2"
            >
              {FEATURE_TAGS.map((tag) => (
                <span
                  key={tag}
                  className="font-orbitron text-xs font-semibold tracking-widest px-4 py-2 rounded-full"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    color: "rgba(255,255,255,0.6)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          </div>

          <motion.button
            type="button"
            data-ocid="hero.toggle"
            onClick={() => scrollTo("games")}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "rgba(255,255,255,0.4)",
            }}
            aria-label="Scroll to games"
          >
            <ChevronDown className="w-8 h-8" />
          </motion.button>
        </section>

        {/* ========== GAMES SECTION ========== */}
        <section
          id="games"
          data-ocid="games.section"
          className="py-20 px-4 max-w-7xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2
              className="font-orbitron font-black tracking-widest mb-4"
              style={{ fontSize: "clamp(1.8rem, 5vw, 3rem)", color: "white" }}
            >
              OUR{" "}
              <span
                style={{
                  color: "oklch(0.65 0.28 290)",
                  textShadow: "0 0 20px oklch(0.65 0.28 290 / 0.6)",
                }}
              >
                GAMES
              </span>
            </h2>
            <div
              style={{
                width: "80px",
                height: "3px",
                background: "oklch(0.65 0.28 290)",
                margin: "0 auto 2rem",
                boxShadow: "0 0 10px oklch(0.65 0.28 290)",
              }}
            />

            <div
              data-ocid="games.filter.tab"
              className="inline-flex gap-2 p-1.5 rounded-xl"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              {FILTER_TABS.map(({ value, label }) => (
                <button
                  type="button"
                  key={value}
                  data-ocid="games.filter.tab"
                  onClick={() => setFilter(value)}
                  className="font-orbitron font-bold text-xs tracking-wider px-5 py-2.5 rounded-lg transition-all duration-200 min-h-[44px]"
                  style={{
                    background:
                      filter === value
                        ? value === "survival"
                          ? "oklch(0.72 0.22 145)"
                          : "oklch(0.65 0.28 290)"
                        : "transparent",
                    color: filter === value ? "white" : "rgba(255,255,255,0.5)",
                    border: "none",
                    cursor: "pointer",
                    boxShadow:
                      filter === value
                        ? value === "survival"
                          ? "0 0 15px oklch(0.72 0.22 145 / 0.4)"
                          : "0 0 15px oklch(0.65 0.28 290 / 0.4)"
                        : "none",
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
          </motion.div>

          {isLoading ? (
            <div
              data-ocid="games.loading_state"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {SKELETON_KEYS.map((k) => (
                <GameCardSkeleton key={k} />
              ))}
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={filter}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredGames.map((game, i) => (
                  <GameCard key={game.id} game={game} index={i} />
                ))}
              </motion.div>
            </AnimatePresence>
          )}

          {filteredGames.length === 0 && !isLoading && (
            <div data-ocid="games.empty_state" className="text-center py-20">
              <p
                className="font-orbitron"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                No games found in this category.
              </p>
            </div>
          )}
        </section>

        {/* ========== ABOUT SECTION ========== */}
        <section
          id="about"
          data-ocid="about.section"
          className="py-24 px-4 relative overflow-hidden"
          style={{
            background:
              "linear-gradient(180deg, #080810 0%, rgba(60,20,100,0.15) 50%, #080810 100%)",
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at 50% 50%, oklch(0.65 0.28 290 / 0.06) 0%, transparent 70%)",
            }}
          />

          <div className="max-w-4xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-14"
            >
              <h2
                className="font-orbitron font-black tracking-widest mb-4"
                style={{
                  fontSize: "clamp(1.8rem, 5vw, 3rem)",
                  color: "white",
                }}
              >
                ABOUT{" "}
                <span
                  style={{
                    color: "oklch(0.65 0.28 290)",
                    textShadow: "0 0 20px oklch(0.65 0.28 290 / 0.6)",
                  }}
                >
                  OP GAMES
                </span>
              </h2>
              <div
                style={{
                  width: "80px",
                  height: "3px",
                  background: "oklch(0.65 0.28 290)",
                  margin: "0 auto 2rem",
                  boxShadow: "0 0 10px oklch(0.65 0.28 290)",
                }}
              />
              <p
                className="text-base sm:text-lg leading-relaxed mx-auto max-w-2xl"
                style={{ color: "rgba(255,255,255,0.65)" }}
              >
                OP Games is a passionate indie game studio dedicated to building
                the most intense third-person action and survival battle
                experiences for both mobile and desktop players. We craft worlds
                where every decision matters, every shot counts, and only the
                strongest survive.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {ABOUT_STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  data-ocid="about.card"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  className="game-card rounded-2xl p-8 text-center flex flex-col items-center gap-3"
                >
                  <div style={{ color: stat.accent }}>{stat.icon}</div>
                  <div
                    className="font-orbitron font-black"
                    style={{
                      fontSize: "clamp(1.5rem, 4vw, 2rem)",
                      color: stat.accent,
                    }}
                  >
                    {stat.value}
                  </div>
                  <div
                    className="font-orbitron text-sm tracking-widest"
                    style={{ color: "rgba(255,255,255,0.5)" }}
                  >
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* ========== FOOTER / CONTACT ========== */}
      <footer
        id="contact"
        data-ocid="contact.section"
        className="py-16 px-4"
        style={{
          background: "#04040c",
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center gap-6">
          <div
            className="font-orbitron font-black tracking-widest neon-purple"
            style={{
              fontSize: "clamp(1.5rem, 5vw, 2.5rem)",
              color: "oklch(0.65 0.28 290)",
            }}
          >
            OP GAMES
          </div>
          <p
            className="font-orbitron text-sm tracking-widest max-w-md"
            style={{ color: "rgba(255,255,255,0.4)", letterSpacing: "0.15em" }}
          >
            WHERE LEGENDS ARE BORN AND SURVIVORS RISE
          </p>

          <div className="flex gap-8">
            {FOOTER_LINKS.map(({ label, target }) => (
              <button
                type="button"
                key={target}
                data-ocid="footer.link"
                onClick={() => scrollTo(target)}
                className="font-orbitron text-xs tracking-wider transition-colors"
                style={{
                  color: "rgba(255,255,255,0.4)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "oklch(0.65 0.28 290)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "rgba(255,255,255,0.4)";
                }}
              >
                {label}
              </button>
            ))}
          </div>

          <div
            style={{
              width: "100%",
              height: "1px",
              background: "rgba(255,255,255,0.06)",
            }}
          />

          <div
            className="flex flex-col sm:flex-row items-center gap-2 text-xs"
            style={{ color: "rgba(255,255,255,0.25)" }}
          >
            <span>
              &copy; {new Date().getFullYear()} OP Games. All rights reserved.
            </span>
            <span className="hidden sm:block">&middot;</span>
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "rgba(255,255,255,0.25)" }}
              className="hover:opacity-70 transition-opacity"
            >
              Built with ❤️ using caffeine.ai
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
