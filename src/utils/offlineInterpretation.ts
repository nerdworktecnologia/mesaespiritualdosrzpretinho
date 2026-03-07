import { CabalaResult } from "@/data/odus";
import { CardMeaning } from "@/data/cardMeanings";

interface BuziosState {
  buzios: number[];
  abertos: number;
  odu: { name: string; orixa: string; meaning: string };
}

export interface OfflineInterpretation {
  temaDetectado?: string;
  relampago: string;
  media: string;
  completa: string;
  destino: string;
  energia: string;
  situacao: string;
  orientacao: string;
  resumo: string;
  isOffline: boolean;
}

// Theme-specific dictionaries for richer interpretations
const temaTextos: Record<string, {
  abertura: string;
  cabalaPositiva: string;
  cabalaNegativa: string;
  buziosAltos: string;
  buziosBaixos: string;
  tarotPositivo: string;
  tarotNegativo: string;
  orientacaoGeral: string;
  cruzamento: string;
  resumoFinal: string;
}> = {
  amor: {
    abertura: "O coração está em destaque nesta leitura.",
    cabalaPositiva: "Os Odus revelam um ciclo de abertura emocional e conexões profundas. A energia do amor está se renovando em sua vida, trazendo possibilidades de encontros significativos e fortalecimento de laços existentes.",
    cabalaNegativa: "Os Odus indicam a necessidade de curar feridas emocionais antes de avançar. Há bloqueios energéticos no campo afetivo que precisam ser trabalhados com paciência e autoconhecimento.",
    buziosAltos: "A quantidade de búzios abertos mostra que o amor está em movimento — há energia forte circulando e favorecendo aproximações, reconciliações e declarações. O universo conspira a favor do afeto.",
    buziosBaixos: "Poucos búzios abertos indicam um período de introspecção afetiva. Não force situações — deixe que o sentimento amadureça naturalmente. A resposta virá no momento certo.",
    tarotPositivo: "As cartas trazem mensagens de esperança no amor. Há luz no caminho sentimental e as energias apontam para momentos de felicidade, cumplicidade e entrega verdadeira.",
    tarotNegativo: "As cartas alertam para cuidados no campo amoroso. Evite decisões impulsivas e proteja seu coração de ilusões. Nem tudo que brilha é ouro — observe com atenção.",
    orientacaoGeral: "Cuide do seu coração com carinho. O amor verdadeiro exige paciência, respeito e reciprocidade. Confie no tempo divino.",
    cruzamento: "o campo afetivo está em transformação — o amor pede coragem para se abrir e sabedoria para se proteger",
    resumoFinal: "O amor está em movimento. Permita-se sentir, mas com discernimento espiritual.",
  },
  "volta de ex": {
    abertura: "A energia de reconexão com o passado está presente nesta leitura.",
    cabalaPositiva: "Os Odus mostram que há fios energéticos ainda conectando vocês. Existe possibilidade de retorno, mas dependerá de mudanças reais de ambas as partes.",
    cabalaNegativa: "Os Odus indicam que o ciclo dessa relação pode ter se encerrado espiritualmente. A energia aponta para novos caminhos e novas pessoas entrando em sua vida.",
    buziosAltos: "Os búzios mostram grande agitação energética — essa pessoa ainda pensa em você e há movimentação espiritual acontecendo. O reencontro é possível, mas depende de atitudes concretas.",
    buziosBaixos: "Os búzios indicam que essa pessoa está distante energeticamente. Não há movimentação significativa no momento. Foque em você e deixe o universo trabalhar.",
    tarotPositivo: "As cartas sugerem que há chance de reconciliação, mas ela virá diferente do que você imagina. Esteja aberto(a) a uma nova versão dessa relação.",
    tarotNegativo: "As cartas mostram que insistir nessa volta pode trazer mais sofrimento. O universo está tentando te direcionar para algo melhor — confie.",
    orientacaoGeral: "Nem toda volta é benéfica. Avalie se o retorno trará paz ou repetição de padrões. Seu valor não depende de ninguém.",
    cruzamento: "a energia do passado ainda pulsa, mas o futuro pede que você honre seu próprio valor antes de qualquer reconciliação",
    resumoFinal: "O passado tem lições, mas o futuro tem presentes. Escolha com sabedoria.",
  },
  "traição": {
    abertura: "A verdade está tentando vir à tona nesta leitura.",
    cabalaPositiva: "Os Odus mostram que a verdade prevalecerá. Mesmo que doa, a clareza trará libertação e permitirá decisões mais sábias.",
    cabalaNegativa: "Os Odus revelam energias de engano e falsidade ao redor. Há pessoas que não são o que aparentam — confie na sua intuição.",
    buziosAltos: "Os búzios confirmam que há movimentação escondida. A verdade está prestes a se revelar — prepare-se emocionalmente para o que pode surgir.",
    buziosBaixos: "Os búzios sugerem que as coisas estão sendo bem escondidas. A verdade virá, mas pode demorar. Não investigue de forma obsessiva — deixe o espiritual trabalhar.",
    tarotPositivo: "As cartas indicam que a situação se resolverá a seu favor. A verdade sempre aparece e você terá forças para lidar com ela.",
    tarotNegativo: "As cartas alertam para não tomar decisões drásticas agora. Reúna provas, converse com calma e proteja sua paz mental antes de agir.",
    orientacaoGeral: "A traição dói, mas não te define. Sua dignidade está intacta. Busque a verdade com coragem e tome decisões com a cabeça fria.",
    cruzamento: "há segredos sendo revelados — a verdade virá como libertação, não como punição",
    resumoFinal: "A verdade é uma aliada, mesmo quando machuca. Confie no processo de revelação.",
  },
  trabalho: {
    abertura: "O campo profissional está em evidência nesta consulta.",
    cabalaPositiva: "Os Odus apontam um ciclo favorável para crescimento profissional. Novas oportunidades estão se formando — esteja atento(a) a propostas e convites inesperados.",
    cabalaNegativa: "Os Odus indicam obstáculos no caminho profissional. Há necessidade de estratégia e paciência — nem tudo acontecerá no tempo que você deseja.",
    buziosAltos: "Os búzios mostram grande energia de conquista e realização. O momento é propício para agir com ousadia, apresentar projetos e buscar reconhecimento.",
    buziosBaixos: "Os búzios pedem cautela no campo profissional. Evite conflitos com colegas e superiores. Planeje com cuidado e espere o momento certo para se posicionar.",
    tarotPositivo: "As cartas trazem presságios positivos para o trabalho. Há prosperidade e reconhecimento chegando — continue se dedicando com fé.",
    tarotNegativo: "As cartas alertam para possíveis armadilhas no ambiente de trabalho. Desconfie de promessas fáceis e proteja suas ideias e projetos.",
    orientacaoGeral: "O sucesso profissional é construído com dedicação, fé e estratégia. Confie no seu potencial e não desista diante dos obstáculos.",
    cruzamento: "oportunidades estão se formando no campo profissional — ação estratégica combinada com fé trará resultados concretos",
    resumoFinal: "O trabalho é terreno fértil neste momento. Plante com sabedoria e colha com gratidão.",
  },
  dinheiro: {
    abertura: "A energia da prosperidade está sendo consultada.",
    cabalaPositiva: "Os Odus revelam caminhos de abundância se abrindo. Há dinheiro chegando por vias inesperadas — esteja preparado(a) para receber.",
    cabalaNegativa: "Os Odus alertam para cuidados com gastos desnecessários e empréstimos. O momento pede disciplina financeira e planejamento.",
    buziosAltos: "Os búzios indicam forte movimentação financeira. Dinheiro entra, mas também pode sair rápido — administre com sabedoria. Boas negociações estão favorecidas.",
    buziosBaixos: "Os búzios mostram que o dinheiro está represado. Há bloqueios que precisam ser trabalhados — tanto no plano material quanto espiritual. Faça oferendas e peça prosperidade.",
    tarotPositivo: "As cartas são favoráveis à prosperidade. Investimentos, vendas e negociações tendem a dar certo. Confie na sua capacidade de gerar riqueza.",
    tarotNegativo: "As cartas pedem atenção com dívidas e gastos impulsivos. Organize suas finanças antes de fazer novos compromissos.",
    orientacaoGeral: "A prosperidade é fruto de trabalho, fé e organização. Honre seu dinheiro com gratidão e ele se multiplicará.",
    cruzamento: "a prosperidade está a caminho, mas exige disciplina e gratidão para se manifestar plenamente",
    resumoFinal: "Dinheiro é energia — quando bem direcionado, multiplica. Confie e administre com sabedoria.",
  },
  espiritual: {
    abertura: "O plano espiritual está em destaque nesta leitura.",
    cabalaPositiva: "Os Odus mostram forte conexão com seus guias e protetores. Sua espiritualidade está fortalecida e há proteção divina sobre seus caminhos.",
    cabalaNegativa: "Os Odus indicam a necessidade de limpeza e fortalecimento espiritual. Há energias densas ao redor que precisam ser dissipadas com banhos, orações e oferendas.",
    buziosAltos: "Os búzios revelam grande atividade espiritual ao seu redor. Seus guias estão trabalhando intensamente — preste atenção em sonhos, sinais e coincidências.",
    buziosBaixos: "Os búzios pedem mais dedicação à sua espiritualidade. Reserve tempo para oração, meditação e conexão com o sagrado. Seus guias querem se comunicar.",
    tarotPositivo: "As cartas confirmam proteção espiritual e evolução. Você está no caminho certo — continue honrando seus guias e mantendo sua fé.",
    tarotNegativo: "As cartas alertam para ataques espirituais ou negligência com a espiritualidade. Cuide das suas defesas e não deixe de fazer suas práticas.",
    orientacaoGeral: "A espiritualidade é seu maior escudo. Mantenha-se conectado(a) com seus guias, faça suas oferendas e confie na proteção divina.",
    cruzamento: "o plano espiritual está ativo e seus guias estão presentes — honre essa conexão com fé e dedicação",
    resumoFinal: "Sua espiritualidade é sua fortaleza. Cuide dela com amor e devoção.",
  },
  inveja: {
    abertura: "Energias de inveja e negatividade estão sendo investigadas.",
    cabalaPositiva: "Os Odus mostram que você tem proteção espiritual forte contra inveja. As energias negativas estão sendo barradas por seus guias.",
    cabalaNegativa: "Os Odus revelam que há olho grande sobre você. Pessoas próximas podem estar enviando energia negativa — proteja-se com banhos e orações.",
    buziosAltos: "Os búzios confirmam a presença de inveja forte ao redor. Mas a boa notícia é que seus protetores estão agindo. Faça limpezas espirituais regulares.",
    buziosBaixos: "Os búzios indicam que a inveja está sendo contida, mas não desaparecer. Mantenha suas proteções e evite expor suas conquistas.",
    tarotPositivo: "As cartas mostram que você vencerá a inveja. Sua luz incomoda os outros, mas é justamente ela que te protege. Continue brilhando.",
    tarotNegativo: "As cartas alertam para proteção urgente. Há energias pesadas direcionadas a você — faça limpeza espiritual o mais rápido possível.",
    orientacaoGeral: "A inveja é o tributo que a mediocridade paga ao talento. Proteja-se, mas não deixe de viver. Seus guias estão ao seu lado.",
    cruzamento: "há inveja direcionada a você, mas suas proteções espirituais estão ativas e trabalhando a seu favor",
    resumoFinal: "Inveja é sinal de que você está fazendo algo certo. Proteja-se e siga em frente.",
  },
  "família": {
    abertura: "O núcleo familiar está em foco nesta consulta.",
    cabalaPositiva: "Os Odus indicam harmonia familiar chegando. Conflitos serão resolvidos e laços fortalecidos. A paz no lar está se restaurando.",
    cabalaNegativa: "Os Odus revelam tensões familiares que precisam de atenção. Há desentendimentos que, se não tratados, podem se agravar. Busque o diálogo.",
    buziosAltos: "Os búzios mostram muita energia circulando na família. Há movimento, mudanças e possíveis surpresas. Mantenha a calma e conduza com sabedoria.",
    buziosBaixos: "Os búzios indicam um período de quietude familiar. Aproveite para fortalecer laços, conversar e demonstrar afeto aos seus.",
    tarotPositivo: "As cartas trazem boas energias para o lar. União, compreensão e momentos felizes estão previstos. Valorize quem está ao seu lado.",
    tarotNegativo: "As cartas alertam para cuidados com fofocas e intrigas familiares. Nem todos ao redor desejam seu bem — discernimento é fundamental.",
    orientacaoGeral: "A família é sagrada, mas nem sempre é fácil. Escolha suas batalhas com sabedoria e proteja a paz do seu lar.",
    cruzamento: "o lar pede atenção e cuidado — a harmonia familiar depende de diálogo e compreensão mútua",
    resumoFinal: "Família é raiz. Cuide dela com amor, mas sem perder sua própria identidade.",
  },
  "justiça": {
    abertura: "Questões de justiça e documentos estão sendo analisadas.",
    cabalaPositiva: "Os Odus favorecem causas justas. Se você está com a razão, o resultado tende a ser positivo. A justiça divina está ao seu lado.",
    cabalaNegativa: "Os Odus pedem cautela em processos e questões legais. Pode haver atrasos ou resultados inesperados. Consulte um profissional qualificado.",
    buziosAltos: "Os búzios mostram movimentação favorável em questões legais. Documentos serão liberados e decisões tomadas em seu favor.",
    buziosBaixos: "Os búzios indicam lentidão nos processos. Paciência é necessária — a justiça dos homens é lenta, mas a divina é certeira.",
    tarotPositivo: "As cartas indicam vitória em questões legais. Mantenha a fé e confie no processo — o resultado será justo.",
    tarotNegativo: "As cartas pedem atenção com prazos e documentos. Revise tudo com cuidado e não assine nada sem compreender completamente.",
    orientacaoGeral: "A justiça divina nunca falha. Faça a sua parte no plano material e confie que o universo equilibrará a balança.",
    cruzamento: "questões legais estão em andamento — a verdade prevalecerá com paciência e fé",
    resumoFinal: "A justiça tarda, mas não falha. Confie no processo e mantenha sua integridade.",
  },
  "saúde emocional": {
    abertura: "O estado emocional e mental está sendo consultado.",
    cabalaPositiva: "Os Odus mostram que um período de cura emocional está começando. As energias de renovação estão chegando — permita-se descansar e recomeçar.",
    cabalaNegativa: "Os Odus indicam sobrecarga emocional. Seu espírito está cansado e precisa de cuidados. Não se cobre tanto — peça ajuda quando necessário.",
    buziosAltos: "Os búzios revelam intensidade emocional. Há muita coisa acontecendo internamente — permita-se chorar, sentir e processar. A cura vem pelo acolhimento.",
    buziosBaixos: "Os búzios mostram um período de apatia ou desânimo. É temporário — busque atividades que nutram sua alma e pessoas que elevem sua energia.",
    tarotPositivo: "As cartas trazem mensagens de esperança e renovação emocional. A tempestade está passando e dias mais leves estão chegando.",
    tarotNegativo: "As cartas alertam para a importância de cuidar da saúde mental. Não ignore os sinais — busque apoio profissional se necessário.",
    orientacaoGeral: "Sua saúde emocional é prioridade. Não há vergonha em pedir ajuda ou em se permitir descansar. Você merece paz interior.",
    cruzamento: "o emocional pede atenção e acolhimento — permita-se curar sem pressa",
    resumoFinal: "Cuide de si como cuida dos outros. Sua paz interior é sagrada.",
  },
  geral: {
    abertura: "Uma leitura espiritual geral está sendo realizada.",
    cabalaPositiva: "Os Odus trazem energias positivas e de renovação para sua vida. Novos ciclos estão se abrindo com bênçãos e oportunidades.",
    cabalaNegativa: "Os Odus pedem atenção e cuidado em suas escolhas. Há desafios à frente, mas nada que sua fé não possa superar.",
    buziosAltos: "Os búzios mostram grande movimentação energética. Mudanças estão acontecendo e o momento pede ação consciente e decisões firmes.",
    buziosBaixos: "Os búzios indicam um período de pausa e reflexão. Use esse tempo para planejar seus próximos passos com sabedoria.",
    tarotPositivo: "As cartas trazem mensagens de otimismo e conquistas. Continue no caminho que está trilhando — as recompensas virão.",
    tarotNegativo: "As cartas pedem cautela e discernimento. Nem tudo é o que parece — observe com atenção antes de agir.",
    orientacaoGeral: "Confie no processo da vida e na proteção dos seus guias. Cada desafio é uma oportunidade de crescimento espiritual.",
    cruzamento: "a energia pede equilíbrio entre ação e fé — confie no processo e siga em frente",
    resumoFinal: "O universo está ao seu lado. Mantenha a fé e siga com coragem.",
  },
};

function getTextosTema(tema: string) {
  return temaTextos[tema] || temaTextos.geral;
}

function avaliarEnergiaCabala(cabala: CabalaResult): "positiva" | "negativa" {
  // Simple heuristic: odd index Odus tend to be more challenging
  const idx = parseInt(cabala.superior.name.replace(/\D/g, "")) || 1;
  return idx <= 8 ? "positiva" : "negativa";
}

function avaliarEnergiaTarot(tarot: CardMeaning[]): "positiva" | "negativa" {
  const positivas = tarot.filter((c) => c.energy === "positive").length;
  return positivas >= tarot.length / 2 ? "positiva" : "negativa";
}

export function gerarInterpretacaoOffline(
  pergunta: string,
  tema: string,
  cabala: CabalaResult | null,
  buzios: BuziosState | null,
  tarot: CardMeaning[]
): OfflineInterpretation {
  const t = getTextosTema(tema);
  const partes: string[] = [];

  // Cabala
  let destinoText = "Cabala não consultada nesta leitura.";
  if (cabala) {
    const energiaCabala = avaliarEnergiaCabala(cabala);
    destinoText = `Seu Odu superior é ${cabala.superior.name} (${cabala.superior.orixa}), indicando ${cabala.superior.meaning || "energias de transformação"}. O Odu central ${cabala.central.name} revela o eixo da sua missão, enquanto o Odu final ${cabala.final.name} aponta o caminho de resolução.\n\n${energiaCabala === "positiva" ? t.cabalaPositiva : t.cabalaNegativa}`;
    partes.push(`Cabala: ${cabala.superior.name} / ${cabala.central.name} / ${cabala.final.name}`);
  }

  // Búzios
  let energiaText = "Búzios não consultados nesta leitura.";
  if (buzios) {
    const textoEnergia = buzios.abertos > 8 ? t.buziosAltos : t.buziosBaixos;
    energiaText = `Caíram ${buzios.abertos} búzios abertos de 16, revelando o Odu ${buzios.odu.name} regido por ${buzios.odu.orixa}. ${buzios.odu.meaning}\n\n${textoEnergia}`;
    partes.push(`Búzios: ${buzios.odu.name} (${buzios.abertos}/16)`);
  }

  // Tarot
  let situacaoText = "Tarot não consultado nesta leitura.";
  if (tarot.length > 0) {
    const nomes = tarot.map((c) => c.name).join(", ");
    const significados = tarot.map((c) => `${c.name}: ${c.meaning}`).join(". ");
    const energiaTarot = avaliarEnergiaTarot(tarot);
    situacaoText = `As cartas tiradas foram: ${nomes}. ${significados}\n\n${energiaTarot === "positiva" ? t.tarotPositivo : t.tarotNegativo}`;
    partes.push(`Tarot: ${nomes}`);
  }

  // Relâmpago
  const relampago = partes.length > 0
    ? `🔮 ${t.abertura} Leitura sobre "${tema}": ${partes.join(" | ")}. ${t.cruzamento}.`
    : "Nenhuma leitura realizada para gerar interpretação.";

  // Média
  const media = [
    `📖 Consulta sobre: ${pergunta || "tema geral"}`,
    `\n\n${t.abertura}`,
    cabala ? `\n\n🔢 Cabala de Ifá: O cruzamento dos Odus ${cabala.superior.name} (superior) e ${cabala.final.name} (final) — ${avaliarEnergiaCabala(cabala) === "positiva" ? t.cabalaPositiva : t.cabalaNegativa}` : "",
    buzios ? `\n\n🐚 Búzios: ${buzios.odu.name} traz a energia de ${buzios.odu.orixa}. Com ${buzios.abertos} abertos, ${buzios.abertos > 8 ? t.buziosAltos : t.buziosBaixos}` : "",
    tarot.length > 0 ? `\n\n🃏 Tarot: ${tarot.map((c) => `${c.name} (${c.energy === "positive" ? "✨" : "⚠️"})`).join(", ")}. ${avaliarEnergiaTarot(tarot) === "positiva" ? t.tarotPositivo : t.tarotNegativo}` : "",
    `\n\n💫 ${t.orientacaoGeral}`,
  ].filter(Boolean).join("");

  // Completa
  const completa = [
    `✨ Leitura Espiritual Completa`,
    `\nTema: ${tema}`,
    `\nPergunta: ${pergunta || "Consulta geral"}`,
    `\n\n${t.abertura}`,
    `\n\n${destinoText}`,
    `\n\n${energiaText}`,
    `\n\n${situacaoText}`,
    `\n\n🔗 Cruzando as leituras: ${t.cruzamento}. ${t.orientacaoGeral}`,
  ].join("");

  // Orientação
  const orientacao = cabala && buzios
    ? `A combinação de ${cabala.superior.name} com ${buzios.odu.name} revela que ${t.cruzamento}. ${buzios.abertos > 8 ? t.buziosAltos : t.buziosBaixos} ${t.orientacaoGeral}`
    : t.orientacaoGeral;

  const resumo = `${t.resumoFinal} (Interpretação local — ${partes.length} sistema(s) oracular(es) cruzado(s))`;

  return {
    temaDetectado: tema,
    relampago,
    media,
    completa,
    destino: destinoText,
    energia: energiaText,
    situacao: situacaoText,
    orientacao,
    resumo,
    isOffline: true,
  };
}
