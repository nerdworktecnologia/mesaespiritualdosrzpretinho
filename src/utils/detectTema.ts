export function detectarTema(pergunta: string): string {
  const texto = (pergunta || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  const temas = [
    { tema: "volta de ex", palavras: ["volta", "voltar", "ex", "reconciliar", "reconciliacao", "vai me procurar", "vai voltar"] },
    { tema: "amor", palavras: ["amor", "relacionamento", "namoro", "casamento", "ele", "ela", "gosta de mim", "me ama", "pensa em mim"] },
    { tema: "traição", palavras: ["traicao", "tem outra", "outra pessoa", "infidelidade", "mentira", "enganando"] },
    { tema: "trabalho", palavras: ["trabalho", "emprego", "vaga", "empresa", "carreira", "contratacao", "profissional"] },
    { tema: "dinheiro", palavras: ["dinheiro", "financeiro", "pagamento", "receber", "prosperidade", "ganho", "venda", "abundancia"] },
    { tema: "espiritual", palavras: ["espiritual", "espiritualidade", "protecao", "demanda", "trabalho espiritual", "energia", "guia", "orixa"] },
    { tema: "inveja", palavras: ["inveja", "olho gordo", "olho grande", "energia negativa", "carregada", "carregado", "macumba", "fizeram algo"] },
    { tema: "família", palavras: ["familia", "mae", "pai", "filho", "filha", "irmao", "irma", "casa"] },
    { tema: "justiça", palavras: ["justica", "processo", "audiencia", "documento", "papel", "causa"] },
    { tema: "saúde emocional", palavras: ["ansiedade", "tristeza", "depressao", "emocional", "cansada", "cansado", "angustia"] },
  ];

  let melhorTema = "geral";
  let maiorPontuacao = 0;

  for (const item of temas) {
    let pontos = 0;
    for (const palavra of item.palavras) {
      if (texto.includes(palavra)) pontos++;
    }
    if (pontos > maiorPontuacao) {
      maiorPontuacao = pontos;
      melhorTema = item.tema;
    }
  }

  return melhorTema;
}

export const temasLabels: Record<string, string> = {
  "amor": "❤️ Amor",
  "volta de ex": "💔 Volta de Ex",
  "traição": "🔍 Traição",
  "trabalho": "💼 Trabalho",
  "dinheiro": "💰 Dinheiro",
  "espiritual": "🔮 Espiritual",
  "inveja": "🧿 Inveja",
  "família": "👨‍👩‍👧 Família",
  "justiça": "⚖️ Justiça",
  "saúde emocional": "🧠 Saúde Emocional",
  "geral": "🌟 Geral",
};
