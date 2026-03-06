import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  const [data, setData] = useState<ClientData>({ name: "", whatsapp: "", birthDate: "", birthTime: "", question: "" });
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
      const transcript = event.results[0][0].transcript;
      setData((prev) => ({ ...prev, question: transcript }));
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
    <Card className="card-mystical mystic-glow mt-4 animate-fade-up">
      <CardHeader>
        <CardTitle className="font-cinzel gold-text text-xl">📋 Atendimento</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!saved ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-foreground/80">Nome completo</Label>
                <Input
                  placeholder="Nome do cliente"
                  value={data.name}
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                  className="bg-muted/50 border-border"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-foreground/80 flex items-center gap-1">
                  <Phone className="h-3.5 w-3.5" /> WhatsApp
                </Label>
                <Input
                  placeholder="(11) 99999-9999"
                  value={data.whatsapp}
                  onChange={(e) => setData({ ...data, whatsapp: e.target.value })}
                  className="bg-muted/50 border-border"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-foreground/80">Data de nascimento</Label>
                <Input
                  type="date"
                  value={data.birthDate}
                  onChange={(e) => setData({ ...data, birthDate: e.target.value })}
                  className="bg-muted/50 border-border"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-foreground/80">Hora de nascimento (opcional)</Label>
                <Input
                  type="time"
                  value={data.birthTime}
                  onChange={(e) => setData({ ...data, birthTime: e.target.value })}
                  className="bg-muted/50 border-border"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-foreground/80">Pergunta do cliente</Label>
              <div className="flex gap-2">
                <Textarea
                  placeholder="Digite ou use o microfone para capturar a pergunta..."
                  value={data.question}
                  onChange={(e) => setData({ ...data, question: e.target.value })}
                  className="bg-muted/50 border-border flex-1 min-h-[100px]"
                />
                <Button
                  variant={isRecording ? "destructive" : "secondary"}
                  size="icon"
                  className="h-[100px] w-12 shrink-0"
                  onClick={handleVoice}
                >
                  {isRecording ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                </Button>
              </div>
              {isRecording && (
                <p className="text-accent text-sm animate-pulse">🎤 Gravando... Fale a pergunta.</p>
              )}
            </div>

            <ClientSuggestions onSelect={(name, whatsapp) => setData((prev) => ({ ...prev, name, whatsapp }))} />

            <Button onClick={handleSave} className="w-full font-cinzel text-lg py-6">
              ✅ Salvar e Iniciar Tiragem
            </Button>
          </>
        ) : (
          <div className="space-y-4 animate-fade-up">
            {/* Client summary */}
            <div className="card-mystical rounded-lg p-4 border border-primary/20">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-cinzel gold-text text-lg">{data.name}</h3>
                  {data.whatsapp && (
                    <p className="text-muted-foreground text-sm flex items-center gap-1 mt-1">
                      <Phone className="h-3 w-3" /> {data.whatsapp}
                    </p>
                  )}
                  <p className="text-foreground/70 text-sm mt-1">Nasc: {data.birthDate}</p>
                </div>
                <Button variant="ghost" size="sm" onClick={handleReset}>Novo atendimento</Button>
              </div>
              <div className="mt-3 pt-3 border-t border-border/30">
                <p className="text-foreground/80"><strong>Pergunta:</strong> {data.question}</p>
              </div>
            </div>

            {/* Cabala completa */}
            {cabalaResult && (
              <div className="card-mystical rounded-lg p-5 border border-primary/20 animate-fade-up">
                <h3 className="font-cinzel gold-text text-lg mb-3">🔢 Cabala dos Odus (automática)</h3>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
                  <MiniOdu label="👤 Centro" odu={cabalaResult.centro} />
                  <MiniOdu label="🧠 Testa" odu={cabalaResult.testa} />
                  <MiniOdu label="👁️ Nuca" odu={cabalaResult.nuca} />
                  <MiniOdu label="🛤️ Frente" odu={cabalaResult.frente} />
                  <MiniOdu label="🛡️ Costas" odu={cabalaResult.costas} />
                  <MiniOdu label="🔮 Nascimento" odu={cabalaResult.oduNascimento} />
                </div>

                <div className="border-t border-border/30 pt-3">
                  <pre className="whitespace-pre-wrap font-crimson text-foreground/70 text-sm leading-relaxed">
                    {cabalaResult.summary}
                  </pre>
                </div>
              </div>
            )}

            <p className="text-center text-muted-foreground text-sm font-crimson italic">
              ↑ Use a Cabala acima para enriquecer a leitura. Agora vá para 🔮 Tiragem ou 🔥 Live.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function MiniOdu({ label, odu }: { label: string; odu: { name: string; orixa: string } }) {
  return (
    <div className="text-center p-2 rounded-lg bg-secondary/50">
      <p className="text-muted-foreground text-[10px]">{label}</p>
      <p className="font-cinzel gold-text text-sm font-bold">{odu.name}</p>
      <p className="text-accent text-[10px]">{odu.orixa}</p>
    </div>
  );
}

function saveClient(name: string, whatsapp: string) {
  if (!name) return;
  try {
    const clients: Record<string, string> = JSON.parse(localStorage.getItem("tarot-clients") || "{}");
    clients[name] = whatsapp;
    localStorage.setItem("tarot-clients", JSON.stringify(clients));
  } catch { /* ignore */ }
}

function ClientSuggestions({ onSelect }: { onSelect: (name: string, whatsapp: string) => void }) {
  let clients: Record<string, string> = {};
  try { clients = JSON.parse(localStorage.getItem("tarot-clients") || "{}"); } catch {}
  const entries = Object.entries(clients);
  if (entries.length === 0) return null;

  return (
    <div className="space-y-2">
      <Label className="text-muted-foreground text-xs">Clientes recentes:</Label>
      <div className="flex flex-wrap gap-2">
        {entries.slice(0, 8).map(([name, whatsapp]) => (
          <Button key={name} variant="outline" size="sm" className="text-xs border-border/50 hover:border-primary/50" onClick={() => onSelect(name, whatsapp)}>
            {name} {whatsapp && "📱"}
          </Button>
        ))}
      </div>
    </div>
  );
}
