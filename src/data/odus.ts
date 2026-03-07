export interface Odu {
  number: number;
  name: string;
  nomeIfa: string;
  orixa: string;
  elemento: string;
  cores: string[];
  corpo: string;
  meaning: string;
  personality: string;
  advice: string;
  evitar: string;
}

export const odus: Odu[] = [
  {
    number: 1, name: "Ọ̀kànràn", nomeIfa: "Òkànràn méjì",
    orixa: "Èṣù, Ibéjì",
    elemento: "Ar e fogo",
    cores: ["Preto", "Vermelho", "Roxo", "Branco", "Azul"],
    corpo: "Língua, garganta, voz, respiração",
    meaning: "Novidades, excessos da fala, magia, defesa, sustos, perigos e inimigos ocultos.",
    personality: "Pessoa ligada à comunicação e à magia. Protege-se por instinto, mas pode criar inimigos pela fala excessiva.",
    advice: "Limpar os caminhos e fortalecer a defesa espiritual.",
    evitar: "Discussões, ambição, inimizades, fala excessiva."
  },
  {
    number: 2, name: "Éjì Òkò", nomeIfa: "Òtúrúpòn méjì",
    orixa: "Ìyá mi, Àbíkú",
    elemento: "Terra sobre água",
    cores: ["Vermelho", "Preto"],
    corpo: "",
    meaning: "Casamento, união, mensagens positivas, gravidez, perturbações vencidas e soluções.",
    personality: "Pessoa voltada para união e equilíbrio nas relações. Forte ligação com a maternidade e a família.",
    advice: "Buscar equilíbrio nas relações e atenção à gestação.",
    evitar: "Desarmonia, descuido com união e conflitos domésticos."
  },
  {
    number: 3, name: "Ẹ́tà Ògúndá", nomeIfa: "Ìwòrì méjì",
    orixa: "Ogum",
    elemento: "Fogo sobre ar",
    cores: [],
    corpo: "",
    meaning: "Luta, liderança, autoridade, poder, riscos, morte perto quando negativo e necessidade de ebó.",
    personality: "Líder nato(a), firme e corajoso(a). Pode tender ao autoritarismo e à dupla personalidade.",
    advice: "Agir com firmeza, mas sem arrogância.",
    evitar: "Autoritarismo, falsidade, dupla personalidade."
  },
  {
    number: 4, name: "Ìròsùn", nomeIfa: "Ìròsùn",
    orixa: "Ọya, Yemọjá, Égún, Ògún, Ọ̀ṣọ́ọ̀sì, Ọ̀sányìn",
    elemento: "",
    cores: [],
    corpo: "",
    meaning: "Espiritualidade, mediunidade, ancestralidade, fala excessiva, conquistas e disputas.",
    personality: "Pessoa profundamente espiritual, com mediunidade natural. Fala muito e pode se expor demais.",
    advice: "Fortalecer a espiritualidade e pensar antes de falar.",
    evitar: "Impulsividade verbal, exposição excessiva e dúvidas."
  },
  {
    number: 5, name: "Ọ̀ṣẹ́", nomeIfa: "Ọ̀ṣẹ́",
    orixa: "",
    elemento: "Ar",
    cores: [],
    corpo: "",
    meaning: "Prosperidade, defesa, esperança, triunfo, grandes causas e proteção ao consulente.",
    personality: "Pessoa esperançosa e defensora do que é justo. Acredita em viradas e luta por grandes causas.",
    advice: "Defender o que é justo e manter a fé nas viradas.",
    evitar: "Fofoca, feitiço e descuido com promessas."
  },
  {
    number: 6, name: "Ọ̀bàrà", nomeIfa: "Ọ̀bàrà",
    orixa: "",
    elemento: "",
    cores: ["Azul"],
    corpo: "",
    meaning: "Prosperidade rápida, cautela, humildade, paciência, liderança e crescimento.",
    personality: "Líder natural com potencial de crescimento rápido. Precisa de cautela e humildade para sustentar conquistas.",
    advice: "Agir com cautela, paciência e humildade.",
    evitar: "Falsidade, cilada, malícia e precipitação."
  },
  {
    number: 7, name: "Òdí", nomeIfa: "Òdí",
    orixa: "",
    elemento: "",
    cores: [],
    corpo: "",
    meaning: "Cautela, dificuldades, justiça, saúde, viagem curta e superação com fé.",
    personality: "Pessoa cautelosa, com força de vontade para superar dificuldades. Ligada à justiça e à saúde.",
    advice: "Manter cautela, força de vontade e cuidado com a saúde.",
    evitar: "Má conduta, roubo, perseguição e excessos carnais."
  },
  {
    number: 8, name: "Éjì Onílẹ̀", nomeIfa: "Primeiro Odù de Ifá (pai de todos os Odù)",
    orixa: "Ṣàngó, Ọ̀ṣùn, Òṣàlá, Òṣàgiyán",
    elemento: "Fogo",
    cores: [],
    corpo: "",
    meaning: "Pai de todos os Odù, vida, supremacia, boas notícias, ciúmes, desavenças e grande força.",
    personality: "Pessoa com grande força interior. Tende ao ciúme e desavenças familiares, mas carrega supremacia espiritual.",
    advice: "Recuar dentro de casa quando necessário e buscar reconciliação.",
    evitar: "Perturbação familiar, ciúmes e conflitos domésticos."
  },
  {
    number: 9, name: "Ọ̀sà", nomeIfa: "Ọ̀sà",
    orixa: "Ọ̀rúnmìlà",
    elemento: "",
    cores: [],
    corpo: "",
    meaning: "Sangue, Ìyá mi, perseguições, inimigos, elevação espiritual e material, poderes mediúnicos.",
    personality: "Pessoa com poderes mediúnicos fortes. Sujeita a perseguições, mas com capacidade de elevação espiritual e material.",
    advice: "Agir com cautela e reforçar a proteção espiritual.",
    evitar: "Feitiço, perseguição, descuido com cabeça e santo."
  },
  {
    number: 10, name: "Òfún", nomeIfa: "Òfún",
    orixa: "Òṣàlá, Odùduwà, Égún, Ìyá mi, Ọbàtálá, Ìrókò",
    elemento: "",
    cores: ["Branco"],
    corpo: "Pernas, joelhos, barriga, umbigo, líquidos do corpo",
    meaning: "Grande mãe, princípio maternal, riquezas, longevidade, recursos materiais e sabedoria.",
    personality: "Pessoa maternal, sábia e voltada para acúmulo de recursos. Longevidade e força interior marcantes.",
    advice: "Cuidar da espiritualidade e do acúmulo emocional e material.",
    evitar: "Avareza, obsessão por dinheiro, traição e absorver negatividade."
  },
  {
    number: 11, name: "Ọwọ́nrín", nomeIfa: "Ọwọ́nrín",
    orixa: "",
    elemento: "Fogo e terra",
    cores: [],
    corpo: "",
    meaning: "Criatividade, movimento, inveja, roubo dentro de casa, brigas e risco de vida.",
    personality: "Pessoa criativa e dinâmica, mas sujeita à inveja e conflitos domésticos. Precisa de vigilância constante.",
    advice: "Usar inteligência e vigilância no ambiente doméstico.",
    evitar: "Fuxico, roubo, problemas com égún e brigas de casal."
  },
  {
    number: 12, name: "Éjìlà Ṣẹbọrà", nomeIfa: "Ìwòrì méjì",
    orixa: "Ṣàngó",
    elemento: "",
    cores: [],
    corpo: "",
    meaning: "Barulho, intriga, orgulho, mudanças importantes, vitórias depois de dificuldades e ajuda de Èṣù.",
    personality: "Pessoa orgulhosa e transformadora. Vence depois de grandes dificuldades, com ajuda espiritual de Èṣù.",
    advice: "Cuidar da cabeça física e espiritual e usar astúcia.",
    evitar: "Feitiço, fofoca, briga de casal e briga de família."
  },
  {
    number: 13, name: "Éjì Ọlọgbọn", nomeIfa: "Ọ̀ yẹ̀kú méjì",
    orixa: "",
    elemento: "",
    cores: [],
    corpo: "Ossos, juntas, cartilagens, unhas, cabelos, maxilar superior",
    meaning: "Noite, morte, esgotamento, más notícias, rompimento, desgaste de recursos e força oculta.",
    personality: "Pessoa com força oculta, mas sujeita a esgotamento e más notícias. Precisa de cuidados espirituais urgentes.",
    advice: "Fazer cuidados espirituais urgentes quando necessário.",
    evitar: "Feitiço de cemitério, rompimentos e desgaste extremo."
  },
  {
    number: 14, name: "Ìka", nomeIfa: "Ìka",
    orixa: "Ibéji, Ṣàngó, Yemọjá, Òṣùmàrè, Ògún, Òrìṣàlá, Ìrókò, Ọ̀sányìn",
    elemento: "Terra e água",
    cores: [],
    corpo: "",
    meaning: "Confusão, alianças perigosas em negócios, pobreza vencida com rigor espiritual e proteção.",
    personality: "Pessoa resiliente que supera a pobreza com rigor espiritual. Cuidado com alianças e negócios duvidosos.",
    advice: "Ter cuidado com negócios e reforçar a proteção espiritual.",
    evitar: "Ambientes negativos, alianças duvidosas e confusão."
  },
  {
    number: 15, name: "Ogbègúndá", nomeIfa: "Ìrẹtẹ̀ méjì",
    orixa: "Ògún",
    elemento: "Fogo sobre água",
    cores: [],
    corpo: "",
    meaning: "Longevidade, mudez, determinação, ferro, resistência e foco em objetivos.",
    personality: "Pessoa determinada, silenciosa e resistente. Foco inabalável em seus objetivos.",
    advice: "Perseverar com firmeza e direção.",
    evitar: "Impaciência e agir sem planejamento."
  },
  {
    number: 16, name: "Àláàfíà", nomeIfa: "Otùwá méjì",
    orixa: "",
    elemento: "",
    cores: [],
    corpo: "",
    meaning: "Separar, desligar, apartar, mestre das línguas, calma aparente e estratégia.",
    personality: "Pessoa estratégica com calma aparente. Mestre da comunicação, mas precisa cuidar com palavras duplas.",
    advice: "Buscar paz com discernimento e cuidado com palavras duplas.",
    evitar: "Teimosia, vingança, ardil e manipulação."
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

  const esquerdaBruta = numeros[0] + numeros[2] + numeros[4] + numeros[6];
  const direitaBruta = numeros[1] + numeros[3] + numeros[5] + numeros[7];

  const oduSuperiorNum = reduceToOdu(esquerdaBruta);
  const oduInferiorNum = reduceToOdu(direitaBruta);
  const oduLateralNum = reduceToOdu(oduSuperiorNum + oduInferiorNum);
  const oduCentralNum = reduceToOdu(oduSuperiorNum + oduInferiorNum + oduLateralNum);
  const oduFinalNum = reduceToOdu(oduSuperiorNum + oduInferiorNum + oduLateralNum + oduCentralNum);

  const superior = odus[oduSuperiorNum - 1];
  const inferior = odus[oduInferiorNum - 1];
  const lateral = odus[oduLateralNum - 1];
  const central = odus[oduCentralNum - 1];
  const finalOdu = odus[oduFinalNum - 1];

  const summary = generateCabalaSummary(superior, inferior, lateral, central, finalOdu);

  return { superior, inferior, lateral, central, final: finalOdu, summary };
}

function interpretarOdu(label: string, emoji: string, odu: Odu): string {
  const lines = [
    `${emoji} ${label}: ${odu.number} – ${odu.name} (${odu.nomeIfa})`,
    `Orixás: ${odu.orixa || "Não especificado"}`,
  ];
  if (odu.elemento) lines.push(`Elemento: ${odu.elemento}`);
  if (odu.cores.length > 0) lines.push(`Cores: ${odu.cores.join(", ")}`);
  if (odu.corpo) lines.push(`Corpo: ${odu.corpo}`);
  lines.push(
    `${odu.meaning}`,
    `Personalidade: ${odu.personality}`,
    `Conselho: ${odu.advice}`,
    `⚠️ Evitar: ${odu.evitar}`,
  );
  return lines.join("\n");
}

function generateCabalaSummary(
  superior: Odu, inferior: Odu, lateral: Odu, central: Odu, finalOdu: Odu
): string {
  return [
    `🔮 Odù Superior: ${superior.number} – ${superior.name} (${superior.nomeIfa})`,
    `${superior.meaning}`,
    `Orixás: ${superior.orixa || "—"} | Elemento: ${superior.elemento || "—"}`,
    ``,
    `👤 Odù Inferior: ${inferior.number} – ${inferior.name} (${inferior.nomeIfa})`,
    `${inferior.meaning}`,
    `Orixás: ${inferior.orixa || "—"} | Elemento: ${inferior.elemento || "—"}`,
    ``,
    `🧠 Odù Lateral: ${lateral.number} – ${lateral.name} (${lateral.nomeIfa})`,
    `${lateral.meaning}`,
    `Orixás: ${lateral.orixa || "—"} | Elemento: ${lateral.elemento || "—"}`,
    ``,
    `🛤️ Odù Central: ${central.number} – ${central.name} (${central.nomeIfa})`,
    `${central.meaning}`,
    `Orixás: ${central.orixa || "—"} | Elemento: ${central.elemento || "—"}`,
    ``,
    `🛡️ Odù Final: ${finalOdu.number} – ${finalOdu.name} (${finalOdu.nomeIfa})`,
    `${finalOdu.meaning}`,
    `Orixás: ${finalOdu.orixa || "—"} | Elemento: ${finalOdu.elemento || "—"}`,
    ``,
    `━━━━━━━━━━━━━━━━━━`,
    `✨ Conselho Espiritual:`,
    `O caminho principal pede: ${superior.advice}`,
    `Evite: ${finalOdu.evitar}`,
  ].join("\n");
}

// Keep backward compatibility

// Keep backward compatibility
export function calculateOdu(fullName: string, birthDate: string) {
  const result = calculateCabala(birthDate);
  return {
    principal: result.central,
    destino: result.final,
    message: result.summary,
  };
}
