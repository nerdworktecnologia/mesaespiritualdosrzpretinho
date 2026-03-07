import { useState, useEffect } from "react";
import { Copy, Share2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { calculateCabala, CabalaResult, odus, Odu } from "@/data/odus";
import { cardMeanings, CardMeaning } from "@/data/cardMeanings";
import TarotCard from "./TarotCard";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { detectarTema, temasLabels } from "@/utils/detectTema";
import { gerarInterpretacaoOffline, OfflineInterpretation } from "@/utils/offlineInterpretation";

interface BuziosState {
  buzios: number[];
  abertos: number;
  odu: Odu;
}

interface FullInterpretation {
  temaDetectado?: string;
  relampago: string;
  media: string;
  completa: string;
  destino: string;
  energia: string;
  situacao: string;
  orientacao: string;
  resumo: string;
  isOffline?: boolean;
}

function jogarBuzios(): BuziosState {
  const buzios: number[] = [];
  for (let i = 0; i < 16; i++) buzios.push(Math.random() < 0.5 ? 0 : 1);
  let abertos = buzios.reduce((a, b) => a + b, 0);
  if (abertos === 0) abertos = 1;
  return { buzios, abertos, odu: odus[abertos - 1] };
}

export default function PainelEspiritualTab() {
  const { toast } = useToast();
  const [clientName, setClientName] = useState("");
  const [pergunta, setPergunta] = useState("");
  const [temaAuto, setTemaAuto] = useState("geral");
  const [birthDate, setBirthDate] = useState("");
  const [cardInput, setCardInput] = useState("");

  const [cabalaResult, setCabalaResult] = useState<CabalaResult | null>(null);
  const [buziosResult, setBuziosResult] = useState<BuziosState | null>(null);
  const [tarotCards, setTarotCards] = useState<CardMeaning[]>([]);
  const [interpretation, setInterpretation] = useState<FullInterpretation | null>(null);
  const [activeLevel, setActiveLevel] = useState<"relampago" | "media" | "completa">("relampago");
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  // Auto-detect tema when pergunta changes
  useEffect(() => {
    if (pergunta.trim().length > 3) {
      setTemaAuto(detectarTema(pergunta));
    }
  }, [pergunta]);

  const handleCabala = () => {
    if (!birthDate) return;
    setCabalaResult(calculateCabala(birthDate));
  };

  const handleBuzios = () => {
    setBuziosResult(jogarBuzios());
  };

  const handleTarot = () => {
    const numbers = cardInput.split(/[\s]+/).map((n) => parseInt(n.trim())).filter((n) => n >= 1 && n <= 36);
    if (numbers.length === 0) return;
    setTarotCards(numbers.map((n) => cardMeanings[n - 1]).filter(Boolean));
  };

  const handleInterpretar = async () => {
    if (!cabalaResult && !buziosResult && tarotCards.length === 0) {
      toast({ title: "Faça pelo menos uma leitura antes de interpretar", variant: "destructive" });
      return;
    }

    setLoading(true);
    setInterpretation(null);

    try {
      const payload: any = { pergunta: pergunta || "Consulta espiritual geral", tema: temaAuto };

      if (cabalaResult) {
        payload.cabala = {
          superior: cabalaResult.superior.name, superiorOrixa: cabalaResult.superior.orixa,
          inferior: cabalaResult.inferior.name, inferiorOrixa: cabalaResult.inferior.orixa,
          lateral: cabalaResult.lateral.name, lateralOrixa: cabalaResult.lateral.orixa,
          central: cabalaResult.central.name, centralOrixa: cabalaResult.central.orixa,
          final: cabalaResult.final.name, finalOrixa: cabalaResult.final.orixa,
        };
      }

      if (buziosResult) {
        payload.buzios = {
          abertos: buziosResult.abertos,
          odu: buziosResult.odu.name,
          oduOrixa: buziosResult.odu.orixa,
          oduMeaning: buziosResult.odu.meaning,
        };
      }

      if (tarotCards.length > 0) {
        payload.tarot = {
          cartas: tarotCards.map((c) => ({ number: c.number, name: c.name, meaning: c.meaning, energy: c.energy })),
        };
      }

      const { data, error } = await supabase.functions.invoke("spiritual-panel", { body: payload });
      if (error) throw error;
      setInterpretation({ ...(data as FullInterpretation), isOffline: false });
      setActiveLevel("relampago");
    } catch (e: any) {
      console.error("IA indisponível, usando motor offline:", e);
      const offline = gerarInterpretacaoOffline(pergunta || "Consulta geral", temaAuto, cabalaResult, buziosResult, tarotCards);
      setInterpretation(offline);
      setActiveLevel("relampago");
      toast({ title: "⚡ Interpretação gerada offline", description: "Motor local utilizado" });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      let clientId: string | null = null;
      if (clientName.trim()) {
        const { data: existing } = await supabase.from("clients").select("id").ilike("name", clientName.trim()).limit(1).single();
        if (existing) clientId = existing.id;
      }

      const record: any = {
        client_name: clientName.trim() || "Consulta",
        client_id: clientId,
        birth_date: birthDate || null,
        question: pergunta || null,
        tema: temaAuto,
        reading_type: "painel",
      };

      if (cabalaResult) {
        record.cabala_superior = cabalaResult.superior.name;
        record.cabala_inferior = cabalaResult.inferior.name;
        record.cabala_lateral = cabalaResult.lateral.name;
        record.cabala_central = cabalaResult.central.name;
        record.cabala_final = cabalaResult.final.name;
      }
      if (buziosResult) {
        record.buzios_abertos = buziosResult.abertos;
        record.buzios_odu = buziosResult.odu.name;
      }
      if (tarotCards.length > 0) {
        record.tarot_cards = tarotCards.map((c) => c.number);
        record.tarot_card_names = tarotCards.map((c) => c.name);
      }
      if (interpretation) {
        record.interpretation_destino = interpretation.destino;
        record.interpretation_energia = interpretation.energia;
        record.interpretation_situacao = interpretation.situacao;
        record.interpretation_orientacao = interpretation.orientacao;
        record.interpretation_resumo = interpretation.resumo;
      }

      const { error } = await supabase.from("consultations").insert(record as any);
      if (error) throw error;

      if (clientId) {
        await supabase.from("clients").update({ last_visit: new Date().toISOString().split("T")[0] }).eq("id", clientId);
      }

      setSaved(true);
      toast({ title: "✅ Consulta salva com sucesso!" });
    } catch (e: any) {
      toast({ title: "Erro ao salvar", description: e.message, variant: "destructive" });
    }
  };

  const handleNovaConsulta = () => {
    setClientName(""); setPergunta(""); setBirthDate(""); setCardInput("");
    setCabalaResult(null); setBuziosResult(null); setTarotCards([]);
    setInterpretation(null); setSaved(false); setTemaAuto("geral");
  };

  return (
    <div className="space-y-4 mt-4 animate-fade-up">
      {/* Header */}
      <Card className="card-mystical">
        <CardHeader className="pb-3">
          <CardTitle className="font-cinzel gold-text text-lg">🌟 Painel Espiritual</CardTitle>
          <p className="text-muted-foreground text-xs">Cabala + Búzios + Tarot — leitura cruzada com IA</p>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label className="text-foreground/60 text-xs uppercase tracking-wider">Nome do Cliente</Label>
              <Input placeholder="Nome do consulente" value={clientName} onChange={(e) => setClientName(e.target.value)} className="bg-secondary border-border" />
            </div>
            <div className="space-y-2">
              <Label className="text-foreground/60 text-xs uppercase tracking-wider">Data de nascimento</Label>
              <Input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} className="bg-secondary border-border" />
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-foreground/60 text-xs uppercase tracking-wider">Pergunta</Label>
            <Input placeholder="Qual a pergunta?" value={pergunta} onChange={(e) => setPergunta(e.target.value)} className="bg-secondary border-border" />
          </div>
          {/* Auto-detected tema */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-foreground/50 text-xs">Tema detectado:</span>
            <span className="text-xs font-cinzel px-3 py-1 rounded-full bg-primary/15 text-primary border border-primary/20">
              {temasLabels[temaAuto] || "🌟 Geral"}
            </span>
            {temaAuto !== "geral" && pergunta.trim().length > 3 && (
              <span className="text-[10px] text-muted-foreground italic">auto</span>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Cabala + Búzios */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="card-mystical">
          <CardHeader className="pb-3">
            <CardTitle className="font-cinzel gold-text text-base">🔢 Cabala de Ifá</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button onClick={handleCabala} disabled={!birthDate} className="w-full font-cinzel text-sm py-4">🔮 Calcular Cabala</Button>
            {cabalaResult && (
              <div className="space-y-2 animate-fade-up">
                <div className="flex flex-col items-center gap-1">
                  <OduBadge label="Superior" name={cabalaResult.superior.name} />
                  <div className="flex gap-1 flex-wrap justify-center">
                    <OduBadge label="Lateral" name={cabalaResult.lateral.name} size="sm" />
                    <OduBadge label="Central" name={cabalaResult.central.name} size="sm" />
                    <OduBadge label="Inferior" name={cabalaResult.inferior.name} size="sm" />
                  </div>
                  <OduBadge label="Final" name={cabalaResult.final.name} />
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="card-mystical">
          <CardHeader className="pb-3">
            <CardTitle className="font-cinzel gold-text text-base">🐚 Jogo de Búzios</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button onClick={handleBuzios} className="w-full font-cinzel text-sm py-4">🐚 Jogar Búzios</Button>
            {buziosResult && (
              <div className="space-y-3 animate-fade-up">
                <div className="flex flex-wrap justify-center gap-1.5 py-2">
                  {buziosResult.buzios.map((b, i) => (
                    <span key={i} className={`text-xl ${b === 1 ? "text-primary drop-shadow-[0_0_4px_hsl(var(--primary)/0.5)]" : "text-muted-foreground/30"}`}>
                      {b === 1 ? "●" : "○"}
                    </span>
                  ))}
                </div>
                <div className="text-center p-3 rounded-lg bg-secondary/50 border border-border/50">
                  <p className="text-muted-foreground text-xs">Abertos: <span className="text-primary font-bold">{buziosResult.abertos}</span>/16</p>
                  <p className="font-cinzel gold-text text-xl font-bold">{buziosResult.odu.name}</p>
                  <p className="text-accent text-xs font-cinzel">{buziosResult.odu.orixa}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Tarot */}
      <Card className="card-mystical">
        <CardHeader className="pb-3">
          <CardTitle className="font-cinzel gold-text text-base">🃏 Baralho do Malandro</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2">
            <Label className="text-foreground/60 text-xs">Cartas (1-36 separadas por espaço)</Label>
            <Input placeholder="Ex: 3 19 34" value={cardInput} onChange={(e) => setCardInput(e.target.value)} className="bg-secondary border-border text-lg font-cinzel tracking-widest" />
          </div>
          <Button onClick={handleTarot} className="w-full font-cinzel text-sm py-4">🃏 Tirar Cartas</Button>
          {tarotCards.length > 0 && (
            <div className="flex flex-wrap gap-3 justify-center py-3 animate-fade-up">
              {tarotCards.map((card) => (
                <TarotCard key={card.number} card={card} size="sm" showMeaning revealed delay={0} />
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex gap-2">
        <Button onClick={handleInterpretar} disabled={loading} className="flex-1 font-cinzel text-sm py-5 bg-primary text-primary-foreground">
          {loading ? "⏳ Consultando..." : "✨ Interpretar Consulta"}
        </Button>
        {interpretation && !saved && (
          <Button onClick={handleSave} variant="secondary" className="font-cinzel text-sm py-5 border border-primary/30">💾 Salvar</Button>
        )}
        {interpretation && (
          <Button
            onClick={() => {
              const header = `🌟 *Mesa Espiritual do Sr. Zé Pretinho*\n📜 *Leitura Espiritual*${clientName ? ` — ${clientName}` : ""}\n`;
              const tema = temaAuto !== "geral" ? `🎯 Tema: ${temasLabels[temaAuto] || temaAuto}\n` : "";
              const question = pergunta ? `❓ ${pergunta}\n` : "";
              const divider = "─────────────────\n";
              let body = "";
              if (interpretation.destino) body += `🔮 *Destino Espiritual*\n${interpretation.destino}\n\n`;
              if (interpretation.energia) body += `🐚 *Energia do Momento*\n${interpretation.energia}\n\n`;
              if (interpretation.situacao) body += `🃏 *Situação Prática*\n${interpretation.situacao}\n\n`;
              if (interpretation.orientacao) body += `✨ *Orientação Espiritual*\n${interpretation.orientacao}\n\n`;
              if (interpretation.resumo) body += `💫 _"${interpretation.resumo}"_\n`;
              const fullText = `${header}${tema}${question}${divider}\n${body}`;
              const url = `https://wa.me/?text=${encodeURIComponent(fullText)}`;
              window.open(url, "_blank");
            }}
            variant="secondary"
            className="font-cinzel text-sm py-5 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10"
          >
            <Share2 size={16} /> WhatsApp
          </Button>
        )}
        <Button onClick={handleNovaConsulta} variant="secondary" className="font-cinzel text-sm py-5 border border-border">🔄 Nova</Button>
      </div>

      {/* Interpretation with 3 levels */}
      {interpretation && (
        <Card className="card-mystical mystic-glow animate-fade-up">
          <CardHeader className="pb-3">
            <CardTitle className="font-cinzel gold-text text-lg flex items-center gap-2">
              📜 Leitura Espiritual
              <span className={`text-[10px] font-cinzel px-2 py-0.5 rounded-full border ${
                interpretation.isOffline
                  ? "bg-amber-500/15 text-amber-400 border-amber-500/30"
                  : "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
              }`}>
                {interpretation.isOffline ? "⚡ Offline" : "🤖 IA"}
              </span>
            </CardTitle>
            {interpretation.temaDetectado && (
              <p className="text-xs text-muted-foreground">
                Tema: <span className="text-primary">{temasLabels[interpretation.temaDetectado] || interpretation.temaDetectado}</span>
              </p>
            )}
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Level selector */}
            <div className="flex gap-1 p-1 bg-secondary rounded-lg border border-border">
              {([
                { key: "relampago" as const, label: "⚡ Relâmpago", desc: "5s" },
                { key: "media" as const, label: "📖 Média", desc: "15s" },
                { key: "completa" as const, label: "✨ Completa", desc: "1min" },
              ]).map(({ key, label, desc }) => (
                <button
                  key={key}
                  onClick={() => setActiveLevel(key)}
                  className={`flex-1 py-2 px-2 rounded-md font-cinzel text-[10px] md:text-xs transition-all ${
                    activeLevel === key
                      ? "bg-foreground text-background shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {label}
                  <span className="block text-[8px] opacity-60">{desc}</span>
                </button>
              ))}
            </div>

            {/* Active level content */}
            <div className="card-mystical rounded-lg p-5 border border-primary/20 animate-fade-up relative">
              <button
                onClick={() => {
                  const fullText = activeLevel === "completa" && interpretation
                    ? `${interpretation.completa}\n\n🔮 Destino: ${interpretation.destino}\n🐚 Energia: ${interpretation.energia}\n🃏 Situação: ${interpretation.situacao}\n✨ Orientação: ${interpretation.orientacao}${interpretation.resumo ? `\n\n"${interpretation.resumo}"` : ""}`
                    : interpretation[activeLevel];
                  navigator.clipboard.writeText(fullText);
                  toast({ title: "📋 Texto copiado!" });
                }}
                className="absolute top-3 right-3 p-1.5 rounded-md bg-secondary/80 hover:bg-secondary border border-border/50 text-muted-foreground hover:text-foreground transition-colors"
                title="Copiar interpretação"
              >
                <Copy size={14} />
              </button>
              <pre className="whitespace-pre-wrap font-crimson text-foreground/90 text-base md:text-lg leading-relaxed pr-8">
                {interpretation[activeLevel]}
              </pre>
            </div>

            {/* Detailed blocks (shown in completa mode) */}
            {activeLevel === "completa" && (
              <div className="space-y-3 animate-fade-up">
                <InterpretBlock emoji="🔮" title="Destino Espiritual (Cabala)" text={interpretation.destino} />
                <InterpretBlock emoji="🐚" title="Energia do Momento (Búzios)" text={interpretation.energia} />
                <InterpretBlock emoji="🃏" title="Situação Prática (Tarot)" text={interpretation.situacao} />
                <div className="border-t border-primary/20 pt-4">
                  <InterpretBlock emoji="✨" title="Orientação Espiritual" text={interpretation.orientacao} highlight />
                </div>
                {interpretation.resumo && (
                  <div className="text-center p-4 rounded-lg bg-primary/10 border border-primary/20">
                    <p className="font-cinzel text-primary text-sm italic">"{interpretation.resumo}"</p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function OduBadge({ label, name, size = "md" }: { label: string; name: string; size?: "sm" | "md" }) {
  return (
    <div className={`text-center rounded-lg bg-secondary/50 border border-border/50 ${size === "sm" ? "p-1.5 px-2" : "p-2 px-3"}`}>
      <p className="text-muted-foreground" style={{ fontSize: "9px" }}>{label}</p>
      <p className={`font-cinzel gold-text font-bold ${size === "sm" ? "text-xs" : "text-sm"}`}>{name}</p>
    </div>
  );
}

function InterpretBlock({ emoji, title, text, highlight }: { emoji: string; title: string; text: string; highlight?: boolean }) {
  return (
    <div className="space-y-1">
      <h4 className={`font-cinzel text-sm ${highlight ? "text-primary" : "text-foreground/70"}`}>{emoji} {title}</h4>
      <p className={`font-crimson text-base leading-relaxed ${highlight ? "text-foreground" : "text-foreground/80"}`}>{text}</p>
    </div>
  );
}
