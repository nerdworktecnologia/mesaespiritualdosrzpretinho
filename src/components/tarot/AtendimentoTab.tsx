import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Mic, MicOff, Phone } from "lucide-react";
import { calculateCabala, CabalaResult } from "@/data/odus";

interface ClientData {
  name: string;
  whatsapp: string;
  birthDate: string;
  birthTime: string;
  question: string;
}

export default function AtendimentoTab() {
  const [searchParams] = useSearchParams();
  const [data, setData] = useState<ClientData>(() => ({
    name: searchParams.get("name") || "",
    whatsapp: searchParams.get("whatsapp") || "",
    birthDate: searchParams.get("birthDate") || "",
    birthTime: "",
    question: "",
  }));
  const [isRecording, setIsRecording] = useState(false);
  const [saved, setSaved] = useState(false);
  const [cabalaResult, setCabalaResult] = useState<CabalaResult | null>(null);

  const handleVoice = async () => {
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      alert("Navegador não suporta reconhecimento de voz.");
      return;
    }
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = "pt-BR";
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.onstart = () => setIsRecording(true);
    recognition.onend = () => setIsRecording(false);
    recognition.onresult = (event: any) => {
      setData((prev) => ({ ...prev, question: event.results[0][0].transcript }));
    };
    recognition.onerror = () => setIsRecording(false);
    recognition.start();
  };

  const handleSave = () => {
    if (!data.name || !data.birthDate || !data.question) return;
    const cabala = calculateCabala(data.birthDate);
    setCabalaResult(cabala);
    setSaved(true);
    saveClient(data.name, data.whatsapp);
  };

  const handleReset = () => {
    setData({ name: "", whatsapp: "", birthDate: "", birthTime: "", question: "" });
    setSaved(false);
    setCabalaResult(null);
  };

  return (
    <Card className="card-mystical mt-4 animate-fade-up">
      <CardContent className="pt-6 space-y-4">
        <h3 className="font-cinzel text-foreground tracking-wider text-sm uppercase">Atendimento</h3>

        {!saved ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-foreground/50 text-xs uppercase tracking-wider">Nome</Label>
                <Input
                  placeholder="Nome do cliente"
                  value={data.name}
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                  className="bg-secondary border-border"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-foreground/50 text-xs uppercase tracking-wider flex items-center gap-1">
                  <Phone className="h-3 w-3" /> WhatsApp
                </Label>
                <Input
                  placeholder="(11) 99999-9999"
                  value={data.whatsapp}
                  onChange={(e) => setData({ ...data, whatsapp: e.target.value })}
                  className="bg-secondary border-border"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-foreground/50 text-xs uppercase tracking-wider">Data de nascimento</Label>
                <Input
                  type="date"
                  value={data.birthDate}
                  onChange={(e) => setData({ ...data, birthDate: e.target.value })}
                  className="bg-secondary border-border"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-foreground/50 text-xs uppercase tracking-wider">Hora de nascimento (opcional)</Label>
                <Input
                  type="time"
                  value={data.birthTime}
                  onChange={(e) => setData({ ...data, birthTime: e.target.value })}
                  className="bg-secondary border-border"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-foreground/50 text-xs uppercase tracking-wider">Pergunta</Label>
              <div className="flex gap-2">
                <Textarea
                  placeholder="Digite ou use o microfone..."
                  value={data.question}
                  onChange={(e) => setData({ ...data, question: e.target.value })}
                  className="bg-secondary border-border flex-1 min-h-[80px]"
                />
                <Button
                  variant={isRecording ? "destructive" : "secondary"}
                  size="icon"
                  className="h-[80px] w-12 shrink-0 border border-border"
                  onClick={handleVoice}
                >
                  {isRecording ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                </Button>
              </div>
              {isRecording && (
                <p className="text-foreground/60 text-sm animate-pulse">Gravando...</p>
              )}
            </div>

            <ClientSuggestions onSelect={(name, whatsapp) => setData((prev) => ({ ...prev, name, whatsapp }))} />

            <Button
              onClick={handleSave}
              className="w-full font-cinzel text-sm py-6 tracking-wider uppercase bg-foreground text-background hover:bg-foreground/90"
            >
              Salvar e Iniciar
            </Button>
          </>
        ) : (
          <div className="space-y-4 animate-fade-up">
            <div className="card-mystical rounded-lg p-4 border border-border">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-cinzel text-foreground text-sm tracking-wider">{data.name}</h4>
                  {data.whatsapp && (
                    <p className="text-muted-foreground text-xs flex items-center gap-1 mt-1">
                      <Phone className="h-3 w-3" /> {data.whatsapp}
                    </p>
                  )}
                  <p className="text-foreground/40 text-xs mt-1">Nasc: {data.birthDate}</p>
                </div>
                <Button variant="ghost" size="sm" onClick={handleReset} className="text-xs text-muted-foreground">
                  Novo
                </Button>
              </div>
              <div className="mt-3 pt-3 border-t border-border">
                <p className="text-foreground/70 text-sm">{data.question}</p>
              </div>
            </div>

            {cabalaResult && (
              <div className="card-mystical rounded-lg p-4 border border-border animate-fade-up">
                <h4 className="font-cinzel text-foreground text-xs tracking-wider uppercase mb-3">Cabala dos Odus</h4>
                <div className="grid grid-cols-3 gap-2 mb-3">
                  <MiniOdu label="Superior" odu={cabalaResult.superior} />
                  <MiniOdu label="Inferior" odu={cabalaResult.inferior} />
                  <MiniOdu label="Lateral" odu={cabalaResult.lateral} />
                  <MiniOdu label="Central" odu={cabalaResult.central} />
                  <MiniOdu label="Final" odu={cabalaResult.final} />
                </div>
                <div className="border-t border-border pt-3">
                  <pre className="whitespace-pre-wrap font-crimson text-foreground/50 text-xs leading-relaxed">
                    {cabalaResult.summary}
                  </pre>
                </div>
              </div>
            )}

            <p className="text-center text-muted-foreground text-xs font-crimson italic">
              Use a Cabala acima para enriquecer a leitura. Agora role para a Tiragem abaixo.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function MiniOdu({ label, odu }: { label: string; odu: { name: string; orixa: string } }) {
  return (
    <div className="text-center p-2 rounded bg-secondary border border-border">
      <p className="text-muted-foreground text-[9px] uppercase tracking-wider">{label}</p>
      <p className="font-cinzel text-foreground text-xs font-bold">{odu.name}</p>
      <p className="text-foreground/40 text-[9px]">{odu.orixa}</p>
    </div>
  );
}

function saveClient(name: string, whatsapp: string) {
  if (!name) return;
  try {
    const clients: Record<string, string> = JSON.parse(localStorage.getItem("tarot-clients") || "{}");
    clients[name] = whatsapp;
    localStorage.setItem("tarot-clients", JSON.stringify(clients));
  } catch {}
}

function ClientSuggestions({ onSelect }: { onSelect: (name: string, whatsapp: string) => void }) {
  let clients: Record<string, string> = {};
  try { clients = JSON.parse(localStorage.getItem("tarot-clients") || "{}"); } catch {}
  const entries = Object.entries(clients);
  if (entries.length === 0) return null;

  return (
    <div className="space-y-2">
      <Label className="text-muted-foreground text-[10px] uppercase tracking-wider">Clientes recentes</Label>
      <div className="flex flex-wrap gap-2">
        {entries.slice(0, 8).map(([name, whatsapp]) => (
          <Button key={name} variant="outline" size="sm" className="text-xs border-border hover:border-foreground/30" onClick={() => onSelect(name, whatsapp)}>
            {name}
          </Button>
        ))}
      </div>
    </div>
  );
}
