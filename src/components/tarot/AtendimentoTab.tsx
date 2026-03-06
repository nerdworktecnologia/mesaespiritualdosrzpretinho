import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Mic, MicOff } from "lucide-react";

interface ClientData {
  name: string;
  birthDate: string;
  birthTime: string;
  question: string;
}

export default function AtendimentoTab() {
  const [data, setData] = useState<ClientData>({ name: "", birthDate: "", birthTime: "", question: "" });
  const [isRecording, setIsRecording] = useState(false);
  const [saved, setSaved] = useState(false);

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
    setSaved(true);
  };

  return (
    <Card className="card-mystical mystic-glow mt-4 animate-fade-up">
      <CardHeader>
        <CardTitle className="font-cinzel gold-text text-xl">📋 Atendimento</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
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
            <Label className="text-foreground/80">Data de nascimento</Label>
            <Input
              type="date"
              value={data.birthDate}
              onChange={(e) => setData({ ...data, birthDate: e.target.value })}
              className="bg-muted/50 border-border"
            />
          </div>
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

        <Button onClick={handleSave} className="w-full font-cinzel text-lg py-6">
          ✅ Salvar e Iniciar Tiragem
        </Button>

        {saved && (
          <div className="card-mystical rounded-lg p-4 mt-4 animate-fade-up border border-primary/20">
            <h3 className="font-cinzel gold-text text-lg mb-2">Dados do Cliente</h3>
            <p><strong>Nome:</strong> {data.name}</p>
            <p><strong>Nascimento:</strong> {data.birthDate}</p>
            {data.birthTime && <p><strong>Hora:</strong> {data.birthTime}</p>}
            <p className="mt-2"><strong>Pergunta:</strong> {data.question}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
