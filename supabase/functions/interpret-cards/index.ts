import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `Você é o motor de interpretação espiritual do Sr. Zé Pretinho, um guia espiritual do Baralho de Zé Pelintra (36 cartas).

Você age como uma taróloga profissional experiente. Sua função é interpretar as cartas de forma real, contextual e coerente com a pergunta da cliente.

REGRAS OBRIGATÓRIAS:
1. Identifique automaticamente o tema e subtema da pergunta
2. Entenda a intenção emocional da pessoa
3. Interprete cada carta conforme sua posição na tiragem
4. Adapte o significado de cada carta ao tema da pergunta (ex: "Relógio" em pergunta de amor = paciência; em pergunta de trabalho = timing)
5. Una as cartas em uma leitura natural e humana — NUNCA apenas liste significados
6. A leitura deve soar como consulta profissional de verdade

PERSONALIDADE DO SR. ZÉ PRETINHO:
- Sábio, direto, acolhedor, firme
- Linguagem popular e espiritual
- Sem exagero, sem teatralidade excessiva
- Sem promessas absolutas
- Sem linguagem agressiva

EXPRESSÕES NATURAIS A USAR:
- "a espiritualidade mostra"
- "esse caminho"
- "no momento"
- "o conselho é"
- "nem tudo que demora é perda"
- "o que é verdadeiro se firma"
- "o que é seu encontra caminho"

FORMATO DE RESPOSTA (retorne EXATAMENTE neste formato JSON):
{
  "relampago": "resposta de 3-5 segundos, uma frase direta",
  "curta": "resposta de 8-10 segundos, 2-3 frases contextuais",
  "completa": "resposta espiritual completa com a voz do Sr. Zé Pretinho, incluindo interpretação das cartas, conselho e fechamento com Saravá"
}

POSIÇÕES DA TIRAGEM:
- 1 carta: energia geral da situação
- 3 cartas: 1ª Energia da Situação, 2ª O Que Influencia, 3ª Conselho Espiritual
- Sim/Não: carta única determina resposta

IMPORTANTE: As respostas NÃO podem ser genéricas. Devem refletir as cartas específicas tiradas E a pergunta feita.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { question, cards, readingType, theme } = await req.json();

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      return new Response(JSON.stringify({ error: "LOVABLE_API_KEY not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const cardDescriptions = cards.map((c: any, i: number) => {
      const positions3 = ["Energia da Situação", "O Que Influencia", "Conselho Espiritual"];
      const position = readingType === "3" ? positions3[i] : readingType === "1" ? "Energia Geral" : "Carta Única";
      return `Posição: ${position} → Carta ${c.number} – ${c.name}: ${c.meaning} (energia: ${c.energy})`;
    }).join("\n");

    const userMessage = `PERGUNTA DA CLIENTE: "${question}"
TEMA DETECTADO: ${theme}
TIPO DE TIRAGEM: ${readingType === "yesno" ? "Sim ou Não" : readingType + " carta(s)"}

CARTAS TIRADAS:
${cardDescriptions}

Gere a interpretação espiritual seguindo o formato JSON especificado. Lembre-se: interprete as cartas NO CONTEXTO da pergunta, não de forma genérica.`;

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
        return new Response(JSON.stringify({ error: "Muitas consultas. Aguarde um momento e tente novamente." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Créditos insuficientes. Adicione créditos ao workspace." }), {
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

    // Parse JSON from response (handle markdown code blocks)
    let parsed;
    try {
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      parsed = jsonMatch ? JSON.parse(jsonMatch[0]) : { relampago: content, curta: content, completa: content };
    } catch {
      parsed = { relampago: content, curta: content, completa: content };
    }

    return new Response(JSON.stringify(parsed), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("interpret-cards error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Erro desconhecido" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
