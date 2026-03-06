import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { calculateOdu } from "@/data/odus";

export default function CabalaTab() {
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [result, setResult] = useState<ReturnType<typeof calculateOdu> | null>(null);

  const calculate = () => {
    if (!name || !birthDate) return;
    setResult(calculateOdu(name, birthDate));
  };

  return (
    <Card className="card-mystical mystic-glow mt-4 animate-fade-up">
      <CardHeader>
        <CardTitle className="font-cinzel gold-text text-xl">🔢 Cabala de Nascimento (Odu)</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-foreground/80">Nome completo</Label>
            <Input
              placeholder="Nome completo"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-muted/50 border-border"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-foreground/80">Data de nascimento</Label>
            <Input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="bg-muted/50 border-border"
            />
          </div>
        </div>

        <Button onClick={calculate} className="w-full font-cinzel text-lg py-6">
          🔮 Calcular Odu
        </Button>

        {result && (
          <div className="card-mystical rounded-lg p-6 mt-4 space-y-4 animate-fade-up border border-primary/20">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 rounded-lg bg-secondary/50">
                <p className="text-muted-foreground text-sm">Odu Principal</p>
                <p className="font-cinzel gold-text text-2xl font-bold">{result.principal.name}</p>
                <p className="text-foreground/70 text-sm mt-1">{result.principal.meaning}</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-secondary/50">
                <p className="text-muted-foreground text-sm">Odu de Destino</p>
                <p className="font-cinzel gold-text text-2xl font-bold">{result.destino.name}</p>
                <p className="text-foreground/70 text-sm mt-1">{result.destino.meaning}</p>
              </div>
            </div>

            <div className="border-t border-border pt-4">
              <h4 className="font-cinzel text-primary text-lg mb-2">✨ Mensagem Espiritual</h4>
              <p className="text-foreground/80 whitespace-pre-line leading-relaxed">{result.message}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
