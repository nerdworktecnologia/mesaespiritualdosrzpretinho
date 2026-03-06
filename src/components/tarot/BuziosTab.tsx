import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { odus, Odu } from "@/data/odus";

interface BuziosResult {
  buzios: number[];
  abertos: number;
  odu: Odu;
}

function jogarBuzios(): BuziosResult {
  const buzios: number[] = [];
  for (let i = 0; i < 16; i++) {
    buzios.push(Math.random() < 0.5 ? 0 : 1);
  }
  let abertos = buzios.reduce((a, b) => a + b, 0);
  if (abertos === 0) abertos = 1;
  if (abertos > 16) abertos = 16;
  const odu = odus[abertos - 1];
  return { buzios, abertos, odu };
}

export default function BuziosTab() {
  const [result, setResult] = useState<BuziosResult | null>(null);

  const handleJogar = () => {
    setResult(jogarBuzios());
  };

  return (
    <Card className="card-mystical mystic-glow animate-fade-up">
      <CardHeader className="pb-3">
        <CardTitle className="font-cinzel gold-text text-lg">🐚 Jogo de Búzios</CardTitle>
        <p className="text-muted-foreground text-xs">16 búzios — ● aberto / ○ fechado</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button onClick={handleJogar} className="w-full font-cinzel text-base py-5">
          🐚 Jogar Búzios
        </Button>

        {result && (
          <div className="space-y-4 animate-fade-up">
            {/* Búzios visual */}
            <div className="flex flex-wrap justify-center gap-2 py-3">
              {result.buzios.map((b, i) => (
                <span
                  key={i}
                  className={`text-2xl transition-all ${
                    b === 1 ? "text-primary drop-shadow-[0_0_6px_hsl(var(--primary)/0.6)]" : "text-muted-foreground/40"
                  }`}
                >
                  {b === 1 ? "●" : "○"}
                </span>
              ))}
            </div>

            {/* Resultado */}
            <div className="text-center space-y-2 p-4 rounded-lg bg-secondary/50 border border-border/50">
              <p className="text-muted-foreground text-sm">
                Abertos: <span className="text-primary font-bold">{result.abertos}</span> de 12
              </p>
              <p className="font-cinzel gold-text text-2xl font-bold">{result.odu.name}</p>
              <p className="text-accent text-sm font-cinzel">{result.odu.orixa}</p>
              <p className="text-foreground/70 text-sm mt-2 leading-relaxed">{result.odu.meaning}</p>
            </div>

            {/* Detalhes */}
            <div className="card-mystical rounded-lg p-4 border border-primary/20 space-y-2">
              <p className="text-foreground/80 text-sm"><span className="text-primary font-semibold">Personalidade:</span> {result.odu.personality}</p>
              <p className="text-foreground/80 text-sm"><span className="text-primary font-semibold">Conselho:</span> {result.odu.advice}</p>
              <p className="text-foreground/80 text-sm"><span className="text-destructive font-semibold">⚠️ Evitar:</span> {result.odu.evitar}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
