import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cardMeanings, CardMeaning } from "@/data/cardMeanings";
import { spreadMethods, SpreadMethod } from "@/data/spreadMethods";
import TarotCard from "./TarotCard";
import { generateFullResponse, generateShortResponse, generateYesNoResponse } from "@/utils/generateResponse";
import { addToHistory } from "@/utils/history";
import { playRevealSound, playResultSound } from "@/utils/sounds";

export default function TiragemTab() {
  const [method, setMethod] = useState<SpreadMethod | null>(null);
  const [cardInput, setCardInput] = useState("");
  const [question, setQuestion] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [resolvedCards, setResolvedCards] = useState<CardMeaning[]>([]);
  const [showResult, setShowResult] = useState(false);

  const handleReading = () => {
    if (!method) return;
    const numbers = cardInput
      .split(/[\s,]+/)
      .map((n) => parseInt(n.trim()))
      .filter((n) => n >= 1 && n <= 36);

    if (numbers.length !== method.cardCount) return;

    const cards = numbers.map((n) => cardMeanings[n - 1]).filter(Boolean);
    setResolvedCards(cards);
    setShowResult(false);

    cards.forEach((_, i) => {
      setTimeout(() => playRevealSound(), i * 300 + 200);
    });

    let response: string;
    if (method.id === "yesno") {
      response = generateYesNoResponse(cards[0]);
    } else {
      response = generateMethodResponse(cards, method, question);
    }
    setResult(response);

    setTimeout(() => {
      setShowResult(true);
      playResultSound();
    }, Math.min(cards.length * 300, 3000) + 800);

    addToHistory({
      clientName: "",
      question: question || method.name,
      readingType: method.name,
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
    setMethod(null);
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

        {/* Method selection */}
        {!method && (
          <div className="grid grid-cols-2 gap-2">
            {spreadMethods.map((m) => (
              <Button
                key={m.id}
                variant="secondary"
                className="font-cinzel text-[10px] py-5 border border-border hover:border-foreground/30 hover:bg-foreground/5 transition-all flex flex-col gap-1 h-auto whitespace-normal"
                onClick={() => setMethod(m)}
              >
                <span className="text-lg">{m.icon}</span>
                <span className="font-bold">{m.name}</span>
                <span className="text-muted-foreground font-sans text-[9px] leading-tight">{m.cardCount} carta{m.cardCount > 1 ? "s" : ""}</span>
              </Button>
            ))}
          </div>
        )}

        {/* Input */}
        {method && !result && (
          <div className="space-y-4 animate-fade-up">
            <div className="flex items-center justify-between">
              <p className="text-foreground/60 text-sm font-cinzel">
                {method.icon} {method.name}
              </p>
              <Button variant="ghost" size="sm" onClick={reset} className="text-muted-foreground text-xs">
                ← Voltar
              </Button>
            </div>

            <p className="text-muted-foreground text-xs">{method.subtitle}</p>

            {/* Position labels preview */}
            <PositionPreview method={method} />

            {method.id !== "yesno" && (
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
                Cartas (1-36) — {method.cardCount} carta{method.cardCount > 1 ? "s" : ""}
              </Label>
              <Input
                placeholder={`Ex: ${Array.from({ length: Math.min(method.cardCount, 5) }, (_, i) => i + 1).join(" ")}${method.cardCount > 5 ? " ..." : ""}`}
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
        {result && method && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-foreground/60 text-sm font-cinzel uppercase tracking-wider">
                {method.icon} {method.name}
              </p>
              <div className="flex gap-2">
                <Button variant="secondary" size="sm" onClick={handleShort} className="text-xs border border-border">
                  Versão curta
                </Button>
                <Button variant="ghost" size="sm" onClick={reset} className="text-xs text-muted-foreground">
                  Nova tiragem
                </Button>
              </div>
            </div>

            <SpreadLayout method={method} cards={resolvedCards} showMeaning={showResult} />

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

/* ── Position preview before input ── */
function PositionPreview({ method }: { method: SpreadMethod }) {
  if (method.cardCount <= 1) return null;

  return (
    <div className="rounded-lg bg-secondary/50 border border-border/50 p-3 space-y-1">
      <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-2">Posições</p>
      <div className="flex flex-wrap gap-1">
        {method.positions.map((p, i) => (
          <span key={i} className="text-[9px] px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
            {i + 1}. {p.label}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── Visual layout for cards ── */
function SpreadLayout({ method, cards, showMeaning }: { method: SpreadMethod; cards: CardMeaning[]; showMeaning: boolean }) {
  if (method.id === "cruz") return <CruzLayout cards={cards} method={method} showMeaning={showMeaning} />;
  if (method.id === "analise12") return <Analise12Layout cards={cards} method={method} showMeaning={showMeaning} />;
  if (method.id === "anonovo") return <AnoNovoLayout cards={cards} method={method} showMeaning={showMeaning} />;

  if (method.layout === "grid" && method.gridCols) {
    return (
      <div className="space-y-2 py-3">
        {Array.from({ length: Math.ceil(cards.length / method.gridCols) }, (_, row) => (
          <div key={row} className="flex flex-wrap gap-2 justify-center">
            {cards.slice(row * method.gridCols!, (row + 1) * method.gridCols!).map((card, ci) => {
              const idx = row * method.gridCols! + ci;
              return (
                <div key={card.number} className="flex flex-col items-center gap-1">
                  <span className="text-[9px] text-muted-foreground">{method.positions[idx]?.label}</span>
                  <TarotCard card={card} size={cards.length > 14 ? "sm" : "md"} showMeaning={showMeaning} revealed delay={idx * 300} />
                </div>
              );
            })}
          </div>
        ))}
      </div>
    );
  }

  // Linear / default
  return (
    <div className="flex flex-wrap gap-3 justify-center py-3">
      {cards.map((card, i) => (
        <div key={card.number} className="flex flex-col items-center gap-1">
          <span className="text-[9px] text-muted-foreground">{method.positions[i]?.label}</span>
          <TarotCard card={card} size="lg" showMeaning={showMeaning} revealed delay={i * 500} />
        </div>
      ))}
    </div>
  );
}

/* ── Cruz Mística: cross shape ── */
function CruzLayout({ cards, method, showMeaning }: { cards: CardMeaning[]; method: SpreadMethod; showMeaning: boolean }) {
  const pos = method.positions;
  // Layout: row1=[1,2,3], row2=[4,5], row3=[6] (but 5 cards mapped as cross)
  // Positions: 0=Passado, 1=Presente, 2=Futuro (top row), 3=Oculto (middle-left), 4=Conselho (bottom)
  return (
    <div className="flex flex-col items-center gap-2 py-3">
      <div className="flex gap-2 justify-center">
        {[0, 1, 2].map((i) => cards[i] && (
          <div key={i} className="flex flex-col items-center gap-1">
            <span className="text-[9px] text-muted-foreground">{pos[i]?.label}</span>
            <TarotCard card={cards[i]} size="md" showMeaning={showMeaning} revealed delay={i * 400} />
          </div>
        ))}
      </div>
      <div className="flex gap-2 justify-center">
        {[3, 4].map((i) => cards[i] && (
          <div key={i} className="flex flex-col items-center gap-1">
            <span className="text-[9px] text-muted-foreground">{pos[i]?.label}</span>
            <TarotCard card={cards[i]} size="md" showMeaning={showMeaning} revealed delay={i * 400} />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Análise do Problema: 12-card custom ── */
function Analise12Layout({ cards, method, showMeaning }: { cards: CardMeaning[]; method: SpreadMethod; showMeaning: boolean }) {
  const pos = method.positions;
  // Layout from image:
  // Left group: 10,11 top / 12 bottom  |  Center: 1,2,3 top / 4,5 mid / 6 bottom  |  Right group: 7,8 top / 9 bottom
  const groups = [
    { title: "A questão / Parceiro", indices: [9, 10, 11], cols: [2, 1] },
    { title: "Situação", indices: [0, 1, 2, 3, 4, 5], cols: [3, 2, 1] },
    { title: "Consulente", indices: [6, 7, 8], cols: [2, 1] },
  ];

  return (
    <div className="flex flex-wrap gap-6 justify-center py-3">
      {groups.map((g, gi) => (
        <div key={gi} className="flex flex-col items-center gap-1">
          <p className="text-[9px] text-muted-foreground uppercase tracking-wider mb-1">{g.title}</p>
          {g.cols.map((colCount, ri) => {
            const startIdx = g.cols.slice(0, ri).reduce((a, b) => a + b, 0);
            return (
              <div key={ri} className="flex gap-1 justify-center">
                {Array.from({ length: colCount }, (_, ci) => {
                  const idx = g.indices[startIdx + ci];
                  return cards[idx] ? (
                    <div key={idx} className="flex flex-col items-center gap-0.5">
                      <span className="text-[8px] text-muted-foreground">{pos[idx]?.label}</span>
                      <TarotCard card={cards[idx]} size="sm" showMeaning={showMeaning} revealed delay={idx * 250} />
                    </div>
                  ) : null;
                })}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

/* ── Ano Novo: 12 months + counsel ── */
function AnoNovoLayout({ cards, method, showMeaning }: { cards: CardMeaning[]; method: SpreadMethod; showMeaning: boolean }) {
  const meses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
  return (
    <div className="space-y-3 py-3">
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
        {meses.map((mes, mi) => (
          <div key={mi} className="flex flex-col items-center gap-1 p-2 rounded-lg bg-secondary/30 border border-border/30">
            <span className="text-[10px] font-cinzel text-primary font-bold">{mes}</span>
            <div className="flex gap-1">
              {[mi * 2, mi * 2 + 1].map((ci) => cards[ci] && (
                <TarotCard key={ci} card={cards[ci]} size="sm" showMeaning={showMeaning} revealed delay={ci * 200} />
              ))}
            </div>
          </div>
        ))}
      </div>
      {/* Counsel cards */}
      {cards.length >= 26 && (
        <div className="flex gap-2 justify-center">
          <div className="flex flex-col items-center gap-1">
            <span className="text-[9px] text-muted-foreground">Conselho do Ano</span>
            <div className="flex gap-1">
              {[24, 25].map((ci) => cards[ci] && (
                <TarotCard key={ci} card={cards[ci]} size="md" showMeaning={showMeaning} revealed delay={ci * 200} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Method-aware response generator ── */
function generateMethodResponse(cards: CardMeaning[], method: SpreadMethod, question: string): string {
  const lines: string[] = ["Sr. Zé Pretinho fala:", ""];

  cards.forEach((card, i) => {
    const pos = method.positions[i];
    lines.push(`Carta ${card.number} — ${card.name} (${pos?.label || `Pos ${i + 1}`})`);
    lines.push(card.meaning);
    lines.push("");
  });

  // Add method-specific synthesis
  if (method.id === "financeiro") {
    lines.push("📊 Leitura Vertical:");
    lines.push(`Como vem agindo: ${cards[0]?.shortMeaning}, ${cards[3]?.shortMeaning}, ${cards[6]?.shortMeaning}`);
    lines.push(`O que faz de errado: ${cards[1]?.shortMeaning}, ${cards[4]?.shortMeaning}, ${cards[7]?.shortMeaning}`);
    lines.push(`O que melhorar: ${cards[2]?.shortMeaning}, ${cards[5]?.shortMeaning}, ${cards[8]?.shortMeaning}`);
    lines.push("");
  }

  // Overall tone
  const posCount = cards.filter((c) => c.energy === "positive").length;
  const negCount = cards.filter((c) => c.energy === "alert").length;
  const tone = posCount > negCount ? "positive" : negCount > posCount ? "negative" : "neutral";

  const closings = [
    "O que for seu chega no tempo certo. Saravá.",
    "Quem tem fé não treme. Saravá.",
    "Segue firme e confia. Saravá.",
    "Fé no caminho. Saravá.",
  ];

  if (tone === "positive") lines.push("A energia geral é positiva. O caminho está aberto.");
  else if (tone === "negative") lines.push("A energia pede atenção e cuidado. Faça proteção espiritual.");
  else lines.push("A energia está em equilíbrio. Observe antes de agir.");

  lines.push("");
  lines.push(closings[Math.floor(Math.random() * closings.length)]);

  return lines.join("\n");
}
