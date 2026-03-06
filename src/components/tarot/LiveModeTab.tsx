import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cardMeanings } from "@/data/cardMeanings";
import { generateShortResponse, generateYesNoResponse } from "@/utils/generateResponse";
import { getYesNoResult } from "@/data/cardMeanings";
import { addToHistory } from "@/utils/history";
import { playRevealSound, playResultSound } from "@/utils/sounds";
import TarotCard from "./TarotCard";
import { CardMeaning } from "@/data/cardMeanings";

type LiveReading = "quick" | "yesno";

export default function LiveModeTab() {
  const [mode, setMode] = useState<LiveReading>("quick");
  const [question, setQuestion] = useState("");
  const [cardInput, setCardInput] = useState("");
  const [cardCount, setCardCount] = useState("1");
  const [result, setResult] = useState<string | null>(null);
  const [resolvedCards, setResolvedCards] = useState<CardMeaning[]>([]);
  const [showResult, setShowResult] = useState(false);

  const handleQuick = () => {
    const count = parseInt(cardCount);
    const numbers = cardInput
      .split(/[\s,]+/)
      .map((n) => parseInt(n.trim()))
      .filter((n) => n >= 1 && n <= 36);

    if (numbers.length !== count) return;

    const cards = numbers.map((n) => cardMeanings[n - 1]).filter(Boolean);
    setResolvedCards(cards);
    setShowResult(false);

    cards.forEach((_, i) => {
      setTimeout(() => playRevealSound(), i * 500 + 200);
    });

    const response = generateShortResponse(cards);
    setResult(response);

    setTimeout(() => {
      setShowResult(true);
      playResultSound();
    }, cards.length * 500 + 800);

    addToHistory({ clientName: "", question: question || "Live rápida", readingType: `Live ${cardCount} carta(s)`, cardNumbers: numbers, result: response });
  };

  const handleYesNo = () => {
    const num = parseInt(cardInput.trim());
    if (num < 1 || num > 36) return;
    const card = cardMeanings[num - 1];
    setResolvedCards([card]);
    setShowResult(false);

    setTimeout(() => playRevealSound(), 200);

    const { result: yesNoResult } = getYesNoResult(num);
    const response = `Resposta: ${yesNoResult}\n\n${generateYesNoResponse(card)}`;
    setResult(response);

    setTimeout(() => {
      setShowResult(true);
      playResultSound();
    }, 1300);

    addToHistory({ clientName: "", question: question || "Sim ou Não (Live)", readingType: "Live Sim/Não", cardNumbers: [num], result: response });
  };

  const reset = () => {
    setResult(null);
    setCardInput("");
    setQuestion("");
    setResolvedCards([]);
    setShowResult(false);
  };

  return (
    <Card className="card-mystical mt-4 border-accent/30 animate-fade-up" style={{ boxShadow: "0 0 30px hsl(340 70% 50% / 0.15)" }}>
      <CardHeader>
        <CardTitle className="font-cinzel text-accent text-xl">🔥 Modo Live — Resposta Rápida</CardTitle>
        <p className="text-muted-foreground text-sm">Otimizado para TikTok, YouTube e Instagram Live</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Mode toggle */}
        <div className="flex gap-2">
          <Button
            variant={mode === "quick" ? "default" : "secondary"}
            onClick={() => { setMode("quick"); reset(); }}
            className="flex-1 font-cinzel"
          >
            🃏 Tiragem Rápida
          </Button>
          <Button
            variant={mode === "yesno" ? "default" : "secondary"}
            onClick={() => { setMode("yesno"); reset(); }}
            className="flex-1 font-cinzel"
          >
            ✅ Sim ou Não
          </Button>
        </div>

        {!result && (
          <div className="space-y-3 animate-fade-up">
            <div className="space-y-2">
              <Label className="text-foreground/80">Pergunta</Label>
              <Input
                placeholder="Pergunta rápida..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="bg-muted/50 border-border"
              />
            </div>

            {mode === "quick" && (
              <div className="space-y-2">
                <Label className="text-foreground/80">Quantas cartas?</Label>
                <div className="flex gap-2">
                  {["1", "3", "5"].map((n) => (
                    <Button
                      key={n}
                      variant={cardCount === n ? "default" : "secondary"}
                      size="sm"
                      onClick={() => setCardCount(n)}
                      className="font-cinzel"
                    >
                      {n}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label className="text-foreground/80">
                {mode === "yesno" ? "Número da carta (1-36)" : `Números das cartas (${cardCount})`}
              </Label>
              <Input
                placeholder={mode === "yesno" ? "Ex: 7" : "Ex: 12 3 18"}
                value={cardInput}
                onChange={(e) => setCardInput(e.target.value)}
                className="bg-muted/50 border-border text-xl font-cinzel tracking-widest text-center"
                autoFocus
              />
            </div>

            <Button
              onClick={mode === "yesno" ? handleYesNo : handleQuick}
              className="w-full font-cinzel text-xl py-8 animate-glow-pulse"
            >
              ⚡ Gerar Resposta
            </Button>
          </div>
        )}

        {result && (
          <div className="space-y-4 animate-fade-up">
            {/* Card display with flip animation */}
            <div className="flex flex-wrap gap-4 justify-center py-4">
              {resolvedCards.map((card, index) => (
                <TarotCard
                  key={card.number}
                  card={card}
                  size="lg"
                  showMeaning={showResult}
                  revealed={true}
                  delay={index * 500}
                />
              ))}
            </div>

            {showResult && (
              <div className="card-mystical rounded-lg p-6 border border-accent/20 animate-fade-in">
                <pre className="whitespace-pre-wrap font-crimson text-foreground/90 text-xl leading-relaxed">
                  {result}
                </pre>
              </div>
            )}

            {!showResult && (
              <div className="text-center py-4">
                <p className="text-muted-foreground font-crimson italic animate-pulse">
                  ✨ Revelando as cartas...
                </p>
              </div>
            )}

            {showResult && (
              <div className="flex gap-2">
                <Button onClick={reset} variant="secondary" className="flex-1 font-cinzel py-6">
                  🔄 Nova Leitura
                </Button>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
