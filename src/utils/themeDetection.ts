// Theme detection: analyzes the question keywords to determine the topic
// and returns prioritized card numbers for that theme.

export type QuestionTheme = "amor" | "trabalho" | "dinheiro" | "espiritual" | "familia" | "justica" | "saude" | "sorte" | "geral";

interface ThemeConfig {
  label: string;
  keywords: string[];
  priorityCards: number[];
}

const themes: Record<QuestionTheme, ThemeConfig> = {
  amor: {
    label: "❤️ Amor",
    keywords: [
      "amor", "relacionamento", "ele", "ela", "voltar", "volta", "ex",
      "casamento", "namorado", "namorada", "marido", "esposa", "paixão",
      "casal", "namoro", "sentimento", "coração", "pensa em mim",
      "procurar", "procura", "saudade", "traição", "trair", "traiu",
      "outra pessoa", "amante", "me ama", "gosta de mim",
    ],
    priorityCards: [32, 20, 26, 21, 19, 18, 23],
  },
  trabalho: {
    label: "💼 Trabalho",
    keywords: [
      "trabalho", "emprego", "empresa", "carreira", "profissão",
      "chefe", "colega", "promoção", "demissão", "arrumar trabalho",
      "conseguir emprego", "negócio", "contrato", "chamada", "crescer",
    ],
    priorityCards: [3, 25, 34, 17, 22, 11, 16],
  },
  dinheiro: {
    label: "💰 Dinheiro",
    keywords: [
      "dinheiro", "prosperidade", "ganho", "financeiro", "grana",
      "riqueza", "investimento", "lucro", "dívida", "conta",
      "fortuna", "abundância", "receber", "entra dinheiro",
    ],
    priorityCards: [11, 25, 3, 28, 34, 22],
  },
  espiritual: {
    label: "🧿 Espiritual",
    keywords: [
      "inveja", "energia", "espiritual", "macumba", "olho gordo",
      "proteção", "limpeza", "descarrego", "mau olhado", "feitiço",
      "encosto", "demanda", "carregada", "carregado", "fizeram algo",
    ],
    priorityCards: [1, 14, 23, 4, 5, 36, 6],
  },
  familia: {
    label: "👨‍👩‍👧 Família",
    keywords: [
      "família", "filho", "filha", "mãe", "pai", "irmão", "irmã",
      "parente", "casa", "lar", "convivência",
    ],
    priorityCards: [17, 23, 20, 27, 9, 6],
  },
  justica: {
    label: "⚖️ Justiça",
    keywords: [
      "justiça", "processo", "advogado", "tribunal", "juiz",
      "causa", "direito", "ganhar causa", "pensão", "guarda",
    ],
    priorityCards: [22, 17, 27, 10, 34, 2],
  },
  saude: {
    label: "💚 Saúde",
    keywords: [
      "saúde", "doença", "ansiedade", "depressão", "emocional",
      "cura", "tratamento", "médico", "hospital", "saúde emocional",
    ],
    priorityCards: [23, 35, 6, 9, 27, 1],
  },
  sorte: {
    label: "🍀 Sorte",
    keywords: [
      "sorte", "oportunidade", "chance", "conseguir", "loteria",
    ],
    priorityCards: [8, 10, 22, 28, 35],
  },
  geral: {
    label: "🔮 Geral",
    keywords: [],
    priorityCards: [],
  },
};

export function getThemeLabel(theme: QuestionTheme): string {
  return themes[theme].label;
}

export function getAllThemes(): { key: QuestionTheme; label: string }[] {
  return Object.entries(themes)
    .filter(([k]) => k !== "geral")
    .map(([key, config]) => ({ key: key as QuestionTheme, label: config.label }));
}

export function detectTheme(question: string): QuestionTheme {
  const q = question.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  let bestTheme: QuestionTheme = "geral";
  let bestScore = 0;

  for (const [theme, config] of Object.entries(themes) as [QuestionTheme, ThemeConfig][]) {
    if (theme === "geral") continue;
    let score = 0;
    for (const kw of config.keywords) {
      const normalizedKw = kw.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      if (q.includes(normalizedKw)) score++;
    }
    if (score > bestScore) {
      bestScore = score;
      bestTheme = theme;
    }
  }

  return bestTheme;
}

export function getThemedCards(count: number, theme: QuestionTheme): number[] {
  const config = themes[theme];
  const priorityCards = config.priorityCards;
  const allCards = Array.from({ length: 36 }, (_, i) => i + 1);

  if (theme === "geral" || priorityCards.length === 0) {
    return pickRandom(allCards, count);
  }

  const selected: number[] = [];

  for (let i = 0; i < count; i++) {
    const usePriority = Math.random() < (i === 0 ? 0.7 : 0.4);
    const pool = usePriority
      ? priorityCards.filter((n) => !selected.includes(n))
      : allCards.filter((n) => !selected.includes(n));

    if (pool.length === 0) {
      const fallback = allCards.filter((n) => !selected.includes(n));
      selected.push(fallback[Math.floor(Math.random() * fallback.length)]);
    } else {
      selected.push(pool[Math.floor(Math.random() * pool.length)]);
    }
  }

  return selected;
}

function pickRandom(arr: number[], count: number): number[] {
  const result: number[] = [];
  const pool = [...arr];
  for (let i = 0; i < count && pool.length > 0; i++) {
    const idx = Math.floor(Math.random() * pool.length);
    result.push(pool.splice(idx, 1)[0]);
  }
  return result;
}
