import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX, ArrowLeft, Maximize } from "lucide-react";
import AtendimentoTab from "@/components/tarot/AtendimentoTab";
import CabalaTab from "@/components/tarot/CabalaTab";
import TiragemTab from "@/components/tarot/TiragemTab";
import LiveModeTab from "@/components/tarot/LiveModeTab";
import HistoricoTab from "@/components/tarot/HistoricoTab";
import { isSoundEnabled, toggleSound } from "@/utils/sounds";

export default function Mesa() {
  const [soundOn, setSoundOn] = useState(isSoundEnabled());
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border py-6 px-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => navigate("/")} className="text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="font-cinzel text-xl md:text-2xl tracking-[0.2em] uppercase text-foreground spirit-highlight">
                Mesa Espiritual do Sr. Zé Pretinho
              </h1>
              <p className="text-muted-foreground text-sm mt-2 font-crimson italic">
                Consulta espiritual conduzida pela força de Sr. Zé Pretinho. Faça sua pergunta com fé.
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSoundOn(toggleSound())}
            className="text-muted-foreground hover:text-foreground"
            title={soundOn ? "Desativar sons" : "Ativar sons"}
          >
            {soundOn ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
          </Button>
        </div>
      </header>

      <main className="max-w-3xl mx-auto p-4 mt-4">
        <Tabs defaultValue="mesa" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-secondary border border-border">
            <TabsTrigger value="mesa" className="font-cinzel text-xs md:text-sm tracking-wider data-[state=active]:bg-foreground data-[state=active]:text-background">
              Mesa
            </TabsTrigger>
            <TabsTrigger value="live" className="font-cinzel text-xs md:text-sm tracking-wider data-[state=active]:bg-foreground data-[state=active]:text-background" onClick={(e) => { e.preventDefault(); navigate("/live"); }}>
              ⚡ Live
            </TabsTrigger>
            <TabsTrigger value="cabala" className="font-cinzel text-xs md:text-sm tracking-wider data-[state=active]:bg-foreground data-[state=active]:text-background">
              Cabala
            </TabsTrigger>
            <TabsTrigger value="historico" className="font-cinzel text-xs md:text-sm tracking-wider data-[state=active]:bg-foreground data-[state=active]:text-background">
              Histórico
            </TabsTrigger>
          </TabsList>

          <TabsContent value="mesa"><MesaTab /></TabsContent>
          <TabsContent value="live"><LiveModeTab /></TabsContent>
          <TabsContent value="cabala"><CabalaTab /></TabsContent>
          <TabsContent value="historico"><HistoricoTab /></TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

function MesaTab() {
  return (
    <div className="space-y-4">
      <AtendimentoTab />
      <TiragemTab />
    </div>
  );
}
