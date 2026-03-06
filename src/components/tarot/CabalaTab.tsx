import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { calculateCabala, CabalaResult } from "@/data/odus";

export default function CabalaTab() {
  const [birthDate, setBirthDate] = useState("");
  const [result, setResult] = useState<CabalaResult | null>(null);

  const calculate = () => {
    if (!birthDate) return;
    setResult(calculateCabala(birthDate));
  };

  return (
    <Card className="card-mystical mystic-glow mt-4 animate-fade-up">
      <CardHeader>
        <CardTitle className="font-cinzel gold-text text-xl">🔢 Cabala dos Odus</CardTitle>
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

        <Button onClick={calculate} className="w-full font-cinzel text-lg py-6">
          🔮 Calcular Cabala Completa
        </Button>

        {result && (
          <div className="space-y-4 animate-fade-up">
            {/* Odu grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <OduCard label="🔮 Superior" odu={result.superior} />
              <OduCard label="👤 Inferior" odu={result.inferior} />
              <OduCard label="🧠 Lateral" odu={result.lateral} />
              <OduCard label="🛤️ Central" odu={result.central} />
              <OduCard label="🛡️ Final" odu={result.final} />
            </div>

            {/* Full summary */}
            <div className="card-mystical rounded-lg p-6 border border-primary/20">
              <h4 className="font-cinzel text-primary text-lg mb-3">✨ Resumo Espiritual Completo</h4>
              <pre className="whitespace-pre-wrap font-crimson text-foreground/80 text-base leading-relaxed">
                {result.summary}
              </pre>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function OduCard({ label, odu }: { label: string; odu: { number: number; name: string; orixa: string; meaning: string } }) {
  return (
    <div className="text-center p-3 rounded-lg bg-secondary/50 border border-border/50">
      <p className="text-muted-foreground text-xs mb-1">{label}</p>
      <p className="font-cinzel gold-text text-lg font-bold">{odu.name}</p>
      <p className="text-accent text-xs font-cinzel">{odu.orixa}</p>
      <p className="text-foreground/50 text-xs mt-1 leading-snug">{odu.meaning}</p>
    </div>
  );
}
