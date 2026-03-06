import { CardMeaning } from "@/data/cardMeanings";

interface TarotCardProps {
  card: CardMeaning;
  size?: "sm" | "md" | "lg";
  showMeaning?: boolean;
  animate?: boolean;
}

export default function TarotCard({ card, size = "md", showMeaning = false, animate = true }: TarotCardProps) {
  const sizes = {
    sm: "w-20 h-28",
    md: "w-28 h-40",
    lg: "w-36 h-52",
  };

  const iconSizes = {
    sm: "text-2xl",
    md: "text-4xl",
    lg: "text-5xl",
  };

  const numberSizes = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  const nameSizes = {
    sm: "text-[8px]",
    md: "text-[10px]",
    lg: "text-xs",
  };

  return (
    <div className={`flex flex-col items-center gap-2 ${animate ? "animate-fade-up" : ""}`}>
      <div
        className={`${sizes[size]} relative rounded-lg overflow-hidden flex flex-col items-center justify-center cursor-default select-none transition-transform hover:scale-105`}
        style={{
          background: "linear-gradient(145deg, hsl(270 25% 14%), hsl(270 30% 8%))",
          border: "1.5px solid hsl(45 90% 55% / 0.3)",
          boxShadow: "0 4px 20px hsl(45 90% 55% / 0.1), inset 0 1px 0 hsl(45 90% 55% / 0.1)",
        }}
      >
        {/* Corner decorations */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute top-1 left-1.5 font-cinzel gold-text font-bold" style={{ fontSize: size === "sm" ? "8px" : "10px" }}>
            {card.number}
          </div>
          <div className="absolute bottom-1 right-1.5 font-cinzel gold-text font-bold rotate-180" style={{ fontSize: size === "sm" ? "8px" : "10px" }}>
            {card.number}
          </div>
          {/* Border ornament lines */}
          <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, hsl(45 90% 55% / 0.3), transparent)" }} />
          <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, hsl(45 90% 55% / 0.3), transparent)" }} />
        </div>

        {/* Card content */}
        <span className={`${iconSizes[size]} drop-shadow-lg`} role="img" aria-label={card.name}>
          {card.icon}
        </span>
        <span className={`font-cinzel gold-text font-bold mt-1 ${numberSizes[size]}`}>
          {card.number}
        </span>
        <span className={`font-cinzel text-foreground/70 text-center px-1 leading-tight ${nameSizes[size]}`}>
          {card.name}
        </span>
      </div>

      {showMeaning && (
        <div className="max-w-[140px] text-center">
          <p className="text-foreground/60 text-xs font-crimson italic leading-snug">{card.shortMeaning}</p>
        </div>
      )}
    </div>
  );
}
