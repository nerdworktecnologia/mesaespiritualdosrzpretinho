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
  superior: Odu;
  inferior: Odu;
  lateral: Odu;
  central: Odu;
  final: Odu;
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
  // Format: YYYY-MM-DD → "DDMMAAAA" (8 dígitos)
  const parts = birthDate.split("-");
  const formatted = parts[2] + parts[1] + parts[0]; // DDMMAAAA
  const numeros = formatted.split("").map(Number);

  const esquerda = reduceToOdu(numeros[0] + numeros[2] + numeros[4] + numeros[6]);
  const direita = reduceToOdu(numeros[1] + numeros[3] + numeros[5] + numeros[7]);
  const lateralNum = reduceToOdu(esquerda + direita);
  const centralNum = reduceToOdu(esquerda + direita + lateralNum);
  const finalNum = reduceToOdu(esquerda + direita + lateralNum + centralNum);

  const superior = odus[esquerda - 1];
  const inferior = odus[direita - 1];
  const lateral = odus[lateralNum - 1];
  const central = odus[centralNum - 1];
  const finalOdu = odus[finalNum - 1];

  const summary = generateCabalaSummary(superior, inferior, lateral, central, finalOdu);

  return { superior, inferior, lateral, central, final: finalOdu, summary };
}

function generateCabalaSummary(
  superior: Odu, inferior: Odu, lateral: Odu, central: Odu, finalOdu: Odu
): string {
  return [
    `Destino espiritual:`,
    `${superior.name} indica ${superior.meaning}`,
    ``,
    `Energia atual:`,
    `${lateral.name} mostra ${lateral.meaning}`,
    ``,
    `Caminho interno:`,
    `${central.name} revela ${central.meaning}`,
    ``,
    `Resultado espiritual:`,
    `${finalOdu.name} indica ${finalOdu.advice}`,
  ].join("\n");
}

// Keep backward compatibility
export function calculateOdu(fullName: string, birthDate: string) {
  const result = calculateCabala(birthDate);
  return {
    principal: result.central,
    destino: result.final,
    message: result.summary,
  };
}
