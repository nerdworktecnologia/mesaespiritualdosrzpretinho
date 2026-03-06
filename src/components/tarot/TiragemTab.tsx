import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cardMeanings, CardMeaning, getYesNoResult } from "@/data/cardMeanings";
import { generateFullResponse, generateShortResponse, generateYesNoResponse } from "@/utils/generateResponse";

type ReadingType = "1" | "3" | "5" | "7" | "9" | "yesno";

const readingOptions: { value: ReadingType; label: string; count: number }[] = [
  { value: "1", label: "1 carta — resposta rápida", count: 1 },
  { value: "3", label: "3 cartas — passado / presente / futuro", count: 3 },
  { value: "5", label: "5 cartas — cruz espiritual", count: 5 },
  { value: "7", label: "7 cartas — caminho da pergunta", count: 7 },
  { value: "9", label: "9 cartas — tiragem completa", count: 9 },
  { value: "yesno", label: "Sim ou Não", count: 1 },
];

export default function TiragemTab() {
  const [readingType, setReadingType] = useState<ReadingType | null>(null);
  const [cardInput, setCardInput] = useState("");
  const [question, setQuestion] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [resolvedCards, setResolvedCards] = useState<CardMeaning[]>([]);

  const handleReading = () => {
    const numbers = cardInput
      .split(/[\s,]+/)
      .map((n) => parseInt(n.trim()))
      .filter((n) => n >= 1 && n <= 21);

    const option = readingOptions.find((o) => o.value === readingType);
    if (!option || numbers.length !== option.count) return;

    const cards = numbers.map((n) => cardMeanings[n - 1]).filter(Boolean);
    setResolvedCards(cards);

    if (readingType === "yesno") {
      setResult(generateYesNoResponse(cards[0]));
    } else {
      setResult(generateFullResponse(cards, question));
    }
  };

  const handleShort = () => {
    if (resolvedCards.length > 0) {
      setResult(generateShortResponse(resolvedCards));
    }
  };

  const reset = () => {
    setReadingType(null);
    setCardInput("");
    setQuestion("");
    setResult(null);
    setResolvedCards([]);
  };

  return (
    <Card className="card-mystical mystic-glow mt-4 animate-fade-up">
      <CardHeader>
        <CardTitle className="font-cinzel gold-text text-xl">🔮 Tiragem do Baralho</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Reading type selection */}
        {!readingType && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {readingOptions.map((opt) => (
              <Button
                key={opt.value}
                variant="secondary"
                className="justify-start font-crimson text-base py-6 border border-border hover:border-primary/50 transition-all"
                onClick={() => setReadingType(opt.value)}
              >
                {opt.label}
              </Button>
            ))}
          </div>
        )}

        {/* Card input */}
        {readingType && !result && (
          <div className="space-y-4 animate-fade-up">
            <div className="flex items-center justify-between">
              <h3 className="font-cinzel text-primary">
                {readingOptions.find((o) => o.value === readingType)?.label}
              </h3>
              <Button variant="ghost" size="sm" onClick={reset}>← Voltar</Button>
            </div>

            {readingType !== "yesno" && (
              <div className="space-y-2">
                <Label className="text-foreground/80">Pergunta</Label>
                <Input
                  placeholder="Qual a pergunta do cliente?"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  className="bg-muted/50 border-border"
                />
              </div>
            )}

            <div className="space-y-2">
              <Label className="text-foreground/80">
                Números das cartas (1-21) — {readingOptions.find((o) => o.value === readingType)?.count} carta(s)
              </Label>
              <Input
                placeholder="Ex: 12 3 18"
                value={cardInput}
                onChange={(e) => setCardInput(e.target.value)}
                className="bg-muted/50 border-border text-lg font-cinzel tracking-widest"
              />
            </div>

            <Button onClick={handleReading} className="w-full font-cinzel text-lg py-6">
              🃏 Realizar Tiragem
            </Button>
          </div>
        )}

        {/* Result */}
        {result && (
          <div className="space-y-4 animate-fade-up">
            <div className="flex items-center justify-between">
              <h3 className="font-cinzel text-primary">Resultado</h3>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleShort} className="border-primary/30">
                  🔥 Resposta curta
                </Button>
                <Button variant="ghost" size="sm" onClick={reset}>Nova tiragem</Button>
              </div>
            </div>

            {/* Card display */}
            <div className="flex flex-wrap gap-3 justify-center">
              {resolvedCards.map((card) => {
                const yesNo = getYesNoResult(card.number);
                return (
                  <div
                    key={card.number}
                    className="card-mystical rounded-lg p-3 text-center w-28 border border-primary/20 animate-fade-up"
                  >
                    <p className="font-cinzel gold-text text-2xl font-bold">{card.number}</p>
                    <p className="text-foreground text-xs font-cinzel mt-1">{card.name}</p>
                  </div>
                );
              })}
            </div>

            {/* Response */}
            <div className="card-mystical rounded-lg p-6 border border-primary/20">
              <pre className="whitespace-pre-wrap font-crimson text-foreground/90 text-lg leading-relaxed">
                {result}
              </pre>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
