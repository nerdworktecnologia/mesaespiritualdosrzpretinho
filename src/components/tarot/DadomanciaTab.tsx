import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getDiceInterpretation } from "@/data/dadomancia";

const diceEmojis = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];

export default function DadomanciaTab() {
  const [dice, setDice] = useState<number[]>([0, 0, 0]);
  const [rolling, setRolling] = useState(false);
  const [hasResult, setHasResult] = useState(false);

  const rollDice = () => {
    setRolling(true);
    setHasResult(false);

    let count = 0;
    const interval = setInterval(() => {
      setDice([
        Math.floor(Math.random() * 6) + 1,
        Math.floor(Math.random() * 6) + 1,
        Math.floor(Math.random() * 6) + 1,
      ]);
      count++;
      if (count >= 12) {
        clearInterval(interval);
        const final = [
          Math.floor(Math.random() * 6) + 1,
          Math.floor(Math.random() * 6) + 1,
          Math.floor(Math.random() * 6) + 1,
        ];
        setDice(final);
        setRolling(false);
        setHasResult(true);
      }
    }, 100);
  };

  const sum = dice[0] + dice[1] + dice[2];
  const interpretation = hasResult ? getDiceInterpretation(dice[0], dice[1], dice[2]) : null;

  return (
    <Card className="border-border bg-card">
      <CardHeader className="pb-3">
        <CardTitle className="font-cinzel text-base text-center tracking-wider text-foreground">
          🎲 Dadomancia do Zé Pelintra
        </CardTitle>
        <p className="text-muted-foreground text-xs text-center font-crimson italic">
          Lance os 3 dados e receba a mensagem de Zé Pelintra
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Dice display */}
        <div className="flex justify-center gap-4">
          {dice.map((d, i) => (
            <div
              key={i}
              className={`w-16 h-16 md:w-20 md:h-20 rounded-lg border-2 border-border bg-secondary flex items-center justify-center text-4xl md:text-5xl transition-transform ${
                rolling ? "animate-bounce" : ""
              }`}
            >
              {d > 0 ? diceEmojis[d - 1] : "?"}
            </div>
          ))}
        </div>

        {/* Roll button */}
        <Button
          onClick={rollDice}
          disabled={rolling}
          className="w-full font-cinzel text-base py-5"
        >
          {rolling ? "🎲 Lançando..." : "🎲 Lançar os Dados"}
        </Button>

        {/* Result */}
        {hasResult && interpretation && (
          <div className="space-y-3 animate-fade-in">
            {/* Title & Sum */}
            <div className="text-center space-y-1">
              <h3 className="font-cinzel text-sm font-bold text-foreground">
                {interpretation.titulo}
              </h3>
              <p className="text-muted-foreground text-xs font-crimson">
                Dados: {dice[0]} + {dice[1]} + {dice[2]} = {sum}
              </p>
            </div>

            {/* Energia */}
            <div className="bg-secondary/50 border border-border rounded-lg p-3">
              <p className="text-xs font-cinzel text-muted-foreground uppercase tracking-wider mb-1">⚡ Energia</p>
              <p className="text-foreground font-crimson text-sm">{interpretation.energia}</p>
            </div>

            {/* Mensagem */}
            <div className="bg-secondary/50 border border-border rounded-lg p-3">
              <p className="text-xs font-cinzel text-muted-foreground uppercase tracking-wider mb-1">📜 Mensagem</p>
              <p className="text-foreground font-crimson text-sm leading-relaxed">{interpretation.mensagem}</p>
            </div>

            {/* Conselho */}
            <div className="bg-secondary/50 border border-border rounded-lg p-3">
              <p className="text-xs font-cinzel text-muted-foreground uppercase tracking-wider mb-1">💡 Conselho</p>
              <p className="text-foreground font-crimson text-sm">{interpretation.conselho}</p>
            </div>

            {/* Alerta (if any) */}
            {interpretation.alerta && (
              <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-3">
                <p className="text-xs font-cinzel text-destructive uppercase tracking-wider mb-1">⚠️ Alerta</p>
                <p className="text-destructive font-crimson text-sm">{interpretation.alerta}</p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
