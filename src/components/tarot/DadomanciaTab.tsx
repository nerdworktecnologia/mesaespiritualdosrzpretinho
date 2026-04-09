import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const diceEmojis = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];

const interpretations: Record<number, string> = {
  3: "Momento de extrema cautela. Zé Pelintra pede paciência — não é hora de agir, mas de observar.",
  4: "Caminhos travados. Há algo oculto impedindo seu avanço. Faça uma limpeza espiritual.",
  5: "Mudança lenta chegando. Confie no tempo — as coisas vão se ajeitar aos poucos.",
  6: "Equilíbrio frágil. Cuide das suas relações e evite conflitos desnecessários.",
  7: "Sorte moderada. Zé Pelintra diz que o jogo está aberto, mas depende de você jogar certo.",
  8: "Boas oportunidades à vista. Fique atento aos sinais — uma porta vai se abrir.",
  9: "Prosperidade chegando. O caminho financeiro está favorável. Aproveite com sabedoria.",
  10: "Vitória garantida! Zé Pelintra abençoa seus passos. Vá em frente sem medo.",
  11: "Grande proteção espiritual. Seus guias estão ao seu lado. Momento de força e fé.",
  12: "Conquista plena! Os dados caíram a seu favor. Celebre, mas mantenha a humildade.",
  13: "Cuidado com excesso de confiança. A sorte pode virar se não agir com prudência.",
  14: "Transformação profunda. Algo antigo precisa morrer para o novo nascer.",
  15: "Caminho de luz. Zé Pelintra ilumina sua jornada. Siga com coragem e determinação.",
  16: "Abundância e fartura. Momento excelente para negócios e empreendimentos.",
  17: "Proteção máxima. Zé Pelintra está de guarda. Nenhum mal chegará até você.",
  18: "Realização total! O melhor resultado possível. Todos os caminhos estão abertos e abençoados.",
};

function getInterpretation(sum: number): string {
  return interpretations[sum] || "Consulte Zé Pelintra para orientação adicional.";
}

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
        {hasResult && (
          <div className="space-y-3 animate-fade-in">
            <div className="text-center">
              <span className="text-muted-foreground text-sm font-crimson">Soma: </span>
              <span className="text-foreground font-cinzel text-xl font-bold">{sum}</span>
            </div>
            <div className="bg-secondary/50 border border-border rounded-lg p-4">
              <p className="text-foreground font-crimson text-sm leading-relaxed">
                {getInterpretation(sum)}
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
