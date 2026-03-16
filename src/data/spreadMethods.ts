export interface SpreadPosition {
  label: string;
  description: string;
}

export interface SpreadMethod {
  id: string;
  name: string;
  subtitle: string;
  cardCount: number;
  icon: string;
  positions: SpreadPosition[];
  /** Grid layout hint for visual display */
  layout: "linear" | "cross" | "grid" | "custom";
  /** For grid layouts */
  gridCols?: number;
  gridRows?: number;
}

export const spreadMethods: SpreadMethod[] = [
  {
    id: "conselho",
    name: "Conselho",
    subtitle: "1 carta — mensagem breve e objetiva",
    cardCount: 1,
    icon: "🃏",
    layout: "linear",
    positions: [
      { label: "Conselho", description: "Alerta e reflexão para o consulente" },
    ],
  },
  {
    id: "conselho3",
    name: "Conselho com 3 Cartas",
    subtitle: "3 cartas — presente, consequências e solução",
    cardCount: 3,
    icon: "🔮",
    layout: "linear",
    positions: [
      { label: "Presente", description: "O que está ocorrendo no momento" },
      { label: "Consequências", description: "O que pode acontecer" },
      { label: "Solução", description: "A solução para a questão" },
    ],
  },
  {
    id: "sete",
    name: "7 Cartas",
    subtitle: "7 cartas — visão ampla com direcionamentos",
    cardCount: 7,
    icon: "⭐",
    layout: "linear",
    positions: [
      { label: "Presente 1", description: "O que está ocorrendo" },
      { label: "Presente 2", description: "Continuação da situação" },
      { label: "Presente 3", description: "Consequências" },
      { label: "Direção 1", description: "Como agir" },
      { label: "Direção 2", description: "Continuação do direcionamento" },
      { label: "Direção 3", description: "Como seguir adiante" },
      { label: "Conselho Final", description: "Conselho final para a questão" },
    ],
  },
  {
    id: "financeiro",
    name: "Financeiro",
    subtitle: "9 cartas (3×3) — questões de dinheiro e trabalho",
    cardCount: 9,
    icon: "💰",
    layout: "grid",
    gridCols: 3,
    gridRows: 3,
    positions: [
      // Horizontal reading (rows)
      { label: "Passado 1", description: "O que levou ao fato (passado)" },
      { label: "Passado 2", description: "Visão do passado" },
      { label: "Passado 3", description: "Visão do passado" },
      { label: "Presente 1", description: "Estado atual" },
      { label: "Presente 2", description: "Estado latente" },
      { label: "Presente 3", description: "Estado presente" },
      { label: "Futuro 1", description: "O que fazer para solucionar" },
      { label: "Futuro 2", description: "Solução" },
      { label: "Futuro 3", description: "Solução" },
    ],
  },
  {
    id: "cruz",
    name: "Cruz Mística",
    subtitle: "5 cartas — passado, presente, futuro, oculto e conselho",
    cardCount: 5,
    icon: "✝️",
    layout: "cross",
    positions: [
      { label: "Passado", description: "Como a situação aconteceu" },
      { label: "Presente", description: "A situação atual" },
      { label: "Futuro", description: "O possível rumo" },
      { label: "Oculto", description: "O que você não consegue ver" },
      { label: "Conselho", description: "Conselho para lidar com a questão" },
    ],
  },
  {
    id: "mesareal14",
    name: "Mesa Real 14",
    subtitle: "14 cartas — passado, presente, futuro + conselho",
    cardCount: 14,
    icon: "👑",
    layout: "grid",
    gridCols: 3,
    gridRows: 4,
    positions: [
      // 12 cards in 4x3 grid + 2 counsel
      { label: "Passado 1", description: "Passado / O fato em si" },
      { label: "Presente 1", description: "Presente / O que desencadeou" },
      { label: "Futuro 1", description: "Futuro / Como agir" },
      { label: "Passado 2", description: "Passado / O que desencadeou" },
      { label: "Presente 2", description: "Presente / O que faz de errado" },
      { label: "Futuro 2", description: "Futuro / A saída" },
      { label: "Passado 3", description: "Passado / Como agir" },
      { label: "Presente 3", description: "Presente / Melhorar" },
      { label: "Futuro 3", description: "Futuro / Saída para o fato" },
      { label: "Passado 4", description: "Passado / Saída" },
      { label: "Presente 4", description: "Presente / Saída" },
      { label: "Futuro 4", description: "Futuro / Conclusão" },
      { label: "Conselho 1", description: "Direcionamento" },
      { label: "Conselho 2", description: "Nova etapa" },
    ],
  },
  {
    id: "mesareal28",
    name: "Mesa Real 28",
    subtitle: "28 cartas — visão completa com 4 fileiras de 7",
    cardCount: 28,
    icon: "🏰",
    layout: "grid",
    gridCols: 7,
    gridRows: 4,
    positions: Array.from({ length: 28 }, (_, i) => {
      const row = Math.floor(i / 7);
      const rowLabels = ["Atualidade", "Direcionamento", "Futuro", "Cuidados"];
      const col = (i % 7) + 1;
      return {
        label: `${rowLabels[row]} ${col}`,
        description: `${rowLabels[row]} — carta ${col}`,
      };
    }),
  },
  {
    id: "anonovo",
    name: "Previsão Ano Novo",
    subtitle: "26 cartas — 2 por mês + conselho do ano",
    cardCount: 26,
    icon: "🎆",
    layout: "custom",
    positions: [
      ...Array.from({ length: 12 }, (_, i) => {
        const meses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
        return [
          { label: `${meses[i]} A`, description: `${meses[i]} — carta 1` },
          { label: `${meses[i]} B`, description: `${meses[i]} — carta 2` },
        ];
      }).flat(),
      { label: "Conselho Ano 1", description: "Conselho geral para o ano" },
      { label: "Conselho Ano 2", description: "Conselho geral para o ano" },
    ],
  },
  {
    id: "carametade",
    name: "Cara Metade",
    subtitle: "6 cartas — para quem busca a cara-metade",
    cardCount: 6,
    icon: "💕",
    layout: "linear",
    positions: [
      { label: "Razão", description: "Por que ainda não encontrou" },
      { label: "Conselho", description: "Como resolver/superar" },
      { label: "Atitude", description: "Atitude positiva a adotar" },
      { label: "Perfil", description: "Quem será a pessoa indicada" },
      { label: "Local", description: "Onde irá encontrar" },
      { label: "Quando", description: "Quando irá encontrar" },
    ],
  },
  {
    id: "analise12",
    name: "Análise do Problema",
    subtitle: "12 cartas — análise completa da situação",
    cardCount: 12,
    icon: "🔍",
    layout: "custom",
    positions: [
      { label: "Passado 1", description: "Definição passada da situação" },
      { label: "Passado 2", description: "Definição passada da situação" },
      { label: "Passado 3", description: "Definição passada da situação" },
      { label: "Consulente", description: "O consulente" },
      { label: "Situação Atual", description: "A situação atual" },
      { label: "Desfecho", description: "O desfecho" },
      { label: "Consulente 1", description: "O consulente (detalhe)" },
      { label: "Consulente 2", description: "O consulente (detalhe)" },
      { label: "Consulente 3", description: "O consulente (detalhe)" },
      { label: "Parceiro 1", description: "A questão / o parceiro" },
      { label: "Parceiro 2", description: "A questão / o parceiro" },
      { label: "Parceiro 3", description: "A questão / o parceiro" },
    ],
  },
  {
    id: "yesno",
    name: "Sim ou Não",
    subtitle: "1 carta — resposta direta",
    cardCount: 1,
    icon: "❓",
    layout: "linear",
    positions: [
      { label: "Resposta", description: "Sim, Talvez ou Não" },
    ],
  },
];
