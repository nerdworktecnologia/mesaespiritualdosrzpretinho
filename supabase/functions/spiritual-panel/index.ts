import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `Você é o motor de interpretação espiritual do Sr. Zé Pretinho, um guia espiritual que domina Cabala de Ifá, Jogo de Búzios e Baralho de Zé Pelintra.

Sua função é cruzar as leituras espirituais e gerar uma interpretação profissional.

REGRAS:
1. A Cabala de Ifá = DESTINO e MISSÃO ESPIRITUAL da pessoa
2. O Jogo de Búzios = ENERGIA ATUAL do momento
3. O Tarot / Baralho do Malandro = SITUAÇÃO PRÁTICA da pergunta
4. O TEMA detectado orienta o contexto da interpretação

ESTRUTURA DA RESPOSTA (retorne EXATAMENTE neste formato JSON):
{
  "temaDetectado": "tema identificado na pergunta",
  "relampago": "Resposta direta de 1-2 frases (5 segundos de leitura). Vai direto ao ponto.",
  "media": "Resposta de 3-5 frases (15 segundos). Cita Cabala, Búzios e Cartas brevemente.",
  "completa": "Resposta profissional completa (1-2 minutos). Explica o que a Cabala revela, o que os Búzios mostram, o que as Cartas indicam, une tudo em leitura coerente e fecha com conselho espiritual. Usa a persona do Sr. Zé Pretinho.",
  "destino": "Interpretação do destino espiritual (Cabala) - 2-3 frases",
  "energia": "Interpretação da energia atual (Búzios) - 2-3 frases",
  "situacao": "Interpretação da situação prática (Tarot) - 2-3 frases",
  "orientacao": "Orientação espiritual final cruzando os sistemas - 3-5 frases com conselho direto",
  "resumo": "Uma frase poderosa de fechamento"
}

PERSONALIDADE DO SR. ZÉ PRETINHO:
- Sábio, direto, acolhedor, firme
- Linguagem popular e espiritual
- Sem exagero, sem teatralidade excessiva
- Sem promessas absolutas
- Intuitivo, humano, claro, objetivo

ADAPTE A LEITURA AO TEMA:
- Amor/Volta de ex: foque em sentimentos, tempo, sinais
- Trabalho/Dinheiro: foque em oportunidades, construção, paciência
- Espiritual/Inveja: foque em proteção, limpeza, fortalecimento
- Família: foque em vínculos, compreensão, harmonia
- Justiça: foque em desfecho, verdade, documentos
- Saúde emocional: foque em cuidado, equilíbrio, autoconhecimento

IMPORTANTE: Cruze TODAS as fontes disponíveis. A resposta deve parecer uma leitura espiritual real.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { pergunta, tema, cabala, buzios, tarot } = await req.json();

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      return new Response(JSON.stringify({ error: "LOVABLE_API_KEY not configured" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

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
    if (tarot?.cartas?.length > 0) {
      tarotContext = tarot.cartas.map((c: any) =>
        `Carta ${c.number} – ${c.name}: ${c.meaning} (energia: ${c.energy})`
      ).join("\n");
    }

    const userMessage = `PERGUNTA: "${pergunta || 'Consulta geral'}"
TEMA DETECTADO: ${tema || 'geral'}

━━━ CABALA DE IFÁ (Destino) ━━━
${cabalaContext}

━━━ JOGO DE BÚZIOS (Energia Atual) ━━━
${buziosContext}

━━━ TAROT / BARALHO DO MALANDRO (Situação) ━━━
${tarotContext}

Gere a interpretação no formato JSON especificado com os 3 níveis (relâmpago, média, completa) + blocos separados. Adapte ao tema "${tema || 'geral'}".`;

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
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Créditos insuficientes." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI Gateway error:", response.status, errorText);
      return new Response(JSON.stringify({ error: "Erro ao consultar a espiritualidade." }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "";

    let parsed;
    try {
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      parsed = jsonMatch ? JSON.parse(jsonMatch[0]) : {
        relampago: content, media: content, completa: content,
        destino: content, energia: content, situacao: content,
        orientacao: content, resumo: content, temaDetectado: tema || "geral"
      };
    } catch {
      parsed = {
        relampago: content, media: content, completa: content,
        destino: content, energia: content, situacao: content,
        orientacao: content, resumo: content, temaDetectado: tema || "geral"
      };
    }

    return new Response(JSON.stringify(parsed), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("spiritual-panel error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Erro desconhecido" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
