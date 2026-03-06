import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cardMeanings, getYesNoResult, CardMeaning } from "@/data/cardMeanings";
import { generateShortResponse, generateYesNoResponse } from "@/utils/generateResponse";
import { addToHistory } from "@/utils/history";
import { playRevealSound, playResultSound } from "@/utils/sounds";
import TarotCard from "@/components/tarot/TarotCard";
import { ArrowLeft, Mic, MicOff, Volume2, VolumeX, Maximize, Minimize } from "lucide-react";
import { isSoundEnabled, toggleSound } from "@/utils/sounds";

type LiveMode = "quick" | "yesno";

export default function LiveFullscreen() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<LiveMode>("quick");
  const [question, setQuestion] = useState("");
  const [cardInput, setCardInput] = useState("");
  const [cardCount, setCardCount] = useState("1");
  const [result, setResult] = useState<string | null>(null);
  const [resolvedCards, setResolvedCards] = useState<CardMeaning[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [soundOn, setSoundOn] = useState(isSoundEnabled());
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

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

  const handleQuick = () => {
    const count = parseInt(cardCount);
    const numbers = cardInput.split(/[\s,]+/).map((n) => parseInt(n.trim())).filter((n) => n >= 1 && n <= 36);
    if (numbers.length !== count) return;
    const cards = numbers.map((n) => cardMeanings[n - 1]).filter(Boolean);
    setResolvedCards(cards);
    setShowResult(false);
    cards.forEach((_, i) => setTimeout(() => playRevealSound(), i * 400 + 200));
    const response = generateShortResponse(cards);
    setResult(response);
    setTimeout(() => { setShowResult(true); playResultSound(); }, cards.length * 400 + 600);
    addToHistory({ clientName: "", question: question || "Live rápida", readingType: `Live ${cardCount} carta(s)`, cardNumbers: numbers, result: response });
  };

  const handleYesNo = () => {
    const num = parseInt(cardInput.trim());
    if (num < 1 || num > 36) return;
    const card = cardMeanings[num - 1];
    setResolvedCards([card]);
    setShowResult(false);
    setTimeout(() => playRevealSound(), 200);
    const { result: yn } = getYesNoResult(num);
    const response = `${yn}\n\n${generateYesNoResponse(card)}`;
    setResult(response);
    setTimeout(() => { setShowResult(true); playResultSound(); }, 1000);
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
    <div className="min-h-screen bg-background flex flex-col">
      {/* Compact header */}
      <header className="flex items-center justify-between px-4 py-3 border-b border-border shrink-0">
        <Button variant="ghost" size="icon" onClick={() => navigate("/mesa")} className="text-muted-foreground">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="font-cinzel text-base md:text-lg tracking-[0.15em] uppercase text-foreground spirit-highlight">
          ⚡ Live · Sr. Zé Pretinho
        </h1>
        <div className="flex gap-1">
          <Button variant="ghost" size="icon" onClick={() => setSoundOn(toggleSound())} className="text-muted-foreground">
            {soundOn ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
          </Button>
          <Button variant="ghost" size="icon" onClick={toggleFullscreen} className="text-muted-foreground">
            {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
          </Button>
        </div>
      </header>

      {/* Main content — fills remaining space */}
      <main className="flex-1 flex flex-col items-center justify-center p-4 max-w-lg mx-auto w-full gap-4">
        {!result ? (
          <>
            {/* Mode toggle */}
            <div className="flex gap-2 w-full">
              <Button
                onClick={() => { setMode("quick"); reset(); }}
                className={`flex-1 font-cinzel text-sm tracking-wider py-5 ${mode === "quick" ? "bg-foreground text-background" : "bg-secondary text-foreground border border-border"}`}
              >
                Tiragem
              </Button>
              <Button
                onClick={() => { setMode("yesno"); reset(); }}
                className={`flex-1 font-cinzel text-sm tracking-wider py-5 ${mode === "yesno" ? "bg-foreground text-background" : "bg-secondary text-foreground border border-border"}`}
              >
                Sim / Não
              </Button>
            </div>

            {/* Question with mic */}
            <div className="w-full flex gap-2">
              <Input
                placeholder="Pergunta do chat..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="bg-secondary border-border text-lg font-crimson flex-1 py-6"
              />
              <Button
                variant={isRecording ? "destructive" : "secondary"}
                size="icon"
                className="h-[52px] w-12 shrink-0 border border-border"
                onClick={handleVoice}
              >
                {isRecording ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
              </Button>
            </div>
            {isRecording && <p className="text-foreground/60 text-sm animate-pulse font-crimson">Gravando...</p>}

            {/* Card count (quick mode) */}
            {mode === "quick" && (
              <div className="flex gap-2 w-full">
                {["1", "3", "5"].map((n) => (
                  <Button
                    key={n}
                    onClick={() => setCardCount(n)}
                    className={`flex-1 font-cinzel text-lg py-5 ${cardCount === n ? "bg-foreground text-background" : "bg-secondary text-foreground border border-border"}`}
                  >
                    {n} carta{n !== "1" ? "s" : ""}
                  </Button>
                ))}
              </div>
            )}

            {/* Card number input — big and centered */}
            <Input
              placeholder={mode === "yesno" ? "Nº da carta" : `${cardCount} número(s)`}
              value={cardInput}
              onChange={(e) => setCardInput(e.target.value)}
              className="bg-secondary border-border text-3xl md:text-4xl font-cinzel tracking-[0.3em] text-center py-8 w-full"
              autoFocus
            />

            {/* Big action button */}
            <Button
              onClick={mode === "yesno" ? handleYesNo : handleQuick}
              className="w-full font-cinzel text-lg md:text-xl py-10 tracking-wider uppercase bg-foreground text-background hover:bg-foreground/90 animate-glow-pulse"
            >
              ⚡ Revelar
            </Button>
          </>
        ) : (
          /* ── Result view ── */
          <div className="w-full flex flex-col items-center gap-4 animate-fade-up">
            {question && (
              <p className="text-muted-foreground text-sm font-crimson italic text-center line-clamp-2">"{question}"</p>
            )}

            <div className="flex flex-wrap gap-4 justify-center py-2">
              {resolvedCards.map((card, i) => (
                <TarotCard key={card.number} card={card} size="lg" showMeaning={showResult} revealed={true} delay={i * 400} />
              ))}
            </div>

            {showResult ? (
              <>
                <div className="card-mystical rounded-lg p-6 border border-border w-full animate-fade-up">
                  <pre className="whitespace-pre-wrap font-crimson text-foreground/90 text-xl md:text-2xl leading-relaxed text-center">
                    {result}
                  </pre>
                </div>
                <Button
                  onClick={reset}
                  className="w-full font-cinzel text-lg py-8 tracking-wider uppercase bg-foreground text-background hover:bg-foreground/90"
                >
                  ⚡ Nova Leitura
                </Button>
              </>
            ) : (
              <p className="text-muted-foreground font-crimson text-xl italic animate-pulse text-center">
                Revelando...
              </p>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
