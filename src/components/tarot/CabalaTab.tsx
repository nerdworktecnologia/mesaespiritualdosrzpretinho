import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { calculateCabala, CabalaResult, odus, Odu } from "@/data/odus";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface BuziosState {
  buzios: number[];
  abertos: number;
  odu: Odu;
}

interface CrossInterpretation {
  destino: string;
  energia: string;
  orientacao: string;
  resumo: string;
}

function jogarBuzios(): BuziosState {
  const buzios: number[] = [];
  for (let i = 0; i < 16; i++) buzios.push(Math.random() < 0.5 ? 0 : 1);
  let abertos = buzios.reduce((a, b) => a + b, 0);
  if (abertos === 0) abertos = 1;
  return { buzios, abertos, odu: odus[abertos - 1] };
}

export default function CabalaTab() {
  const { toast } = useToast();
  const [birthDate, setBirthDate] = useState("");
  const [cabalaResult, setCabalaResult] = useState<CabalaResult | null>(null);
  const [buziosResult, setBuziosResult] = useState<BuziosState | null>(null);
  const [crossResult, setCrossResult] = useState<CrossInterpretation | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCabala = () => {
    if (!birthDate) return;
    setCabalaResult(calculateCabala(birthDate));
    setCrossResult(null);
  };

  const handleBuzios = () => {
    setBuziosResult(jogarBuzios());
    setCrossResult(null);
  };

  const handleCrossInterpretation = async () => {
    if (!cabalaResult || !buziosResult) {
      toast({ title: "Calcule a Cabala e jogue os Búzios primeiro", variant: "destructive" });
      return;
    }
    setLoading(true);
    setCrossResult(null);
    try {
      const { data, error } = await supabase.functions.invoke("spiritual-panel", {
        body: {
          pergunta: "Interpretação cruzada entre Cabala de Ifá e Jogo de Búzios",
          tema: "espiritual",
          cabala: {
            superior: cabalaResult.superior.name, superiorOrixa: cabalaResult.superior.orixa,
            inferior: cabalaResult.inferior.name, inferiorOrixa: cabalaResult.inferior.orixa,
            lateral: cabalaResult.lateral.name, lateralOrixa: cabalaResult.lateral.orixa,
            central: cabalaResult.central.name, centralOrixa: cabalaResult.central.orixa,
            final: cabalaResult.final.name, finalOrixa: cabalaResult.final.orixa,
          },
          buzios: {
            abertos: buziosResult.abertos,
            odu: buziosResult.odu.name,
            oduOrixa: buziosResult.odu.orixa,
            oduMeaning: buziosResult.odu.meaning,
          },
        },
      });
      if (error) throw error;
      setCrossResult(data as CrossInterpretation);
    } catch (e: any) {
      console.error(e);
      toast({ title: "Erro na interpretação", description: e.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4 mt-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Cabala */}
        <Card className="card-mystical mystic-glow animate-fade-up">
          <CardHeader className="pb-3">
            <CardTitle className="font-cinzel gold-text text-lg">🔢 Cabala de Ifá</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button onClick={handleCabala} className="w-full font-cinzel text-base py-5">🔮 Calcular Cabala</Button>
            {cabalaResult && (
              <div className="space-y-3 animate-fade-up">
                <div className="flex flex-col items-center gap-2">
                  <OduCard label="🔮 Nascimento (Destino)" odu={cabalaResult.superior} />
                  <div className="flex gap-2">
                    <OduCard label="⚠️ Herança (Esq.)" odu={cabalaResult.inferior} size="sm" />
                    <OduCard label="🧠 Temperamento" odu={cabalaResult.central} size="sm" />
                    <OduCard label="🦶 Caminho (Pés)" odu={cabalaResult.lateral} size="sm" />
                  </div>
                  <OduCard label="🛡️ Proteção (Dir.)" odu={cabalaResult.final} />
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Búzios */}
        <Card className="card-mystical mystic-glow animate-fade-up">
          <CardHeader className="pb-3">
            <CardTitle className="font-cinzel gold-text text-lg">🐚 Jogo de Búzios</CardTitle>
            <p className="text-muted-foreground text-xs">16 búzios — ● aberto / ○ fechado</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button onClick={handleBuzios} className="w-full font-cinzel text-base py-5">🐚 Jogar Búzios</Button>
            {buziosResult && (
              <div className="space-y-3 animate-fade-up">
                <div className="flex flex-wrap justify-center gap-2 py-3">
                  {buziosResult.buzios.map((b, i) => (
                    <span key={i} className={`text-2xl transition-all ${b === 1 ? "text-primary drop-shadow-[0_0_6px_hsl(var(--primary)/0.6)]" : "text-muted-foreground/40"}`}>
                      {b === 1 ? "●" : "○"}
                    </span>
                  ))}
                </div>
                <div className="text-center space-y-2 p-4 rounded-lg bg-secondary/50 border border-border/50">
                  <p className="text-muted-foreground text-sm">Abertos: <span className="text-primary font-bold">{buziosResult.abertos}</span> de 16</p>
                  <p className="font-cinzel gold-text text-2xl font-bold">{buziosResult.odu.number} – {buziosResult.odu.name}</p>
                  <p className="text-accent text-sm font-cinzel">{buziosResult.odu.orixa}</p>
                  <p className="text-foreground/70 text-sm mt-2 leading-relaxed">{buziosResult.odu.meaning}</p>
                </div>
                <div className="card-mystical rounded-lg p-4 border border-primary/20 space-y-2">
                  <p className="text-foreground/80 text-sm"><span className="text-primary font-semibold">Elemento:</span> {buziosResult.odu.elemento || "—"}</p>
                  <p className="text-foreground/80 text-sm"><span className="text-primary font-semibold">Conselho:</span> {buziosResult.odu.advice}</p>
                  <p className="text-foreground/80 text-sm"><span className="text-destructive font-semibold">⚠️ Evitar:</span> {buziosResult.odu.evitar}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Cross interpretation button */}
      {cabalaResult && buziosResult && (
        <Button
          onClick={handleCrossInterpretation}
          disabled={loading}
          className="w-full font-cinzel text-base py-6 bg-primary text-primary-foreground"
        >
          {loading ? "⏳ Interpretando..." : "✨ Interpretar Cabala × Búzios com IA"}
        </Button>
      )}

      {/* Cross interpretation result */}
      {crossResult && (
        <Card className="card-mystical mystic-glow animate-fade-up">
          <CardHeader className="pb-3">
            <CardTitle className="font-cinzel gold-text text-lg">✨ Interpretação Cruzada</CardTitle>
            <p className="text-muted-foreground text-xs">
              Cabala: {cabalaResult?.central.name} × Búzios: {buziosResult?.odu.name}
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <h4 className="font-cinzel text-sm text-foreground/70">🔮 Destino Espiritual (Cabala)</h4>
              <p className="font-crimson text-base leading-relaxed text-foreground/80">{crossResult.destino}</p>
            </div>
            <div className="space-y-1">
              <h4 className="font-cinzel text-sm text-foreground/70">🐚 Energia do Momento (Búzios)</h4>
              <p className="font-crimson text-base leading-relaxed text-foreground/80">{crossResult.energia}</p>
            </div>
            <div className="border-t border-primary/20 pt-4 space-y-1">
              <h4 className="font-cinzel text-sm text-primary">✨ Orientação Espiritual</h4>
              <p className="font-crimson text-base leading-relaxed text-foreground">{crossResult.orientacao}</p>
            </div>
            {crossResult.resumo && (
              <div className="text-center p-4 rounded-lg bg-primary/10 border border-primary/20">
                <p className="font-cinzel text-primary text-sm italic">"{crossResult.resumo}"</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Resumo completo da Cabala */}
      {cabalaResult && (
        <Card className="card-mystical mystic-glow animate-fade-up">
          <CardContent className="p-6">
            <h4 className="font-cinzel text-primary text-lg mb-3">📜 Resumo Espiritual da Cabala</h4>
            <pre className="whitespace-pre-wrap font-crimson text-foreground/80 text-base leading-relaxed">{cabalaResult.summary}</pre>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function OduCard({ label, odu, size = "md" }: { label: string; odu: { number: number; name: string; orixa: string; meaning: string }; size?: "sm" | "md" }) {
  return (
    <div className={`text-center rounded-lg bg-secondary/50 border border-border/50 ${size === "sm" ? "p-2" : "p-3"}`}>
      <p className="text-muted-foreground text-xs mb-1">{label}</p>
      <p className={`font-cinzel gold-text font-bold ${size === "sm" ? "text-sm" : "text-lg"}`}>{odu.number} – {odu.name}</p>
      <p className="text-accent text-xs font-cinzel">{odu.orixa}</p>
    </div>
  );
}
