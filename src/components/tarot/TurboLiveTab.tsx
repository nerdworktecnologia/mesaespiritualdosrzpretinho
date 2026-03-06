import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cardMeanings, getYesNoResult, CardMeaning } from "@/data/cardMeanings";
import { generateShortResponse, generateFullResponse, generateYesNoResponse } from "@/utils/generateResponse";
import { detectTheme, getThemedCards, getThemeLabel, getAllThemes, QuestionTheme } from "@/utils/themeDetection";
import { playRevealSound, playResultSound } from "@/utils/sounds";
import { supabase } from "@/integrations/supabase/client";
import TarotCard from "./TarotCard";
import { Mic, MicOff, RotateCcw, Copy, Check, Sparkles, Loader2 } from "lucide-react";
import { toast } from "sonner";

type ReadingType = "1" | "3" | "yesno";

interface QueueItem {
  id: string;
  name: string;
  question: string;
  theme: QuestionTheme;
  cardNumbers: number[];
  quickResponse: string;
  fullResponse: string;
  time: string;
}

// Quick buttons that auto-fill question + detect theme
const turboButtons = [
  { label: "❤️ Ele volta?", q: "Ele vai voltar pra mim?", theme: "amor" as QuestionTheme },
  { label: "💭 Pensa em mim?", q: "Ele pensa em mim?", theme: "amor" as QuestionTheme },
  { label: "💔 Tem traição?", q: "Tem traição?", theme: "amor" as QuestionTheme },
  { label: "❤️ Me ama?", q: "Ele me ama?", theme: "amor" as QuestionTheme },
  { label: "💼 Arrumar emprego?", q: "Vou arrumar emprego?", theme: "trabalho" as QuestionTheme },
  { label: "💰 Entra dinheiro?", q: "Entra dinheiro?", theme: "dinheiro" as QuestionTheme },
  { label: "🧿 Tem inveja?", q: "Tem inveja em cima de mim?", theme: "espiritual" as QuestionTheme },
  { label: "🛡️ Tenho proteção?", q: "Tenho proteção espiritual?", theme: "espiritual" as QuestionTheme },
  { label: "🔄 Vai me procurar?", q: "Ele vai me procurar?", theme: "amor" as QuestionTheme },
  { label: "📈 Vou crescer?", q: "Vou crescer no trabalho?", theme: "trabalho" as QuestionTheme },
];

function generate5s(cards: CardMeaning[], type: ReadingType): string {
  if (type === "yesno") {
    const { result } = getYesNoResult(cards[0].number);
    return `${result}. ${cards[0].shortMeaning}`;
  }
  return cards.map((c) => c.shortMeaning).join(" ");
}

export default function TurboLiveTab() {
  const [clientName, setClientName] = useState("");
  const [question, setQuestion] = useState("");
  const [detectedTheme, setDetectedTheme] = useState<QuestionTheme>("geral");
  const [readingType, setReadingType] = useState<ReadingType>("3");
  const [isRecording, setIsRecording] = useState(false);
  const [copied, setCopied] = useState(false);
  const [useAI, setUseAI] = useState(true);
  const [aiLoading, setAiLoading] = useState(false);

  // Result
  const [resolvedCards, setResolvedCards] = useState<CardMeaning[]>([]);
  const [response5s, setResponse5s] = useState("");
  const [response10s, setResponse10s] = useState("");
  const [responseFull, setResponseFull] = useState("");
  const [activeLevel, setActiveLevel] = useState<"5s" | "10s" | "full">("5s");
  const [hasResult, setHasResult] = useState(false);

  // Queue
  const [queue, setQueue] = useState<QueueItem[]>([]);

  // Auto-detect theme when question changes
  const updateQuestion = useCallback((q: string) => {
    setQuestion(q);
    if (q.length > 2) {
      setDetectedTheme(detectTheme(q));
    }
  }, []);

  const handleVoice = () => {
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      toast.error("Reconhecimento de voz não suportado neste navegador");
      return;
    }
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SR();
    recognition.lang = "pt-BR";
    recognition.continuous = false;
    recognition.onstart = () => setIsRecording(true);
    recognition.onend = () => setIsRecording(false);
    recognition.onresult = (e: any) => {
      const text = e.results[0][0].transcript;
      updateQuestion(text);
    };
    recognition.onerror = () => setIsRecording(false);
    recognition.start();
  };

  const handleTurboButton = (q: string, theme: QuestionTheme) => {
    setQuestion(q);
    setDetectedTheme(theme);
  };

  const generate = async () => {
    const count = readingType === "yesno" ? 1 : parseInt(readingType);
    const theme = detectedTheme;
    const numbers = getThemedCards(count, theme);
    const cards = numbers.map((n) => cardMeanings[n - 1]).filter(Boolean);

    // Sounds
    cards.forEach((_, i) => setTimeout(() => playRevealSound(), i * 200 + 100));

    setResolvedCards(cards);

    // Generate local responses first (instant)
    const r5 = cards.map((c) => c.shortMeaning).join(" ");
    const r10 = readingType === "yesno" ? generateYesNoResponse(cards[0]) : generateShortResponse(cards);
    const rFull = readingType === "yesno" ? generateYesNoResponse(cards[0]) : generateFullResponse(cards, question || "Consulta live");

    setResponse5s(r5);
    setResponse10s(r10);
    setResponseFull(rFull);
    setActiveLevel("5s");
    setHasResult(true);

    setTimeout(() => playResultSound(), cards.length * 200 + 400);

    // Auto-add to queue
    const item: QueueItem = {
      id: Date.now().toString(),
      name: clientName || "—",
      question: question || "Consulta rápida",
      theme,
      cardNumbers: numbers,
      quickResponse: r5,
      fullResponse: rFull,
      time: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
    };
    setQueue((prev) => [item, ...prev].slice(0, 100));

    // If AI mode is on, fetch AI interpretation in background
    if (useAI) {
      setAiLoading(true);
      try {
        const { data, error } = await supabase.functions.invoke("interpret-cards", {
          body: {
            question: question || "Consulta rápida",
            cards: cards.map((c) => ({ number: c.number, name: c.name, meaning: c.meaning, energy: c.energy })),
            readingType,
            theme,
          },
        });

        if (error) throw error;

        if (data && !data.error) {
          setResponse5s(data.relampago || r5);
          setResponse10s(data.curta || r10);
          setResponseFull(data.completa || rFull);
          // Update queue item
          setQueue((prev) =>
            prev.map((q) =>
              q.id === item.id
                ? { ...q, quickResponse: data.relampago || r5, fullResponse: data.completa || rFull }
                : q
            )
          );
          toast.success("✨ Interpretação espiritual gerada");
        } else if (data?.error) {
          toast.error(data.error);
        }
      } catch (err) {
        console.error("AI interpretation error:", err);
        // Keep local responses as fallback — no toast needed
      } finally {
        setAiLoading(false);
      }
    }
  };

  const reset = () => {
    setClientName("");
    setQuestion("");
    setDetectedTheme("geral");
    setResolvedCards([]);
    setResponse5s("");
    setResponse10s("");
    setResponseFull("");
    setHasResult(false);
    setActiveLevel("5s");
    setCopied(false);
  };

  const copyResponse = () => {
    const text = activeLevel === "5s" ? response5s : activeLevel === "10s" ? response10s : responseFull;
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success("Resposta copiada!");
    setTimeout(() => setCopied(false), 2000);
  };

  const loadFromQueue = (item: QueueItem) => {
    setClientName(item.name);
    setQuestion(item.question);
    setDetectedTheme(item.theme);
    const cards = item.cardNumbers.map((n) => cardMeanings[n - 1]).filter(Boolean);
    setResolvedCards(cards);
    setResponse5s(item.quickResponse);
    setResponse10s(item.quickResponse);
    setResponseFull(item.fullResponse);
    setHasResult(true);
    setActiveLevel("5s");
  };

  const currentResponse = activeLevel === "5s" ? response5s : activeLevel === "10s" ? response10s : responseFull;

  return (
    <div className="space-y-3 pb-8">
      {!hasResult ? (
        <>
          {/* Client name */}
          <Input
            placeholder="Nome ou @ da pessoa"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            className="bg-secondary border-border text-base font-crimson py-4"
          />

          {/* Question + mic */}
          <div className="flex gap-2">
            <Input
              placeholder="Pergunta..."
              value={question}
              onChange={(e) => updateQuestion(e.target.value)}
              className="bg-secondary border-border text-base font-crimson flex-1 py-4"
            />
            <Button
              variant={isRecording ? "destructive" : "secondary"}
              size="icon"
              className="h-[42px] w-12 shrink-0 border border-border"
              onClick={handleVoice}
            >
              {isRecording ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
            </Button>
          </div>
          {isRecording && <p className="text-foreground/60 text-xs animate-pulse font-crimson">🎙️ Gravando...</p>}

          {/* Detected theme badge */}
          {detectedTheme !== "geral" && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground font-cinzel uppercase tracking-wider">Tema detectado:</span>
              <span className="text-sm font-crimson bg-foreground/10 px-3 py-1 rounded-full border border-border">
                {getThemeLabel(detectedTheme)}
              </span>
            </div>
          )}

          {/* Turbo buttons */}
          <div>
            <p className="font-cinzel text-[10px] uppercase tracking-widest text-muted-foreground mb-2">⚡ Atalhos</p>
            <div className="grid grid-cols-2 gap-1.5">
              {turboButtons.map((t) => (
                <Button
                  key={t.q}
                  variant="outline"
                  size="sm"
                  className="font-crimson text-xs border-border justify-start h-8 px-2"
                  onClick={() => handleTurboButton(t.q, t.theme)}
                >
                  {t.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Theme manual override */}
          <div>
            <p className="font-cinzel text-[10px] uppercase tracking-widest text-muted-foreground mb-2">Tema</p>
            <div className="flex flex-wrap gap-1.5">
              {getAllThemes().map((t) => (
                <Button
                  key={t.key}
                  variant="outline"
                  size="sm"
                  className={`font-crimson text-xs h-7 px-2 ${detectedTheme === t.key ? "bg-foreground text-background border-foreground" : "border-border"}`}
                  onClick={() => setDetectedTheme(t.key)}
                >
                  {t.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Reading type */}
          <div className="grid grid-cols-3 gap-2">
            {([["1", "1 Carta"], ["3", "3 Cartas"], ["yesno", "Sim/Não"]] as const).map(([val, label]) => (
              <Button
                key={val}
                onClick={() => setReadingType(val as ReadingType)}
                className={`font-cinzel text-xs tracking-wider py-3 ${readingType === val ? "bg-foreground text-background" : "bg-secondary text-foreground border border-border"}`}
              >
                {label}
              </Button>
            ))}
          </div>

          {/* AI toggle */}
          <Button
            variant="outline"
            onClick={() => setUseAI(!useAI)}
            className={`w-full font-cinzel text-xs py-3 border ${useAI ? "bg-foreground/10 border-foreground text-foreground" : "border-border text-muted-foreground"}`}
          >
            <Sparkles className="h-4 w-4 mr-2" />
            {useAI ? "✨ IA Espiritual ATIVA" : "IA Desligada (respostas locais)"}
          </Button>

          {/* Generate */}
          <Button
            onClick={generate}
            className="w-full font-cinzel text-lg py-7 tracking-wider uppercase bg-foreground text-background hover:bg-foreground/90 animate-glow-pulse"
          >
            ⚡ GERAR RESPOSTA
          </Button>

          {/* Queue */}
          {queue.length > 0 && (
            <div>
              <p className="font-cinzel text-[10px] uppercase tracking-widest text-muted-foreground mb-2">
                Últimas Leituras ({queue.length})
              </p>
              <div className="space-y-1 max-h-48 overflow-y-auto">
                {queue.slice(0, 20).map((item) => (
                  <button
                    key={item.id}
                    onClick={() => loadFromQueue(item)}
                    className="w-full text-left px-3 py-2 rounded bg-secondary/50 border border-border hover:bg-secondary transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-crimson text-sm text-foreground">{item.name}</span>
                      <span className="text-[10px] text-muted-foreground">{item.time}</span>
                    </div>
                    <span className="text-xs text-muted-foreground font-crimson truncate block">
                      {getThemeLabel(item.theme)} — {item.question}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        /* Result view — compact for speed */
        <div className="space-y-3 animate-fade-up">
          {clientName && (
            <p className="font-cinzel text-xs text-muted-foreground text-center uppercase tracking-wider">{clientName}</p>
          )}
          {question && (
            <p className="text-muted-foreground text-sm font-crimson italic text-center">"{question}"</p>
          )}

          {/* Cards compact */}
          <div className="flex flex-wrap gap-2 justify-center">
            {resolvedCards.map((card, i) => (
              <TarotCard key={card.number} card={card} size="sm" showMeaning={true} revealed={true} delay={i * 200} />
            ))}
          </div>

          {/* Card names */}
          <div className="text-center space-y-0.5">
            {resolvedCards.map((c) => (
              <p key={c.number} className="font-cinzel text-xs text-foreground/80">
                {String(c.number).padStart(2, "0")} — {c.name}
              </p>
            ))}
          </div>

          {/* Response level tabs */}
          <div className="grid grid-cols-3 gap-1.5">
            <Button
              onClick={() => setActiveLevel("5s")}
              className={`font-cinzel text-[10px] py-2 ${activeLevel === "5s" ? "bg-foreground text-background" : "bg-secondary text-foreground border border-border"}`}
            >
              ⚡ 5 seg
            </Button>
            <Button
              onClick={() => setActiveLevel("10s")}
              className={`font-cinzel text-[10px] py-2 ${activeLevel === "10s" ? "bg-foreground text-background" : "bg-secondary text-foreground border border-border"}`}
            >
              📝 10 seg
            </Button>
            <Button
              onClick={() => setActiveLevel("full")}
              className={`font-cinzel text-[10px] py-2 ${activeLevel === "full" ? "bg-foreground text-background" : "bg-secondary text-foreground border border-border"}`}
            >
              🔮 Completa
            </Button>
          </div>

          {/* Response */}
          <div className="card-mystical rounded-lg p-4 border border-border">
            {aiLoading && (
              <div className="flex items-center gap-2 mb-2 text-muted-foreground">
                <Loader2 className="h-3 w-3 animate-spin" />
                <span className="font-crimson text-xs">Consultando a espiritualidade...</span>
              </div>
            )}
            <pre className="whitespace-pre-wrap font-crimson text-foreground/90 text-sm leading-relaxed">
              {currentResponse}
            </pre>
          </div>

          {/* Action buttons */}
          <div className="grid grid-cols-2 gap-2">
            <Button
              onClick={copyResponse}
              variant="secondary"
              className="font-cinzel text-xs py-5 border border-border"
            >
              {copied ? <Check className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
              Copiar
            </Button>
            <Button
              onClick={reset}
              className="font-cinzel text-xs py-5 bg-foreground text-background hover:bg-foreground/90"
            >
              <RotateCcw className="h-4 w-4 mr-1" />
              Nova Leitura
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
