import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `Você é o motor de interpretação espiritual do Sr. Zé Pretinho, um guia espiritual que domina três sistemas: Cabala de Ifá, Jogo de Búzios e Baralho de Zé Pelintra.

Sua função é cruzar as três leituras espirituais e gerar uma interpretação completa e profissional.

REGRAS:
1. A Cabala de Ifá representa o DESTINO e a MISSÃO ESPIRITUAL da pessoa (5 Odus: Superior, Inferior, Lateral, Central, Final)
2. O Jogo de Búzios revela a ENERGIA ATUAL do momento (12 búzios, Odu resultante)
3. O Tarot / Baralho do Malandro mostra a SITUAÇÃO PRÁTICA da pergunta (cartas específicas)

ESTRUTURA DA RESPOSTA (retorne EXATAMENTE neste formato JSON):
{
  "destino": "Interpretação do destino espiritual baseada na Cabala (2-3 frases)",
  "energia": "Interpretação da energia atual baseada nos Búzios (2-3 frases)",
  "situacao": "Interpretação da situação prática baseada no Tarot (2-3 frases)",
  "orientacao": "Orientação espiritual final cruzando os três sistemas (3-5 frases, com conselho direto)",
  "resumo": "Uma frase de resumo poderosa para fechar a leitura"
}

PERSONALIDADE DO SR. ZÉ PRETINHO:
- Sábio, direto, acolhedor, firme
- Linguagem popular e espiritual
- Sem exagero, sem teatralidade excessiva
- Sem promessas absolutas
- Fala como um guia espiritual real

EXPRESSÕES NATURAIS:
- "a espiritualidade mostra"
- "o destino aponta"
- "a energia do momento revela"
- "as cartas confirmam"
- "o conselho espiritual é"

IMPORTANTE: Cruze TODAS as três fontes. A leitura deve mostrar como destino + energia + situação se conectam. Nunca trate isoladamente.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { pergunta, tema, cabala, buzios, tarot } = await req.json();

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      return new Response(JSON.stringify({ error: "LOVABLE_API_KEY not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Build context
    let cabalaContext = "NÃO CALCULADA";
    if (cabala) {
      cabalaContext = `Superior: ${cabala.superior} (${cabala.superiorOrixa})
Inferior: ${cabala.inferior} (${cabala.inferiorOrixa})
Lateral: ${cabala.lateral} (${cabala.lateralOrixa})
Central: ${cabala.central} (${cabala.centralOrixa})
Final: ${cabala.final} (${cabala.finalOrixa})`;
    }

    let buziosContext = "NÃO JOGADOS";
    if (buzios) {
      buziosContext = `Búzios abertos: ${buzios.abertos} de 12
Odu resultante: ${buzios.odu} (${buzios.oduOrixa})
Significado: ${buzios.oduMeaning}`;
    }

    let tarotContext = "NÃO TIRADAS";
    if (tarot && tarot.cartas && tarot.cartas.length > 0) {
      tarotContext = tarot.cartas.map((c: any) => 
        `Carta ${c.number} – ${c.name}: ${c.meaning} (energia: ${c.energy})`
      ).join("\n");
    }

    const userMessage = `PERGUNTA: "${pergunta || 'Consulta geral'}"
TEMA: ${tema || 'geral'}

━━━ CABALA DE IFÁ (Destino) ━━━
${cabalaContext}

━━━ JOGO DE BÚZIOS (Energia Atual) ━━━
${buziosContext}

━━━ TAROT / BARALHO DO MALANDRO (Situação) ━━━
${tarotContext}

Gere a interpretação espiritual cruzada no formato JSON especificado. Cruze os três sistemas para dar uma leitura profunda e coerente.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: userMessage },
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Muitas consultas. Aguarde um momento." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Créditos insuficientes." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI Gateway error:", response.status, errorText);
      return new Response(JSON.stringify({ error: "Erro ao consultar a espiritualidade." }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "";

    let parsed;
    try {
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      parsed = jsonMatch ? JSON.parse(jsonMatch[0]) : { 
        destino: content, energia: content, situacao: content, 
        orientacao: content, resumo: content 
      };
    } catch {
      parsed = { 
        destino: content, energia: content, situacao: content, 
        orientacao: content, resumo: content 
      };
    }

    return new Response(JSON.stringify(parsed), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("spiritual-panel error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Erro desconhecido" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
