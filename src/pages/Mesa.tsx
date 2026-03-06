import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX, ArrowLeft } from "lucide-react";
import AtendimentoTab from "@/components/tarot/AtendimentoTab";
import CabalaTab from "@/components/tarot/CabalaTab";
import TiragemTab from "@/components/tarot/TiragemTab";
import HistoricoTab from "@/components/tarot/HistoricoTab";
import SistemaRapidoTab from "@/components/tarot/SistemaRapidoTab";
import TurboLiveTab from "@/components/tarot/TurboLiveTab";
import { isSoundEnabled, toggleSound } from "@/utils/sounds";

export default function Mesa() {
  const [soundOn, setSoundOn] = useState(isSoundEnabled());
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border py-4 px-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => navigate("/")} className="text-muted-foreground hover:text-foreground h-8 w-8">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="font-cinzel text-base md:text-xl tracking-[0.15em] uppercase text-foreground spirit-highlight">
              Mesa do Sr. Zé Pretinho
            </h1>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSoundOn(toggleSound())}
            className="text-muted-foreground hover:text-foreground h-8 w-8"
          >
            {soundOn ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
          </Button>
        </div>
      </header>

      <main className="max-w-3xl mx-auto p-3 mt-2">
        <Tabs defaultValue="turbo" className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-secondary border border-border h-auto">
            <TabsTrigger value="turbo" className="font-cinzel text-[9px] md:text-xs tracking-wider py-2 data-[state=active]:bg-foreground data-[state=active]:text-background">
              ⚡ Turbo
            </TabsTrigger>
            <TabsTrigger value="rapido" className="font-cinzel text-[9px] md:text-xs tracking-wider py-2 data-[state=active]:bg-foreground data-[state=active]:text-background">
              🔮 Rápido
            </TabsTrigger>
            <TabsTrigger value="mesa" className="font-cinzel text-[9px] md:text-xs tracking-wider py-2 data-[state=active]:bg-foreground data-[state=active]:text-background">
              📋 Mesa
            </TabsTrigger>
            <TabsTrigger value="cabala" className="font-cinzel text-[9px] md:text-xs tracking-wider py-2 data-[state=active]:bg-foreground data-[state=active]:text-background">
              🔢 Cabala
            </TabsTrigger>
            <TabsTrigger value="historico" className="font-cinzel text-[9px] md:text-xs tracking-wider py-2 data-[state=active]:bg-foreground data-[state=active]:text-background">
              📜 Hist.
            </TabsTrigger>
          </TabsList>

          <TabsContent value="turbo"><TurboLiveTab /></TabsContent>
          <TabsContent value="rapido"><SistemaRapidoTab /></TabsContent>
          <TabsContent value="mesa"><MesaTab /></TabsContent>
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
