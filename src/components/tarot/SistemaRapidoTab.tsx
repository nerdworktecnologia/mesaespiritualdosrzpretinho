import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cardMeanings, getYesNoResult, CardMeaning } from "@/data/cardMeanings";
import { generateShortResponse, generateFullResponse, generateYesNoResponse } from "@/utils/generateResponse";
import { addToHistory } from "@/utils/history";
import { playRevealSound, playResultSound } from "@/utils/sounds";
import TarotCard from "./TarotCard";
import { Mic, MicOff, RotateCcw } from "lucide-react";

type ReadingType = "1" | "3" | "5" | "yesno";
type GenerationMode = "auto" | "manual";
type ResponseLevel = "5s" | "15s" | "full";

const quickTopics = [
  { label: "❤️ Amor", q: "Sobre amor" },
  { label: "💼 Trabalho", q: "Sobre trabalho" },
  { label: "💔 Traição", q: "Sobre traição" },
  { label: "🔄 Volta", q: "Vai voltar?" },
  { label: "💰 Dinheiro", q: "Sobre dinheiro" },
  { label: "🧿 Inveja", q: "Sobre inveja" },
  { label: "🙏 Espiritual", q: "Orientação espiritual" },
];

function randomCards(count: number): number[] {
  const nums: number[] = [];
  while (nums.length < count) {
    const n = Math.floor(Math.random() * 36) + 1;
    if (!nums.includes(n)) nums.push(n);
  }
  return nums;
}

// Position labels per reading type
function getPositionLabels(type: ReadingType): string[] {
  if (type === "3") return ["Energia da Situação", "Obstáculo", "Conselho Espiritual"];
  if (type === "5") return ["Passado", "Presente", "Influência Oculta", "Conselho Espiritual", "Desfecho"];
  return [];
}

// Generate a 5-second ultra-short response
function generate5sResponse(cards: CardMeaning[], type: ReadingType): string {
  if (type === "yesno") {
    const { result } = getYesNoResult(cards[0].number);
    return `${result}. ${cards[0].shortMeaning}`;
  }
  return cards.map((c) => c.shortMeaning).join(" ");
}

// Generate a 15-second medium response
function generate15sResponse(cards: CardMeaning[], type: ReadingType): string {
  if (type === "yesno") {
    return generateYesNoResponse(cards[0]);
  }
  return generateShortResponse(cards);
}

// Generate a full spiritual response
function generateCompleteResponse(cards: CardMeaning[], question: string, type: ReadingType): string {
  if (type === "yesno") {
    return generateYesNoResponse(cards[0]);
  }
  return generateFullResponse(cards, question);
}

export default function SistemaRapidoTab() {
  const [question, setQuestion] = useState("");
  const [readingType, setReadingType] = useState<ReadingType>("3");
  const [mode, setMode] = useState<GenerationMode>("auto");
  const [cardInput, setCardInput] = useState("");
  const [isRecording, setIsRecording] = useState(false);

  // Result state
  const [resolvedCards, setResolvedCards] = useState<CardMeaning[]>([]);
  const [positions, setPositions] = useState<string[]>([]);
  const [response5s, setResponse5s] = useState("");
  const [response15s, setResponse15s] = useState("");
  const [responseFull, setResponseFull] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [activeResponse, setActiveResponse] = useState<ResponseLevel>("15s");
  const [hasResult, setHasResult] = useState(false);

  const handleVoice = () => {
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) return;
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SR();
    recognition.lang = "pt-BR";
    recognition.continuous = false;
    recognition.onstart = () => setIsRecording(true);
    recognition.onend = () => setIsRecording(false);
    recognition.onresult = (e: any) => setQuestion(e.results[0][0].transcript);
    recognition.onerror = () => setIsRecording(false);
    recognition.start();
  };

  const generate = () => {
    let numbers: number[];
    const count = readingType === "yesno" ? 1 : parseInt(readingType);

    if (mode === "auto") {
      numbers = randomCards(count);
    } else {
      numbers = cardInput.split(/[\s,]+/).map((n) => parseInt(n.trim())).filter((n) => n >= 1 && n <= 36);
      if (numbers.length !== count) return;
    }

    const cards = numbers.map((n) => cardMeanings[n - 1]).filter(Boolean);
    const labels = getPositionLabels(readingType);

    setResolvedCards(cards);
    setPositions(labels);
    setShowResult(false);
    setHasResult(true);

    // Play sounds sequentially
    cards.forEach((_, i) => setTimeout(() => playRevealSound(), i * 400 + 200));

    // Generate all three response levels
    const r5 = generate5sResponse(cards, readingType);
    const r15 = generate15sResponse(cards, readingType);
    const rFull = generateCompleteResponse(cards, question || "Consulta rápida", readingType);

    setResponse5s(r5);
    setResponse15s(r15);
    setResponseFull(rFull);

    setTimeout(() => {
      setShowResult(true);
      playResultSound();
    }, cards.length * 400 + 600);

    addToHistory({
      clientName: "",
      question: question || "Sistema Rápido",
      readingType: readingType === "yesno" ? "Sim/Não (Rápido)" : `Rápida ${count} carta(s)`,
      cardNumbers: numbers,
      result: rFull,
    });
  };

  const reset = () => {
    setQuestion("");
    setCardInput("");
    setResolvedCards([]);
    setPositions([]);
    setResponse5s("");
    setResponse15s("");
    setResponseFull("");
    setShowResult(false);
    setHasResult(false);
    setActiveResponse("15s");
  };

  const currentResponse = activeResponse === "5s" ? response5s : activeResponse === "15s" ? response15s : responseFull;

  return (
    <div className="space-y-4 pb-8">
      {!hasResult ? (
        <>
          {/* Quick topics */}
          <div className="flex flex-wrap gap-2">
            {quickTopics.map((t) => (
              <Button
                key={t.q}
                variant="outline"
                size="sm"
                className="font-crimson text-sm border-border"
                onClick={() => setQuestion(t.q)}
              >
                {t.label}
              </Button>
            ))}
          </div>

          {/* Question input with mic */}
          <div className="flex gap-2">
            <Input
              placeholder="Pergunta da cliente..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="bg-secondary border-border text-base font-crimson flex-1 py-5"
            />
            <Button
              variant={isRecording ? "destructive" : "secondary"}
              size="icon"
              className="h-[44px] w-12 shrink-0 border border-border"
              onClick={handleVoice}
            >
              {isRecording ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
            </Button>
          </div>
          {isRecording && <p className="text-foreground/60 text-sm animate-pulse font-crimson">🎙️ Gravando...</p>}

          {/* Reading type */}
          <div>
            <p className="font-cinzel text-xs uppercase tracking-widest text-muted-foreground mb-2">Tipo de Leitura</p>
            <div className="grid grid-cols-4 gap-2">
              {([["1", "1 Carta"], ["3", "3 Cartas"], ["5", "5 Cartas"], ["yesno", "Sim/Não"]] as const).map(([val, label]) => (
                <Button
                  key={val}
                  onClick={() => setReadingType(val as ReadingType)}
                  className={`font-cinzel text-xs tracking-wider py-4 ${readingType === val ? "bg-foreground text-background" : "bg-secondary text-foreground border border-border"}`}
                >
                  {label}
                </Button>
              ))}
            </div>
          </div>

          {/* Mode toggle */}
          <div>
            <p className="font-cinzel text-xs uppercase tracking-widest text-muted-foreground mb-2">Modo</p>
            <div className="grid grid-cols-2 gap-2">
              <Button
                onClick={() => setMode("auto")}
                className={`font-cinzel text-sm tracking-wider py-4 ${mode === "auto" ? "bg-foreground text-background" : "bg-secondary text-foreground border border-border"}`}
              >
                ⚡ Automático
              </Button>
              <Button
                onClick={() => setMode("manual")}
                className={`font-cinzel text-sm tracking-wider py-4 ${mode === "manual" ? "bg-foreground text-background" : "bg-secondary text-foreground border border-border"}`}
              >
                ✏️ Manual
              </Button>
            </div>
          </div>

          {/* Manual card input */}
          {mode === "manual" && (
            <Input
              placeholder={readingType === "yesno" ? "Nº da carta" : `${readingType} número(s) separados por vírgula`}
              value={cardInput}
              onChange={(e) => setCardInput(e.target.value)}
              className="bg-secondary border-border text-2xl font-cinzel tracking-[0.2em] text-center py-6"
            />
          )}

          {/* Generate button */}
          <Button
            onClick={generate}
            className="w-full font-cinzel text-lg py-8 tracking-wider uppercase bg-foreground text-background hover:bg-foreground/90 animate-glow-pulse"
          >
            ⚡ Gerar Leitura Agora
          </Button>
        </>
      ) : (
        /* ── Result view ── */
        <div className="space-y-4 animate-fade-up">
          {question && (
            <p className="text-muted-foreground text-sm font-crimson italic text-center">"{question}"</p>
          )}

          {/* Cards */}
          <div className="flex flex-wrap gap-3 justify-center py-2">
            {resolvedCards.map((card, i) => (
              <div key={card.number} className="flex flex-col items-center gap-1">
                <TarotCard card={card} size="md" showMeaning={showResult} revealed={true} delay={i * 400} />
                {positions[i] && showResult && (
                  <span className="font-cinzel text-[10px] text-muted-foreground uppercase tracking-wider mt-1">
                    {positions[i]}
                  </span>
                )}
              </div>
            ))}
          </div>

          {showResult ? (
            <>
              {/* Response level toggles */}
              <div className="grid grid-cols-3 gap-2">
                <Button
                  onClick={() => setActiveResponse("5s")}
                  className={`font-cinzel text-xs py-3 ${activeResponse === "5s" ? "bg-foreground text-background" : "bg-secondary text-foreground border border-border"}`}
                >
                  5 seg
                </Button>
                <Button
                  onClick={() => setActiveResponse("15s")}
                  className={`font-cinzel text-xs py-3 ${activeResponse === "15s" ? "bg-foreground text-background" : "bg-secondary text-foreground border border-border"}`}
                >
                  15 seg
                </Button>
                <Button
                  onClick={() => setActiveResponse("full")}
                  className={`font-cinzel text-xs py-3 ${activeResponse === "full" ? "bg-foreground text-background" : "bg-secondary text-foreground border border-border"}`}
                >
                  Completa
                </Button>
              </div>

              {/* Response content */}
              <div className="card-mystical rounded-lg p-5 border border-border animate-fade-up">
                <pre className="whitespace-pre-wrap font-crimson text-foreground/90 text-base md:text-lg leading-relaxed">
                  {currentResponse}
                </pre>
              </div>

              {/* New reading button */}
              <Button
                onClick={reset}
                className="w-full font-cinzel text-base py-6 tracking-wider uppercase bg-foreground text-background hover:bg-foreground/90"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Nova Leitura
              </Button>
            </>
          ) : (
            <p className="text-muted-foreground font-crimson text-lg italic animate-pulse text-center">
              Revelando...
            </p>
          )}
        </div>
      )}
    </div>
  );
}
