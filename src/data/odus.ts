export interface Odu {
  number: number;
  name: string;
  orixa: string;
  orixaDescricao: string;
  elemento: string;
  meaning: string;
  personality: string;
  positivo: string;
  negativo: string;
  evitar: string;
  advice: string;
}

export const odus: Odu[] = [
  {
    number: 1, name: "Okanran", orixa: "Exu, Ogum",
    orixaDescricao: "Regido por Exu, o orixá guardião da comunicação. Representa proteção, justiça, paciência e força. Personalidade disciplinada e protetora.",
    elemento: "Fogo",
    meaning: "Energia de força e transformação. Indica coragem e abertura de caminhos, mas pede controle da impulsividade. Tudo ao redor muda com velocidade impressionante.",
    personality: "Pessoa forte, corajosa e determinada. Abre seus próprios caminhos com garra. Pode ser impulsiva e teimosa quando contrariada. Temperamento explosivo e sedutor.",
    positivo: "Sorte nos negócios, desconfiança saudável que protege de riscos, capacidade de avaliar situações antes de agir.",
    negativo: "Extremismo, envolvimentos rápidos e intempestivos, tendência à insubordinação e rebeldia. Pode gerar descontrole.",
    evitar: "brigas, decisões precipitadas", advice: "praticar autocontrole e disciplina espiritual"
  },
  {
    number: 2, name: "Ejioko", orixa: "Ibeji, Obá",
    orixaDescricao: "Regido por Ibeji (protetor dos gêmeos Taiwo e Kehide) e Obá (primeira esposa de Xangô, guerreira). Personalidade forte, objetiva e sincera.",
    elemento: "Água",
    meaning: "Energia de equilíbrio, inteligência e observação. Odu questionador, pensamento errático e mutável. Calma aparente que esconde dúvidas constantes.",
    personality: "Pessoa inteligente, observadora e analítica. Pensa antes de agir. Sensível espiritualmente, mas pode travar por excesso de dúvida. Francos e sinceros.",
    positivo: "Personalidade forte, objetivos firmes, espírito de luta, propenso ao sacrifício. Não aceita falsidade.",
    negativo: "Constante mutação devido às dúvidas, brigas e complicações na rotina. Questiona o afeto dos outros.",
    evitar: "indecisão e excesso de pensamento", advice: "confiar mais na própria intuição"
  },
  {
    number: 3, name: "Etaogunda", orixa: "Oxum, Ogum",
    orixaDescricao: "Regido por Oxum, orixá das águas doces, senhora da fertilidade, beleza, sensibilidade, dinheiro e riqueza espiritual.",
    elemento: "Água",
    meaning: "Energia de luta e conquista. Indica crescimento através do esforço. Capacidade de realizar objetivos, especialmente ligados ao trabalho.",
    personality: "Guerreiro(a) nato(a). Pessoa batalhadora que vence pelo esforço. Obstinada, apaixonada, criativa e dedicada ao trabalho. Pode entrar em conflitos desnecessários.",
    positivo: "Situações de vitória, produtividade, capacidade de realização. Forte especialmente em discussões e trabalho.",
    negativo: "Dificuldades nos negócios, rivalidades intensas, traições. Pode anular presságios positivos da carreira quando em aspecto negativo.",
    evitar: "conflitos constantes e rivalidades", advice: "manter disciplina e foco"
  },
  {
    number: 4, name: "Irosun", orixa: "Iemanjá, Eguns",
    orixaDescricao: "Regido por Iemanjá (mãe de todos os orixás, decide o destino de quem entra no mar) e Eguns (espíritos evoluídos, iluminados, ligados à família).",
    elemento: "Água",
    meaning: "Odù ligado à espiritualidade profunda e ancestralidade. Indica pessoas generosas, com intuição aguçada e forte conexão com aspectos místicos.",
    personality: "Pessoa ligada às raízes e à família. Forte intuição e mediunidade natural. Protetora e acolhedora, mas pode absorver energias alheias. Dada ao trabalho manual e vendas.",
    positivo: "Fertilidade, trabalho, vitória através do esforço e conquista material. Capacidade transformadora.",
    negativo: "Tendência a sofrer traições amorosas, acidentes, inveja dos inimigos. Constantemente caluniado. Separações e miséria.",
    evitar: "ambientes negativos e pessoas invejosas", advice: "fortalecer fé e espiritualidade"
  },
  {
    number: 5, name: "Oxê", orixa: "Oxum, Logunedé",
    orixaDescricao: "Regido por Oxum. O Odu foi gerado à beira do rio com cinco espelhos e um pano amarelo. Considerado o Odu da feitiçaria, concebido sem pecado original.",
    elemento: "Água",
    meaning: "Energia de prosperidade e magnetismo pessoal. Pessoas tranquilas, objetivas e serenas que auxiliam na resolução de situações complexas.",
    personality: "Pessoa magnética, sedutora e próspera. Tem facilidade para atrair coisas boas. Encantadora, sensível, mas precisa cuidar da vaidade.",
    positivo: "Capacidade de conseguir lucros, caráter transformador e mutável. Sabe aproveitar oportunidades com sabedoria.",
    negativo: "Perdas e problemas de saúde (especialmente ligados ao ventre), tendência a mentir, degeneração e destruição quando em aspecto negativo.",
    evitar: "vaidade excessiva e vingança", advice: "manter humildade e equilíbrio financeiro"
  },
  {
    number: 6, name: "Obará", orixa: "Xangô, Oxóssi",
    orixaDescricao: "Regido por Xangô (justiça e trovão) e Oxóssi (caça, fartura, sustento). Astuto, sábio e ardiloso. Grande proteção espiritual pelo fogo.",
    elemento: "Fogo",
    meaning: "Energia de liderança e expansão. Forte associação com justiça, atrevimento e ideia de provedor. Precisam manter-se calados sobre projetos pessoais.",
    personality: "Líder natural com poder de comando. Pessoa justa, comunicativa, conquistadora. Luta pelo que deseja e conquista objetivos. Força de vontade imensa.",
    positivo: "Proteção espiritual garantida, vitória através do trabalho, vontade de vencer. Costuma trabalhar com questões relativas à lei.",
    negativo: "Má sorte no amor, não deve se iludir nem fazer grandes exigências dos parceiros. Problemas de ordem moral quando negativo.",
    evitar: "orgulho e autoritarismo", advice: "liderar com sabedoria e manter sigilo sobre planos"
  },
  {
    number: 7, name: "Odi", orixa: "Obaluaiê",
    orixaDescricao: "Regido por Obaluaiê, protetor da saúde e das pessoas mais velhas. Associado à cura em todos os aspectos, manutenção da saúde mental e equilíbrio emocional.",
    elemento: "Fogo",
    meaning: "Um dos Odus mais ricos e prósperos. Forte ligação com a cura e manutenção do equilíbrio na área da saúde, tanto física quanto mental.",
    personality: "Pessoa com fé, que multiplica seu dinheiro. Boa organização financeira, tende a se dar muito bem na carreira. Alegre, satisfeita e muito amiga.",
    positivo: "Prefere não perder tempo se lamentando, mantém ânimo em alta independente dos acontecimentos. Busca constante de sucesso, fartura e prosperidade.",
    negativo: "Caminhos fechados e dificuldades quando negativado. Fracassos na vida conjugal e na carreira. Destruição pode ser devastadora.",
    evitar: "guardar mágoas e ambientes negativos", advice: "praticar perdão e manter a fé"
  },
  {
    number: 8, name: "Ejionile", orixa: "Oxaguiã",
    orixaDescricao: "Regido por Oxaguiã, que tem liderança como característica marcante. Seus filhos são orgulhosos, voltados para a vida familiar e bastante calmos. Valente, intuitivo, instável.",
    elemento: "Fogo",
    meaning: "Ligado à força do sol, do fogo e do céu. Um dos Odus mais quentes. Capacidade de se manter ativo, mas pode ser irritadiço e difícil de lidar.",
    personality: "Pessoa justa, responsável, com senso de dever forte. Apesar do temperamento, tende a guardar tudo o que sente e nunca machucaria alguém por querer. Determinada.",
    positivo: "Disposição para se manter ativo, agilidade mental, vontade de atingir o sucesso. Características dinâmicas que impelem a conquistar objetivos.",
    negativo: "Ligado à inveja (oculta), expansão, orgulho e vaidade. Pode se tornar vingativo e falso quando sente ódio. Conflitos constantes no caminho.",
    evitar: "rigidez e excesso de cobrança", advice: "buscar equilíbrio e controlar o temperamento"
  },
  {
    number: 9, name: "Ossá", orixa: "Iemanjá",
    orixaDescricao: "Regido por Iemanjá, mãe de todos os orixás, rainha das águas salgadas, 'Afrodite brasileira'. Ligado ao feminino pela ideia de maternidade e fertilidade.",
    elemento: "Água",
    meaning: "Odu extremamente feminino, relacionado à feitiçaria e práticas atribuídas às mulheres. Conexão com fertilidade e capacidade de doação incondicional.",
    personality: "Pessoa sempre em busca de se conhecer melhor. Gosta de dominar assuntos importantes e adquirir conhecimento. Dinamismo e capacidade de apoiar os outros.",
    positivo: "Autoconhecimento como característica marcante, desejo de se informar sobre o mundo. Expansão social e abundância, capacidade de realizar projetos de vida.",
    negativo: "Influências negativas de egungum, situações de desespero e choro constantes. Possibilidade de atrair amizades falsas. Instabilidade emocional.",
    evitar: "instabilidade e amizades falsas", advice: "manter foco e usar sabedoria para administrar dons"
  },
  {
    number: 10, name: "Ofun", orixa: "Oxalufã",
    orixaDescricao: "Regido por Oxalufã, orixá muito velho, da paz e da paciência. Seus filhos são pessoas doces, que andam e falam devagar. Bondosos e sabem quais sentimentos alimentar.",
    elemento: "Água",
    meaning: "Odù da sabedoria espiritual. Tranquilidade que revela necessidade de proteção contra traições de lugares inesperados. Adota mecanismos elaborados de defesa.",
    personality: "Pessoa sábia, espiritual e com missão elevada. Honesta, inteligente, sabe cultivar boas amizades. Não tem medo de pedir ajuda quando precisa.",
    positivo: "Voltado para caridade e paciência. Compreende com facilidade os seus problemas e está sempre disposto a ajudar quem precisa.",
    negativo: "Deve tomar cuidado com traições, especialmente de pessoas próximas. Calúnias e situações sérias envolvendo figuras de autoridade.",
    evitar: "absorver energia negativa e confiar demais", advice: "cuidar da espiritualidade e manter defesas"
  },
  {
    number: 11, name: "Owonrin", orixa: "Iansã, Exu",
    orixaDescricao: "Regido por Iansã (comandante dos raios, esposa de Xangô, sincretizada como Santa Bárbara) e Exu (mensageiro entre humanos e divindades, ambivalente, o mais humano dos orixás).",
    elemento: "Fogo",
    meaning: "Ligado à sexualidade e sedução. Características obstinadas, incapaz de desistir dos sonhos. Odu feminino ligado à reprodução.",
    personality: "Pessoa criativa, comunicativa e expressiva. Tendência a conquistar relacionamentos longos, prósperos e duradouros. Conexão forte com sexualidade e reprodução.",
    positivo: "Forma admirável de encarar o amor, tendência a relacionamentos longos e duradouros. Obstinação e determinação para alcançar sonhos.",
    negativo: "Torna as pessoas volúveis e suscetíveis a más influências. Pressa e vontade de ter tudo ao mesmo tempo impede permanência. Fracassos afetivos e financeiros.",
    evitar: "falar demais e impaciência", advice: "usar palavra com sabedoria e cultivar paciência"
  },
  {
    number: 12, name: "Ejilaxeborá", orixa: "Xangô",
    orixaDescricao: "Regido por Xangô, orixá da justiça, virilidade, trovões e fogo. Figura de guerreiro, bruxo e rei. Representa a necessidade de encontrar alegria de viver. Excessivamente masculino.",
    elemento: "Fogo",
    meaning: "Odù da união e parceria. Associado a duas forças em conflito, o resultado pende para o lado mais forte. Ligação com oposição, troca, casamento, pactos e acordos.",
    personality: "Pessoa acolhedora, parceira e dedicada. Senso de justiça marcante. Somente atinge vitórias de forma admirável, dando o seu melhor.",
    positivo: "Senso de justiça como característica marcante, vitórias admiráveis. Inteligência e paixão. Ideia de contrato e compromisso entre partes.",
    negativo: "Arrogância, tendência a se colocar acima dos demais. Ciúme nos relacionamentos. Conflitos marcados por dualidade.",
    evitar: "arrogância e ciúme", advice: "desenvolver autonomia e humildade"
  },
  {
    number: 13, name: "Ejiologbon", orixa: "Nanã, Obaluaê",
    orixaDescricao: "Regido por Nanã (anciã, avó nas religiões afro-brasileiras, ligada à sabedoria e águas paradas) e Obaluaê (voltado para cura e proteção de pessoas mais velhas).",
    elemento: "Terra",
    meaning: "Usa sagacidade e habilidades para conquistar bem-estar e fortuna. Dá-se bem em atividades ligadas à comunicação. Intuição aguçada e capacidade de convencer.",
    personality: "Alma velha. Pessoa madura, teimosa, só faz o que deseja. Forte poder de realização, mas depende da vontade do Odu. Adaptável aos mais diversos locais.",
    positivo: "Adaptabilidade absurda, poder de raciocínio, incrível capacidade de comunicação. Conseguem se adequar a qualquer ambiente com facilidade.",
    negativo: "Tendência à melancolia, teimosia como característica negativa. Forte poder de realização que pode ser ignorado por falta de vontade.",
    evitar: "isolamento e teimosia", advice: "compartilhar conhecimento e agir com determinação"
  },
  {
    number: 14, name: "Iká", orixa: "Ewá, Oxumaré",
    orixaDescricao: "Regido por Ewá (símbolo de beleza, sensualidade, sabedoria e vidência, protetora da pureza) e Oxumaré (conexão entre céu e terra, associado a dificuldades e superação).",
    elemento: "Água",
    meaning: "Odu ligado à ideia de superação. Aqueles associados a ele aprendem a lidar com dificuldades e ultrapassá-las de forma eficaz. Coragem e fluidez em negociações.",
    personality: "Pessoa resiliente que supera grandes provas. Mesmo nas turbulências, prefere olhá-las como contratempos. Conquistam boas amizades ao longo da vida.",
    positivo: "Vida feliz, boas amizades, capacidade de passar pelas tempestades de forma eficiente. Triunfa sobre inimigos e controla situações tumultuadas.",
    negativo: "Impotência quando negativado, tendência a brigas, vinganças, perversidade e agressões na vida das pessoas associadas.",
    evitar: "ambientes negativos e vinganças", advice: "fortalecer proteção espiritual e cultivar amizades"
  },
  {
    number: 15, name: "Obeogundá", orixa: "Ewá",
    orixaDescricao: "Influenciado por Ewá, deusa da intuição com dom da vidência. Associada à pureza, beleza e sensualidade. Orixá feminino e sábio.",
    elemento: "Água",
    meaning: "Sabedoria e dinamismo fazem parte das características, mas demonstra resistência às mudanças. Problemas com estagnação, especialmente no campo profissional.",
    personality: "Pessoa com caminhos que se abrem pelo amor. Felicidade no amor é perspectiva real pela regência de Ewá. Dinâmica mas pode ser impulsiva e mimada.",
    positivo: "Chance de felicidade no amor, embora precise batalhar por ela. Dinamismo potencializado pelo elemento Água. Capacidade de atingir objetivos.",
    negativo: "Estagnação, inflexibilidade de opiniões mesmo percebendo estar errado. Resistência à mudança. Concorrência constante no amor. Possibilidades de sucesso limitadas.",
    evitar: "estagnação e inflexibilidade", advice: "focar nos objetivos e aceitar mudanças"
  },
  {
    number: 16, name: "Aláfia", orixa: "Oxalá, Orumilá",
    orixaDescricao: "Regido por Oxalá (criação do mundo, símbolo de paz, sereno e pacificador) e Orumilá (profecia e adivinhação, sabedoria). Pessoas com lado espiritual desenvolvido.",
    elemento: "Ar",
    meaning: "Odu positivo, tendência a estar sempre de bem com a vida. Progresso como realidade. Hesitação em situações que demandam instinto. Inclinações artísticas.",
    personality: "Pessoa pacificadora, equilibrada, sensível e afetuosa. Características femininas pela conexão com o Ar. Constantemente tranquila pelo desenvolvimento espiritual.",
    positivo: "Pureza como aspecto mais positivo. Espalham felicidade e paz em todos os espaços, tornando qualquer ambiente mais harmônico.",
    negativo: "Poucos aspectos negativos. Acomodação pode interromper o progresso e causar declínio. Precisa encontrar ponto de equilíbrio.",
    evitar: "acomodação e reclamações sem ação", advice: "manter espiritualidade forte e agir com mudanças de atitude"
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

function interpretarOdu(label: string, emoji: string, odu: Odu): string {
  return [
    `${emoji} ${label}: ${odu.name}`,
    `Orixás: ${odu.orixa}`,
    `Elemento: ${odu.elemento}`,
    `${odu.meaning}`,
    `Personalidade: ${odu.personality}`,
    `✅ Positivo: ${odu.positivo}`,
    `❌ Negativo: ${odu.negativo}`,
    `Conselho: ${odu.advice}`,
    `⚠️ Evitar: ${odu.evitar}`,
  ].join("\n");
}

function generateCabalaSummary(
  superior: Odu, inferior: Odu, lateral: Odu, central: Odu, finalOdu: Odu
): string {
  return [
    `Seu caminho espiritual é guiado pelo Odu ${superior.name}.`,
    ``,
    `👤 Personalidade pelo cálculo:`,
    `${superior.personality}`,
    ``,
    `Este Odu indica ${superior.meaning}`,
    `O conselho espiritual é ${superior.advice}`,
    `Evite ${superior.evitar}.`,
    `Os orixás que respondem são ${superior.orixa}.`,
    ``,
    `━━━━━━━━━━━━━━━━━━`,
    ``,
    interpretarOdu("Odu Superior", "🔮", superior),
    ``,
    interpretarOdu("Odu Inferior", "👤", inferior),
    ``,
    interpretarOdu("Odu Lateral", "🧠", lateral),
    ``,
    interpretarOdu("Odu Central", "🛤️", central),
    ``,
    interpretarOdu("Odu Final", "🛡️", finalOdu),
    ``,
    `━━━━━━━━━━━━━━━━━━`,
    `✨ Resumo Espiritual:`,
    `Superior: ${superior.name} (${superior.orixa}) — ${superior.personality}`,
    `Inferior: ${inferior.name} (${inferior.orixa}) — ${inferior.personality}`,
    `Central: ${central.name} (${central.orixa}) — ${central.personality}`,
    `Final: ${finalOdu.name} (${finalOdu.orixa}) — ${finalOdu.personality}`,
    ``,
    `💡 Conselho principal: ${central.advice}`,
    `📿 Orixás regentes: ${central.orixa}`,
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
