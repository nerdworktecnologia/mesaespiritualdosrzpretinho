import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { calculateCabala, CabalaResult } from "@/data/odus";
import BuziosTab from "./BuziosTab";

export default function CabalaTab() {
  const [birthDate, setBirthDate] = useState("");
  const [result, setResult] = useState<CabalaResult | null>(null);

  const calculate = () => {
    if (!birthDate) return;
    setResult(calculateCabala(birthDate));
  };

  return (
    <div className="space-y-4 mt-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Coluna Cabala */}
        <Card className="card-mystical mystic-glow animate-fade-up">
          <CardHeader className="pb-3">
            <CardTitle className="font-cinzel gold-text text-lg">🔢 Cabala de Ifá</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-foreground/80">Data de nascimento</Label>
              <Input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="bg-muted/50 border-border"
              />
            </div>

            <Button onClick={calculate} className="w-full font-cinzel text-base py-5">
              🔮 Calcular Cabala
            </Button>

            {result && (
              <div className="space-y-3 animate-fade-up">
                {/* Visual piramidal */}
                <div className="flex flex-col items-center gap-2">
                  <OduCard label="🔮 Superior" odu={result.superior} />
                  <div className="flex gap-2">
                    <OduCard label="🧠 Lateral" odu={result.lateral} size="sm" />
                    <OduCard label="🛤️ Central" odu={result.central} size="sm" />
                    <OduCard label="👤 Inferior" odu={result.inferior} size="sm" />
                  </div>
                  <OduCard label="🛡️ Final" odu={result.final} />
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Coluna Búzios */}
        <BuziosTab />
      </div>

      {/* Resumo espiritual completo */}
      {result && (
        <Card className="card-mystical mystic-glow animate-fade-up">
          <CardContent className="p-6">
            <h4 className="font-cinzel text-primary text-lg mb-3">✨ Resumo Espiritual Completo</h4>
            <pre className="whitespace-pre-wrap font-crimson text-foreground/80 text-base leading-relaxed">
              {result.summary}
            </pre>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function OduCard({
  label,
  odu,
  size = "md",
}: {
  label: string;
  odu: { number: number; name: string; orixa: string; meaning: string };
  size?: "sm" | "md";
}) {
  return (
    <div className={`text-center rounded-lg bg-secondary/50 border border-border/50 ${size === "sm" ? "p-2" : "p-3"}`}>
      <p className="text-muted-foreground text-xs mb-1">{label}</p>
      <p className={`font-cinzel gold-text font-bold ${size === "sm" ? "text-sm" : "text-lg"}`}>{odu.name}</p>
      <p className="text-accent text-xs font-cinzel">{odu.orixa}</p>
    </div>
  );
}
