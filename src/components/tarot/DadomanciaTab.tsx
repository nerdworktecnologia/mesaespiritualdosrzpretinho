import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getDiceInterpretation } from "@/data/dadomancia";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Save } from "lucide-react";

const diceEmojis = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];

export default function DadomanciaTab() {
  const [dice, setDice] = useState<(number | null)[]>([null, null, null]);
  const [hasResult, setHasResult] = useState(false);
  const [clientName, setClientName] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const setDieValue = (index: number, value: number) => {
    const newDice = [...dice];
    newDice[index] = value;
    setDice(newDice);
    setHasResult(false);
  };

  const allSelected = dice.every((d) => d !== null && d >= 1 && d <= 6);

  const handleReveal = () => {
    if (allSelected) {
      setHasResult(true);
      setSaved(false);
    }
  };

  const handleClear = () => {
    setDice([null, null, null]);
    setHasResult(false);
    setSaved(false);
  };

  const handleSave = async () => {
    if (!interpretation || !clientName.trim()) {
      toast.error("Informe o nome do consulente antes de salvar.");
      return;
    }
    setSaving(true);
    const { error } = await supabase.from("consultations").insert({
      client_name: clientName.trim(),
      reading_type: "dadomancia",
      question: `Dados: ${d1}, ${d2}, ${d3} (soma: ${sum})`,
      interpretation_resumo: interpretation.titulo,
      interpretation_energia: interpretation.energia,
      interpretation_situacao: interpretation.mensagem,
      interpretation_orientacao: interpretation.conselho,
      interpretation_destino: interpretation.alerta || null,
    });
    setSaving(false);
    if (error) {
      toast.error("Erro ao salvar consulta.");
    } else {
      toast.success("Consulta salva no histórico!");
      setSaved(true);
    }
  };

  const d1 = dice[0] ?? 0;
  const d2 = dice[1] ?? 0;
  const d3 = dice[2] ?? 0;
  const sum = d1 + d2 + d3;
  const interpretation = hasResult ? getDiceInterpretation(d1, d2, d3) : null;

  return (
    <Card className="border-border bg-card">
      <CardHeader className="pb-3">
        <CardTitle className="font-cinzel text-base text-center tracking-wider text-foreground">
          🎲 Dadomancia do Zé Pelintra
        </CardTitle>
        <p className="text-muted-foreground text-xs text-center font-crimson italic">
          Informe o valor de cada dado que caiu na mesa
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Client name */}
        <Input
          placeholder="Nome do consulente..."
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
          className="bg-secondary border-border font-crimson"
        />
        {/* 3 dice selectors */}
        <div className="grid grid-cols-3 gap-3">
          {[0, 1, 2].map((idx) => (
            <div key={idx} className="space-y-2">
              <p className="text-xs font-cinzel text-muted-foreground text-center">
                Dado {idx + 1}
              </p>
              <div className="grid grid-cols-3 gap-1">
                {[1, 2, 3, 4, 5, 6].map((val) => (
                  <button
                    key={val}
                    onClick={() => setDieValue(idx, val)}
                    className={`w-full aspect-square rounded border text-lg flex items-center justify-center transition-colors ${
                      dice[idx] === val
                        ? "bg-foreground text-background border-foreground"
                        : "bg-secondary border-border text-foreground hover:bg-accent"
                    }`}
                  >
                    {diceEmojis[val - 1]}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Selected preview */}
        <div className="flex justify-center gap-4">
          {dice.map((d, i) => (
            <div
              key={i}
              className="w-14 h-14 md:w-16 md:h-16 rounded-lg border-2 border-border bg-secondary flex items-center justify-center text-3xl md:text-4xl"
            >
              {d ? diceEmojis[d - 1] : "?"}
            </div>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex gap-2">
          <Button
            onClick={handleReveal}
            disabled={!allSelected}
            className="flex-1 font-cinzel text-base py-5"
          >
            🎲 Interpretar
          </Button>
          {(dice.some((d) => d !== null) || hasResult) && (
            <Button
              onClick={handleClear}
              variant="outline"
              className="font-cinzel text-sm py-5"
            >
              Limpar
            </Button>
          )}
        </div>

        {/* Result */}
        {hasResult && interpretation && (
          <div className="space-y-3 animate-fade-in">
            <div className="text-center space-y-1">
              <h3 className="font-cinzel text-sm font-bold text-foreground">
                {interpretation.titulo}
              </h3>
              <p className="text-muted-foreground text-xs font-crimson">
                Dados: {d1} + {d2} + {d3} = {sum}
              </p>
            </div>

            <div className="bg-secondary/50 border border-border rounded-lg p-3">
              <p className="text-xs font-cinzel text-muted-foreground uppercase tracking-wider mb-1">⚡ Energia</p>
              <p className="text-foreground font-crimson text-sm">{interpretation.energia}</p>
            </div>

            <div className="bg-secondary/50 border border-border rounded-lg p-3">
              <p className="text-xs font-cinzel text-muted-foreground uppercase tracking-wider mb-1">📜 Mensagem</p>
              <p className="text-foreground font-crimson text-sm leading-relaxed">{interpretation.mensagem}</p>
            </div>

            <div className="bg-secondary/50 border border-border rounded-lg p-3">
              <p className="text-xs font-cinzel text-muted-foreground uppercase tracking-wider mb-1">💡 Conselho</p>
              <p className="text-foreground font-crimson text-sm">{interpretation.conselho}</p>
            </div>

            {interpretation.alerta && (
              <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-3">
                <p className="text-xs font-cinzel text-destructive uppercase tracking-wider mb-1">⚠️ Alerta</p>
                <p className="text-destructive font-crimson text-sm">{interpretation.alerta}</p>
              </div>
            )}

            {!saved && (
              <Button
                onClick={handleSave}
                disabled={saving}
                className="w-full font-cinzel text-sm py-5"
                variant="outline"
              >
                <Save className="h-4 w-4 mr-2" />
                {saving ? "Salvando..." : "Salvar no Histórico"}
              </Button>
            )}
            {saved && (
              <p className="text-center text-xs text-muted-foreground font-cinzel">✅ Consulta salva</p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
