import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { calculateCabala, CabalaResult, odus, Odu } from "@/data/odus";
import { cardMeanings, CardMeaning } from "@/data/cardMeanings";
import TarotCard from "./TarotCard";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface BuziosState {
  buzios: number[];
  abertos: number;
  odu: Odu;
}

interface Interpretation {
  destino: string;
  energia: string;
  situacao: string;
  orientacao: string;
  resumo: string;
}

const temas = [
  { value: "amor", label: "❤️ Amor" },
  { value: "trabalho", label: "💼 Trabalho" },
  { value: "dinheiro", label: "💰 Dinheiro" },
  { value: "espiritual", label: "🔮 Espiritual" },
  { value: "familia", label: "👨‍👩‍👧 Família" },
  { value: "geral", label: "🌟 Geral" },
];

function jogarBuzios(): BuziosState {
  const buzios: number[] = [];
  for (let i = 0; i < 12; i++) {
    buzios.push(Math.random() < 0.5 ? 0 : 1);
  }
  let abertos = buzios.reduce((a, b) => a + b, 0);
  if (abertos === 0) abertos = 1;
  return { buzios, abertos, odu: odus[abertos - 1] };
}

export default function PainelEspiritualTab() {
  const { toast } = useToast();
  const [clientName, setClientName] = useState("");
  const [pergunta, setPergunta] = useState("");
  const [tema, setTema] = useState("geral");
  const [birthDate, setBirthDate] = useState("");
  const [cardInput, setCardInput] = useState("");

  const [cabalaResult, setCabalaResult] = useState<CabalaResult | null>(null);
  const [buziosResult, setBuziosResult] = useState<BuziosState | null>(null);
  const [tarotCards, setTarotCards] = useState<CardMeaning[]>([]);
  const [interpretation, setInterpretation] = useState<Interpretation | null>(null);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleCabala = () => {
    if (!birthDate) return;
    setCabalaResult(calculateCabala(birthDate));
  };

  const handleBuzios = () => {
    setBuziosResult(jogarBuzios());
  };

  const handleTarot = () => {
    const numbers = cardInput
      .split(/[\s]+/)
      .map((n) => parseInt(n.trim()))
      .filter((n) => n >= 1 && n <= 36);
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
      const payload: any = { pergunta: pergunta || "Consulta espiritual geral", tema };

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
          cartas: tarotCards.map((c) => ({
            number: c.number, name: c.name, meaning: c.meaning, energy: c.energy,
          })),
        };
      }

      const { data, error } = await supabase.functions.invoke("spiritual-panel", { body: payload });
      if (error) throw error;
      setInterpretation(data as Interpretation);
    } catch (e: any) {
      console.error(e);
      toast({ title: "Erro ao interpretar", description: e.message || "Tente novamente", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      // Try to find existing client
      let clientId: string | null = null;
      if (clientName.trim()) {
        const { data: existing } = await supabase
          .from("clients")
          .select("id")
          .ilike("name", clientName.trim())
          .limit(1)
          .single();
        if (existing) clientId = existing.id;
      }

      const record: any = {
        client_name: clientName.trim() || "Consulta Live",
        client_id: clientId,
        birth_date: birthDate || null,
        question: pergunta || null,
        tema,
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

      // Update client last visit
      if (clientId) {
        await supabase.from("clients").update({
          last_visit: new Date().toISOString().split("T")[0],
        }).eq("id", clientId);
      }

      setSaved(true);
      toast({ title: "✅ Consulta salva com sucesso!" });
    } catch (e: any) {
      console.error(e);
      toast({ title: "Erro ao salvar", description: e.message, variant: "destructive" });
    }
  };

  const handleNovaConsulta = () => {
    setClientName("");
    setPergunta("");
    setBirthDate("");
    setCardInput("");
    setCabalaResult(null);
    setBuziosResult(null);
    setTarotCards([]);
    setInterpretation(null);
    setSaved(false);
  };

  return (
    <div className="space-y-4 mt-4 animate-fade-up">
      {/* Header: Cliente + Pergunta + Tema */}
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
              <Label className="text-foreground/60 text-xs uppercase tracking-wider">Tema</Label>
              <Select value={tema} onValueChange={setTema}>
                <SelectTrigger className="bg-secondary border-border"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {temas.map((t) => (<SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-foreground/60 text-xs uppercase tracking-wider">Pergunta</Label>
            <Input placeholder="Qual a pergunta?" value={pergunta} onChange={(e) => setPergunta(e.target.value)} className="bg-secondary border-border" />
          </div>
        </CardContent>
      </Card>

      {/* Two columns: Cabala + Búzios */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="card-mystical">
          <CardHeader className="pb-3">
            <CardTitle className="font-cinzel gold-text text-base">🔢 Cabala de Ifá</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <Label className="text-foreground/60 text-xs">Data de nascimento</Label>
              <Input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} className="bg-secondary border-border" />
            </div>
            <Button onClick={handleCabala} className="w-full font-cinzel text-sm py-4">🔮 Calcular Cabala</Button>
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
            <p className="text-muted-foreground text-xs">12 búzios — ● aberto / ○ fechado</p>
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
                  <p className="text-muted-foreground text-xs">Abertos: <span className="text-primary font-bold">{buziosResult.abertos}</span>/12</p>
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

      {/* Action buttons */}
      <div className="flex gap-2">
        <Button onClick={handleInterpretar} disabled={loading} className="flex-1 font-cinzel text-sm py-5 bg-primary text-primary-foreground">
          {loading ? "⏳ Consultando..." : "✨ Interpretar Consulta"}
        </Button>
        {interpretation && !saved && (
          <Button onClick={handleSave} variant="secondary" className="font-cinzel text-sm py-5 border border-primary/30">
            💾 Salvar
          </Button>
        )}
        <Button onClick={handleNovaConsulta} variant="secondary" className="font-cinzel text-sm py-5 border border-border">
          🔄 Nova
        </Button>
      </div>

      {/* Interpretation */}
      {interpretation && (
        <Card className="card-mystical mystic-glow animate-fade-up">
          <CardHeader className="pb-3">
            <CardTitle className="font-cinzel gold-text text-lg">📜 Interpretação Espiritual</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
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
