import { useState, useEffect } from "react";
import { CardMeaning } from "@/data/cardMeanings";

interface TarotCardProps {
  card: CardMeaning;
  size?: "sm" | "md" | "lg";
  showMeaning?: boolean;
  revealed?: boolean;
  delay?: number;
}

export default function TarotCard({ card, size = "md", showMeaning = false, revealed = true, delay = 0 }: TarotCardProps) {
  const [flipped, setFlipped] = useState(!revealed);
  const [visible, setVisible] = useState(delay === 0);

  useEffect(() => {
    if (delay > 0) {
      const showTimer = setTimeout(() => setVisible(true), delay);
      const flipTimer = setTimeout(() => setFlipped(false), delay + 200);
      return () => { clearTimeout(showTimer); clearTimeout(flipTimer); };
    } else if (revealed) {
      setFlipped(false);
    }
  }, [revealed, delay]);

  const sizes = {
    sm: "w-20 h-28",
    md: "w-28 h-40",
    lg: "w-36 h-52",
  };

  const iconSizes = { sm: "text-2xl", md: "text-4xl", lg: "text-5xl" };
  const numberSizes = { sm: "text-xs", md: "text-sm", lg: "text-base" };
  const nameSizes = { sm: "text-[8px]", md: "text-[10px]", lg: "text-xs" };

  if (!visible) {
    return <div className={`${sizes[size]} rounded-lg opacity-0`} />;
  }

  return (
    <div className="flex flex-col items-center gap-2" style={{ perspective: "600px" }}>
      <div
        className={`${sizes[size]} relative cursor-default select-none`}
        style={{
          transformStyle: "preserve-3d",
          transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* Front face (revealed) */}
        <div
          className="absolute inset-0 rounded-lg overflow-hidden flex flex-col items-center justify-center"
          style={{
            backfaceVisibility: "hidden",
            background: "linear-gradient(145deg, hsl(270 25% 14%), hsl(270 30% 8%))",
            border: "1.5px solid hsl(45 90% 55% / 0.3)",
            boxShadow: flipped
              ? "0 4px 20px hsl(45 90% 55% / 0.1)"
              : "0 4px 30px hsl(45 90% 55% / 0.25), 0 0 40px hsl(45 90% 55% / 0.1)",
            transition: "box-shadow 0.5s ease",
          }}
        >
          {/* Corner numbers */}
          <div className="absolute top-1 left-1.5 font-cinzel gold-text font-bold" style={{ fontSize: size === "sm" ? "8px" : "10px" }}>
            {card.number}
          </div>
          <div className="absolute bottom-1 right-1.5 font-cinzel gold-text font-bold rotate-180" style={{ fontSize: size === "sm" ? "8px" : "10px" }}>
            {card.number}
          </div>
          {/* Border ornaments */}
          <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, hsl(45 90% 55% / 0.3), transparent)" }} />
          <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, hsl(45 90% 55% / 0.3), transparent)" }} />

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

        {/* Back face (hidden) */}
        <div
          className="absolute inset-0 rounded-lg overflow-hidden flex items-center justify-center"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            background: "linear-gradient(145deg, hsl(270 30% 12%), hsl(280 35% 8%))",
            border: "1.5px solid hsl(280 60% 30% / 0.5)",
            boxShadow: "0 4px 20px hsl(280 60% 30% / 0.15)",
          }}
        >
          {/* Back pattern */}
          <div className="flex flex-col items-center gap-1 opacity-60">
            <span className="text-3xl">🎩</span>
            <div className="w-8 h-px" style={{ background: "linear-gradient(90deg, transparent, hsl(45 90% 55% / 0.5), transparent)" }} />
            <span className="font-cinzel text-[8px] text-foreground/40 tracking-widest">MALANDRO</span>
          </div>
          {/* Cross pattern */}
          <div className="absolute inset-2 border border-foreground/5 rounded" />
          <div className="absolute inset-4 border border-foreground/5 rounded" />
        </div>
      </div>

      {showMeaning && !flipped && (
        <div className="max-w-[140px] text-center animate-fade-up">
          <p className="text-foreground/60 text-xs font-crimson italic leading-snug">{card.shortMeaning}</p>
        </div>
      )}
    </div>
  );
}
