import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Mic, MicOff, Phone, Search, UserPlus, Check } from "lucide-react";
import { calculateCabala, CabalaResult } from "@/data/odus";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface ClientData {
  name: string;
  whatsapp: string;
  birthDate: string;
  birthTime: string;
  question: string;
}

interface DbClient {
  id: string;
  name: string;
  whatsapp: string | null;
  birth_date: string | null;
  notes: string | null;
  total_readings: number;
  last_visit: string | null;
}

export default function AtendimentoTab() {
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
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
  const [clients, setClients] = useState<DbClient[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  const [showList, setShowList] = useState(true);

  // Fetch clients from database
  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    const { data: rows } = await supabase
      .from("clients")
      .select("*")
      .order("last_visit", { ascending: false, nullsFirst: false });
    if (rows) setClients(rows);
  };

  const filteredClients = clients.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectClient = (client: DbClient) => {
    setData({
      ...data,
      name: client.name,
      whatsapp: client.whatsapp || "",
      birthDate: client.birth_date || "",
    });
    setSelectedClientId(client.id);
    setShowList(false);
  };

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

  const handleSave = async () => {
    if (!data.name || !data.question) return;

    // Calculate cabala if birthDate provided
    const cabala = data.birthDate ? calculateCabala(data.birthDate) : null;
    setCabalaResult(cabala);
    setSaved(true);

    // Save or update client in database
    try {
      if (selectedClientId) {
        // Update existing client
        await supabase
          .from("clients")
          .update({
            whatsapp: data.whatsapp || null,
            birth_date: data.birthDate || null,
            last_visit: new Date().toISOString().split("T")[0],
            total_readings: (clients.find((c) => c.id === selectedClientId)?.total_readings || 0) + 1,
          })
          .eq("id", selectedClientId);
      } else {
        // Create new client
        await supabase.from("clients").insert({
          name: data.name,
          whatsapp: data.whatsapp || null,
          birth_date: data.birthDate || null,
          last_visit: new Date().toISOString().split("T")[0],
          total_readings: 1,
        });
      }
      toast({ title: selectedClientId ? "Cliente atualizado" : "Novo cliente salvo" });
      fetchClients();
    } catch (e: any) {
      console.error(e);
    }
  };

  const handleReset = () => {
    setData({ name: "", whatsapp: "", birthDate: "", birthTime: "", question: "" });
    setSaved(false);
    setCabalaResult(null);
    setSelectedClientId(null);
    setShowList(true);
    setSearchTerm("");
  };

  return (
    <Card className="card-mystical mt-4 animate-fade-up">
      <CardContent className="pt-6 space-y-4">
        <h3 className="font-cinzel text-foreground tracking-wider text-sm uppercase">Atendimento</h3>

        {!saved ? (
          <>
            {/* Client list / search */}
            {showList && clients.length > 0 && (
              <div className="space-y-2">
                <Label className="text-foreground/50 text-xs uppercase tracking-wider flex items-center gap-1">
                  <Search className="h-3 w-3" /> Selecionar cliente
                </Label>
                <Input
                  placeholder="Buscar cliente..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-secondary border-border"
                />
                <div className="max-h-40 overflow-y-auto space-y-1 rounded-md border border-border bg-secondary/50 p-2">
                  {filteredClients.length === 0 ? (
                    <p className="text-muted-foreground text-xs text-center py-2">Nenhum cliente encontrado</p>
                  ) : (
                    filteredClients.slice(0, 20).map((client) => (
                      <button
                        key={client.id}
                        onClick={() => selectClient(client)}
                        className="w-full text-left px-3 py-2 rounded hover:bg-accent/20 transition-colors flex items-center justify-between group"
                      >
                        <div>
                          <span className="text-foreground text-sm font-medium">{client.name}</span>
                          {client.whatsapp && (
                            <span className="text-muted-foreground text-xs ml-2">{client.whatsapp}</span>
                          )}
                        </div>
                        <span className="text-muted-foreground text-[10px]">
                          {client.total_readings} consulta{client.total_readings !== 1 ? "s" : ""}
                        </span>
                      </button>
                    ))
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs text-muted-foreground w-full"
                  onClick={() => setShowList(false)}
                >
                  <UserPlus className="h-3 w-3 mr-1" /> Novo cliente
                </Button>
              </div>
            )}

            {/* Client form */}
            {(!showList || clients.length === 0) && (
              <>
                {clients.length > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs text-muted-foreground"
                    onClick={() => { setShowList(true); setSelectedClientId(null); }}
                  >
                    ← Voltar à lista
                  </Button>
                )}

                {selectedClientId && (
                  <div className="flex items-center gap-2 p-2 rounded bg-primary/10 border border-primary/20">
                    <Check className="h-4 w-4 text-primary" />
                    <span className="text-sm text-foreground">{data.name}</span>
                    <Button variant="ghost" size="sm" className="ml-auto text-xs" onClick={() => { setSelectedClientId(null); setData({ ...data, name: "", whatsapp: "", birthDate: "" }); }}>
                      Trocar
                    </Button>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-foreground/50 text-xs uppercase tracking-wider">Nome</Label>
                    <Input
                      placeholder="Nome do cliente"
                      value={data.name}
                      onChange={(e) => setData({ ...data, name: e.target.value })}
                      className="bg-secondary border-border"
                      disabled={!!selectedClientId}
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
              </>
            )}

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
                  {data.birthDate && <p className="text-foreground/40 text-xs mt-1">Nasc: {data.birthDate}</p>}
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

function MiniOdu({ label, odu }: { label: string; odu: { number: number; name: string; orixa: string } }) {
  return (
    <div className="text-center p-2 rounded bg-secondary border border-border">
      <p className="text-muted-foreground text-[9px] uppercase tracking-wider">{label}</p>
      <p className="font-cinzel text-foreground text-xs font-bold">{odu.number} – {odu.name}</p>
      <p className="text-foreground/40 text-[9px]">{odu.orixa}</p>
    </div>
  );
}
