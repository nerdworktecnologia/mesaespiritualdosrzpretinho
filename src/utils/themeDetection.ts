// Theme detection: analyzes the question keywords to determine the topic
// and returns prioritized card numbers for that theme.

export type QuestionTheme = "amor" | "trabalho" | "dinheiro" | "espiritual" | "geral";

interface ThemeConfig {
  keywords: string[];
  priorityCards: number[]; // card numbers that resonate with this theme
}

const themes: Record<QuestionTheme, ThemeConfig> = {
  amor: {
    keywords: [
      "amor", "relacionamento", "ele", "ela", "voltar", "volta", "ex",
      "casamento", "namorado", "namorada", "marido", "esposa", "paixão",
      "casal", "namoro", "sentimento", "coração", "pensa em mim",
      "procurar", "procura", "saudade", "traição", "trair", "traiu",
    ],
    priorityCards: [32, 20, 26, 21, 19, 18, 23], // Rosa, Anel, Perfume, Espelho, Relógio, Gravata, Vela
  },
  trabalho: {
    keywords: [
      "trabalho", "emprego", "empresa", "carreira", "profissão",
      "chefe", "colega", "promoção", "demissão", "arrumar trabalho",
      "conseguir emprego", "negócio", "contrato",
    ],
    priorityCards: [3, 25, 34, 17, 22, 11, 16], // Carteira, Dinheiro, Escada, Mesa, Chave, Moeda, Paletó
  },
  dinheiro: {
    keywords: [
      "dinheiro", "prosperidade", "ganho", "financeiro", "grana",
      "riqueza", "investimento", "lucro", "dívida", "conta",
      "fortuna", "abundância",
    ],
    priorityCards: [11, 25, 3, 28, 34, 22], // Moeda, Dinheiro, Carteira, Dado, Escada, Chave
  },
  espiritual: {
    keywords: [
      "inveja", "energia", "espiritual", "macumba", "olho gordo",
      "proteção", "limpeza", "descarrego", "mau olhado", "feitiço",
      "trabalho espiritual", "encosto", "demanda",
    ],
    priorityCards: [1, 14, 23, 4, 5, 36, 6], // Cristais, Fumo, Vela, Navalha, Chapéu, Zé Pelintra, Terno
  },
  geral: {
    keywords: [],
    priorityCards: [],
  },
};

/**
 * Detects the theme of a question based on keyword matching.
 */
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

/**
 * Returns card numbers for a reading, prioritizing theme-relevant cards.
 * Uses a weighted random: priority cards have higher chance but aren't guaranteed.
 */
export function getThemedCards(count: number, theme: QuestionTheme): number[] {
  const config = themes[theme];
  const priorityCards = config.priorityCards;
  const allCards = Array.from({ length: 36 }, (_, i) => i + 1);

  if (theme === "geral" || priorityCards.length === 0) {
    return pickRandom(allCards, count);
  }

  const selected: number[] = [];

  // First card: 70% chance from priority pool
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
