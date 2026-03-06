import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cardMeanings, CardMeaning, getYesNoResult } from "@/data/cardMeanings";
import TarotCard from "./TarotCard";
import { generateFullResponse, generateShortResponse, generateYesNoResponse } from "@/utils/generateResponse";
import { addToHistory } from "@/utils/history";
import { playRevealSound, playResultSound } from "@/utils/sounds";

type ReadingType = "1" | "3" | "5" | "7" | "9" | "yesno";

const readingOptions: { value: ReadingType; label: string; count: number }[] = [
  { value: "1", label: "1 carta", count: 1 },
  { value: "3", label: "3 cartas", count: 3 },
  { value: "5", label: "5 cartas", count: 5 },
  { value: "7", label: "7 cartas", count: 7 },
  { value: "9", label: "9 cartas", count: 9 },
  { value: "yesno", label: "Sim ou Não", count: 1 },
];

export default function TiragemTab() {
  const [readingType, setReadingType] = useState<ReadingType | null>(null);
  const [cardInput, setCardInput] = useState("");
  const [question, setQuestion] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [resolvedCards, setResolvedCards] = useState<CardMeaning[]>([]);
  const [showResult, setShowResult] = useState(false);

  const handleReading = () => {
    const numbers = cardInput
      .split(/[\s,]+/)
      .map((n) => parseInt(n.trim()))
      .filter((n) => n >= 1 && n <= 36);

    const option = readingOptions.find((o) => o.value === readingType);
    if (!option || numbers.length !== option.count) return;

    const cards = numbers.map((n) => cardMeanings[n - 1]).filter(Boolean);
    setResolvedCards(cards);
    setShowResult(false);

    cards.forEach((_, i) => {
      setTimeout(() => playRevealSound(), i * 500 + 200);
    });

    let response: string;
    if (readingType === "yesno") {
      response = generateYesNoResponse(cards[0]);
    } else {
      response = generateFullResponse(cards, question);
    }
    setResult(response);

    setTimeout(() => {
      setShowResult(true);
      playResultSound();
    }, cards.length * 500 + 800);

    addToHistory({
      clientName: "",
      question: question || "Sim ou Não",
      readingType: option.label,
      cardNumbers: numbers,
      result: response,
    });
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
    setShowResult(false);
  };

  return (
    <Card className="card-mystical mt-4 animate-fade-up">
      <CardContent className="pt-6 space-y-4">
        <h3 className="font-cinzel text-foreground tracking-wider text-sm uppercase">Tiragem</h3>

        {/* Type selection */}
        {!readingType && (
          <div className="grid grid-cols-3 gap-2">
            {readingOptions.map((opt) => (
              <Button
                key={opt.value}
                variant="secondary"
                className="font-cinzel text-xs py-5 border border-border hover:border-foreground/30 hover:bg-foreground/5 transition-all"
                onClick={() => setReadingType(opt.value)}
              >
                {opt.label}
              </Button>
            ))}
          </div>
        )}

        {/* Input */}
        {readingType && !result && (
          <div className="space-y-4 animate-fade-up">
            <div className="flex items-center justify-between">
              <p className="text-foreground/60 text-sm font-cinzel">
                {readingOptions.find((o) => o.value === readingType)?.label}
              </p>
              <Button variant="ghost" size="sm" onClick={reset} className="text-muted-foreground text-xs">
                ← Voltar
              </Button>
            </div>

            {readingType !== "yesno" && (
              <div className="space-y-2">
                <Label className="text-foreground/50 text-xs uppercase tracking-wider">Pergunta</Label>
                <Input
                  placeholder="Qual a pergunta?"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  className="bg-secondary border-border"
                />
              </div>
            )}

            <div className="space-y-2">
              <Label className="text-foreground/50 text-xs uppercase tracking-wider">
                Cartas (1-36) — {readingOptions.find((o) => o.value === readingType)?.count} carta(s)
              </Label>
              <Input
                placeholder="Ex: 12 3 18"
                value={cardInput}
                onChange={(e) => setCardInput(e.target.value)}
                className="bg-secondary border-border text-lg font-cinzel tracking-widest"
              />
            </div>

            <Button
              onClick={handleReading}
              className="w-full font-cinzel text-sm py-6 tracking-wider uppercase bg-foreground text-background hover:bg-foreground/90"
            >
              Gerar Leitura
            </Button>
          </div>
        )}

        {/* Result */}
        {result && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-foreground/60 text-sm font-cinzel uppercase tracking-wider">Resultado</p>
              <div className="flex gap-2">
                <Button variant="secondary" size="sm" onClick={handleShort} className="text-xs border border-border">
                  Versão curta
                </Button>
                <Button variant="ghost" size="sm" onClick={reset} className="text-xs text-muted-foreground">
                  Nova tiragem
                </Button>
              </div>
            </div>

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
              <div className="card-mystical rounded-lg p-6 border border-border animate-fade-up">
                <pre className="whitespace-pre-wrap font-crimson text-foreground/80 text-lg leading-relaxed">
                  {result}
                </pre>
              </div>
            )}

            {!showResult && (
              <div className="text-center py-4">
                <p className="text-muted-foreground font-crimson italic animate-pulse">
                  Revelando as cartas...
                </p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
