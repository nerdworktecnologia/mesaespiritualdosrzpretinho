import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cardMeanings, CardMeaning } from "@/data/cardMeanings";
import { odus, Odu } from "@/data/odus";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { detectarTema, temasLabels } from "@/utils/detectTema";
import TarotCard from "./TarotCard";

interface BuziosState { buzios: number[]; abertos: number; odu: Odu; }

function jogarBuzios(): BuziosState {
  const buzios: number[] = [];
  for (let i = 0; i < 16; i++) buzios.push(Math.random() < 0.5 ? 0 : 1);
  let abertos = buzios.reduce((a, b) => a + b, 0);
  if (abertos === 0) abertos = 1;
  return { buzios, abertos, odu: odus[abertos - 1] };
}

type LiveMode = "cartas" | "buzios";

export default function LiveTikTokTab() {
  const { toast } = useToast();
  const [pergunta, setPergunta] = useState("");
  const [temaAuto, setTemaAuto] = useState("geral");
  const [mode, setMode] = useState<LiveMode>("cartas");
  const [cardCount, setCardCount] = useState("3");
  const [cardInput, setCardInput] = useState("");

  const [buziosResult, setBuziosResult] = useState<BuziosState | null>(null);
  const [tarotCards, setTarotCards] = useState<CardMeaning[]>([]);
  const [interpretation, setInterpretation] = useState<any>(null);
  const [activeLevel, setActiveLevel] = useState<"relampago" | "media" | "completa">("relampago");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (pergunta.trim().length > 3) setTemaAuto(detectarTema(pergunta));
  }, [pergunta]);

  const handleGerar = async () => {
    setLoading(true);
    setInterpretation(null);

    try {
      let buzios: BuziosState | null = null;
      let cards: CardMeaning[] = [];

      if (mode === "buzios") {
        buzios = jogarBuzios();
        setBuziosResult(buzios);
      } else {
        const numbers = cardInput.split(/[\s]+/).map((n) => parseInt(n.trim())).filter((n) => n >= 1 && n <= 36);
        const count = parseInt(cardCount);
        if (numbers.length !== count) {
          toast({ title: `Digite ${count} número(s) separados por espaço`, variant: "destructive" });
          setLoading(false);
          return;
        }
        cards = numbers.map((n) => cardMeanings[n - 1]).filter(Boolean);
        setTarotCards(cards);
      }

      const payload: any = { pergunta: pergunta || "Consulta rápida live", tema: temaAuto };
      if (buzios) {
        payload.buzios = { abertos: buzios.abertos, odu: buzios.odu.name, oduOrixa: buzios.odu.orixa, oduMeaning: buzios.odu.meaning };
      }
      if (cards.length > 0) {
        payload.tarot = { cartas: cards.map((c) => ({ number: c.number, name: c.name, meaning: c.meaning, energy: c.energy })) };
      }

      const { data, error } = await supabase.functions.invoke("spiritual-panel", { body: payload });
      if (error) throw error;
      setInterpretation(data);
      setActiveLevel("relampago");

      // Auto-save
      try {
        await supabase.from("consultations").insert({
          client_name: "Live TikTok",
          question: pergunta || null,
          tema: temaAuto,
          reading_type: "live",
          buzios_abertos: buzios?.abertos || null,
          buzios_odu: buzios?.odu.name || null,
          tarot_cards: cards.length > 0 ? cards.map((c) => c.number) : null,
          tarot_card_names: cards.length > 0 ? cards.map((c) => c.name) : null,
          interpretation_energia: data.energia || null,
          interpretation_situacao: data.situacao || null,
          interpretation_orientacao: data.orientacao || null,
          interpretation_resumo: data.resumo || null,
        } as any);
      } catch {}
    } catch (e: any) {
      console.error(e);
      toast({ title: "Erro", description: e.message || "Tente novamente", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setPergunta(""); setCardInput(""); setBuziosResult(null);
    setTarotCards([]); setInterpretation(null); setTemaAuto("geral");
  };

  return (
    <Card className="card-mystical mt-4 animate-fade-up">
      <CardContent className="pt-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-cinzel text-foreground tracking-wider text-sm uppercase">📺 Modo Live</h3>
          <p className="text-muted-foreground text-[10px] uppercase tracking-wider">IA Espiritual</p>
        </div>

        {!interpretation ? (
          <div className="space-y-4 animate-fade-up">
            <div className="space-y-2">
              <Label className="text-foreground/50 text-xs uppercase tracking-wider">Pergunta</Label>
              <Input placeholder="Pergunta do seguidor..." value={pergunta} onChange={(e) => setPergunta(e.target.value)} className="bg-secondary border-border text-lg" autoFocus />
            </div>

            {/* Auto tema */}
            <div className="flex items-center gap-2">
              <span className="text-foreground/50 text-xs">Tema:</span>
              <span className="text-xs font-cinzel px-3 py-1 rounded-full bg-primary/15 text-primary border border-primary/20">
                {temasLabels[temaAuto] || "🌟 Geral"}
              </span>
              {temaAuto !== "geral" && <span className="text-[10px] text-muted-foreground italic">auto</span>}
            </div>

            {/* Mode */}
            <div className="flex gap-2">
              <Button variant={mode === "cartas" ? "default" : "secondary"} onClick={() => setMode("cartas")}
                className={`flex-1 font-cinzel text-xs ${mode === "cartas" ? "bg-foreground text-background" : "border border-border"}`}>
                🃏 Cartas
              </Button>
              <Button variant={mode === "buzios" ? "default" : "secondary"} onClick={() => setMode("buzios")}
                className={`flex-1 font-cinzel text-xs ${mode === "buzios" ? "bg-foreground text-background" : "border border-border"}`}>
                🐚 Búzios
              </Button>
            </div>

            {mode === "cartas" && (
              <>
                <div className="flex gap-2">
                  {["1", "3", "5"].map((n) => (
                    <Button key={n} variant={cardCount === n ? "default" : "secondary"} size="sm" onClick={() => setCardCount(n)}
                      className={`font-cinzel ${cardCount === n ? "bg-foreground text-background" : "border border-border"}`}>
                      {n} carta{n !== "1" ? "s" : ""}
                    </Button>
                  ))}
                </div>
                <Input placeholder={`Digite ${cardCount} número(s) separados por espaço`} value={cardInput} onChange={(e) => setCardInput(e.target.value)}
                  className="bg-secondary border-border text-xl font-cinzel tracking-widest text-center" />
              </>
            )}

            <Button onClick={handleGerar} disabled={loading}
              className="w-full font-cinzel text-base py-8 tracking-wider uppercase bg-foreground text-background hover:bg-foreground/90">
              {loading ? "⏳ Gerando..." : "⚡ Gerar Leitura Live"}
            </Button>
          </div>
        ) : (
          <div className="space-y-4 animate-fade-up">
            {/* Cards / Búzios display */}
            {tarotCards.length > 0 && (
              <div className="flex flex-wrap gap-3 justify-center py-3">
                {tarotCards.map((card) => (
                  <TarotCard key={card.number} card={card} size="lg" showMeaning revealed delay={0} />
                ))}
              </div>
            )}
            {buziosResult && (
              <div className="text-center space-y-2">
                <div className="flex flex-wrap justify-center gap-2 py-2">
                  {buziosResult.buzios.map((b, i) => (
                    <span key={i} className={`text-2xl ${b === 1 ? "text-primary" : "text-muted-foreground/30"}`}>{b === 1 ? "●" : "○"}</span>
                  ))}
                </div>
                <p className="font-cinzel gold-text text-xl font-bold">{buziosResult.odu.name}</p>
              </div>
            )}

            {/* 3-level selector */}
            <div className="flex gap-1 p-1 bg-secondary rounded-lg border border-border">
              {([
                { key: "relampago" as const, label: "⚡ 5s" },
                { key: "media" as const, label: "📖 15s" },
                { key: "completa" as const, label: "✨ Completa" },
              ]).map(({ key, label }) => (
                <button key={key} onClick={() => setActiveLevel(key)}
                  className={`flex-1 py-2 px-2 rounded-md font-cinzel text-xs transition-all ${
                    activeLevel === key ? "bg-foreground text-background shadow-sm" : "text-muted-foreground hover:text-foreground"
                  }`}>
                  {label}
                </button>
              ))}
            </div>

            {/* Response */}
            <div className="card-mystical rounded-lg p-6 border border-border">
              <pre className="whitespace-pre-wrap font-crimson text-foreground/80 text-lg leading-relaxed">{interpretation[activeLevel]}</pre>
            </div>

            <Button onClick={reset} variant="secondary" className="w-full font-cinzel py-6 text-xs tracking-wider uppercase border border-border">
              ⚡ Nova Leitura Live
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
