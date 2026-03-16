export interface Odu {
  number: number;
  name: string;
  nomeIfa: string;
  orixa: string;
  elemento: string;
  cores: string[];
  meaning: string;
  advice: string;
  evitar: string;
}

export const odus: Odu[] = [
  {
    number: 1, name: "Okanran", nomeIfa: "Okanran Meji",
    orixa: "Exu, Ibeji", elemento: "Ar e fogo",
    cores: ["Preto", "Vermelho", "Roxo", "Branco", "Azul"],
    meaning: "Novidades, magia, inimigos ocultos, defesa espiritual e necessidade de cautela com palavras.",
    advice: "Fortalecer defesa espiritual e agir com prudência.",
    evitar: "Discussões, ambição excessiva e falar demais."
  },
  {
    number: 2, name: "Ejioko", nomeIfa: "Oturupon Meji",
    orixa: "Ibeji", elemento: "Terra sobre água",
    cores: ["Vermelho", "Preto"],
    meaning: "União, casamento, gravidez, soluções e caminhos positivos.",
    advice: "Buscar equilíbrio nas relações.",
    evitar: "Desarmonia familiar."
  },
  {
    number: 3, name: "Etaogunda", nomeIfa: "Iwori Meji",
    orixa: "Ogum", elemento: "Fogo",
    cores: ["Vermelho"],
    meaning: "Luta, liderança, autoridade e necessidade de coragem.",
    advice: "Agir com coragem e disciplina.",
    evitar: "Autoritarismo e arrogância."
  },
  {
    number: 4, name: "Irosun", nomeIfa: "Irosun",
    orixa: "Iansã, Yemanjá", elemento: "Ar",
    cores: ["Vermelho"],
    meaning: "Espiritualidade, mediunidade e ligação com ancestralidade.",
    advice: "Fortalecer espiritualidade.",
    evitar: "Impulsividade."
  },
  {
    number: 5, name: "Oxe", nomeIfa: "Ose",
    orixa: "Oxum", elemento: "Ar",
    cores: ["Amarelo"],
    meaning: "Prosperidade, esperança, vitória e proteção.",
    advice: "Manter fé e perseverança.",
    evitar: "Fofocas e inveja."
  },
  {
    number: 6, name: "Obara", nomeIfa: "Obara",
    orixa: "Xango", elemento: "Fogo",
    cores: ["Azul"],
    meaning: "Prosperidade rápida, liderança e crescimento.",
    advice: "Ter paciência e humildade.",
    evitar: "Ciladas e precipitação."
  },
  {
    number: 7, name: "Odi", nomeIfa: "Odi",
    orixa: "Omolu", elemento: "Terra",
    cores: ["Preto"],
    meaning: "Cautela, dificuldades temporárias e necessidade de atenção.",
    advice: "Manter fé e cautela.",
    evitar: "Excessos."
  },
  {
    number: 8, name: "Ejionile", nomeIfa: "Pai dos Odus",
    orixa: "Xango, Oxala", elemento: "Fogo",
    cores: ["Branco"],
    meaning: "Grande força espiritual, vida e poder.",
    advice: "Buscar equilíbrio espiritual.",
    evitar: "Ciúmes e conflitos familiares."
  },
  {
    number: 9, name: "Osa", nomeIfa: "Osa",
    orixa: "Orunmila", elemento: "Ar",
    cores: ["Preto"],
    meaning: "Mudanças, perseguições e força espiritual.",
    advice: "Fortalecer proteção espiritual.",
    evitar: "Inimigos ocultos."
  },
  {
    number: 10, name: "Ofun", nomeIfa: "Ofun",
    orixa: "Oxala", elemento: "Ar",
    cores: ["Branco"],
    meaning: "Sabedoria, longevidade e prosperidade espiritual.",
    advice: "Buscar sabedoria.",
    evitar: "Avareza."
  },
  {
    number: 11, name: "Owonrin", nomeIfa: "Owonrin",
    orixa: "Exu", elemento: "Fogo",
    cores: ["Vermelho"],
    meaning: "Criatividade, movimento e cuidado com inveja.",
    advice: "Usar inteligência.",
    evitar: "Discussões."
  },
  {
    number: 12, name: "Ejilasebora", nomeIfa: "Iwori Meji",
    orixa: "Xango", elemento: "Fogo",
    cores: ["Marrom"],
    meaning: "Mudanças importantes e desafios superados.",
    advice: "Agir com estratégia.",
    evitar: "Fofoca."
  },
  {
    number: 13, name: "Ejiologbon", nomeIfa: "Oyeku Meji",
    orixa: "Egun", elemento: "Terra",
    cores: ["Preto"],
    meaning: "Desgaste, encerramentos e transformações.",
    advice: "Buscar limpeza espiritual.",
    evitar: "Negatividade."
  },
  {
    number: 14, name: "Ika", nomeIfa: "Ika",
    orixa: "Ogum, Iansã", elemento: "Terra",
    cores: ["Marrom"],
    meaning: "Confusões, desafios e necessidade de proteção espiritual.",
    advice: "Fortalecer proteção espiritual.",
    evitar: "Negócios arriscados."
  },
  {
    number: 15, name: "Ogbeogunda", nomeIfa: "Irete Meji",
    orixa: "Ogum", elemento: "Fogo",
    cores: ["Vermelho"],
    meaning: "Determinação, resistência e conquistas.",
    advice: "Persistir nos objetivos.",
    evitar: "Impaciência."
  },
  {
    number: 16, name: "Alafia", nomeIfa: "Otuwa Meji",
    orixa: "Oxala", elemento: "Ar",
    cores: ["Branco"],
    meaning: "Paz, separação necessária e sabedoria.",
    advice: "Buscar equilíbrio.",
    evitar: "Vingança."
  },
];

export interface CabalaResult {
  testa: Odu;
  nuca: Odu;
  fronteEsq: Odu;
  fronteDir: Odu;
  grid: number[][];
  summary: string;
}

function reduceToOdu(n: number): number {
  let result = n;
  while (result > 16) {
    result = result.toString().split("").reduce((s, d) => s + parseInt(d), 0);
  }
  return result || 1;
}

export function calculateCabala(birthDate: string): CabalaResult {
  // Format: YYYY-MM-DD → DD/MM/YYYY digits
  const parts = birthDate.split("-");
  const digits = (parts[2] + parts[1] + parts[0]).split("").map(Number);
  // 8 digits → 4 rows of 2 columns
  const grid = [
    [digits[0], digits[1]],
    [digits[2], digits[3]],
    [digits[4], digits[5]],
    [digits[6], digits[7]],
  ];

  // Testa = soma coluna esquerda
  const testaSum = grid[0][0] + grid[1][0] + grid[2][0] + grid[3][0];
  const testaNum = reduceToOdu(testaSum);

  // Nuca = soma coluna direita
  const nucaSum = grid[0][1] + grid[1][1] + grid[2][1] + grid[3][1];
  const nucaNum = reduceToOdu(nucaSum);

  // Fronte Esquerda = soma linhas 1 e 2
  const fronteEsqSum = grid[0][0] + grid[0][1] + grid[1][0] + grid[1][1];
  const fronteEsqNum = reduceToOdu(fronteEsqSum);

  // Fronte Direita = soma linhas 3 e 4
  const fronteDirSum = grid[2][0] + grid[2][1] + grid[3][0] + grid[3][1];
  const fronteDirNum = reduceToOdu(fronteDirSum);

  const testa = odus[testaNum - 1];
  const nuca = odus[nucaNum - 1];
  const fronteEsq = odus[fronteEsqNum - 1];
  const fronteDir = odus[fronteDirNum - 1];

  const summary = [
    `🧠 Testa (Coluna Esquerda): ${testaSum} → ${testaNum}`,
    `${testa.name} (${testa.orixa}) — ${testa.meaning}`,
    ``,
    `🔙 Nuca (Coluna Direita): ${nucaSum} → ${nucaNum}`,
    `${nuca.name} (${nuca.orixa}) — ${nuca.meaning}`,
    ``,
    `👈 Fronte Esquerda (Linhas 1+2): ${fronteEsqSum} → ${fronteEsqNum}`,
    `${fronteEsq.name} (${fronteEsq.orixa}) — ${fronteEsq.meaning}`,
    ``,
    `👉 Fronte Direita (Linhas 3+4): ${fronteDirSum} → ${fronteDirNum}`,
    `${fronteDir.name} (${fronteDir.orixa}) — ${fronteDir.meaning}`,
    ``,
    `Conselho: ${testa.advice}`,
    `Evitar: ${testa.evitar}`,
  ].join("\n");

  return { testa, nuca, fronteEsq, fronteDir, grid, summary };
}

// Keep backward compatibility
export function calculateOdu(fullName: string, birthDate: string) {
  const result = calculateCabala(birthDate);
  return {
    principal: result.testa,
    destino: result.nuca,
    message: result.summary,
  };
}
