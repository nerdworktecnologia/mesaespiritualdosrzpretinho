export interface DiceInterpretation {
  titulo: string;
  energia: string;
  mensagem: string;
  conselho: string;
  alerta?: string;
}

// Key format: "d1-d2-d3" sorted ascending
function makeKey(d1: number, d2: number, d3: number): string {
  return [d1, d2, d3].sort((a, b) => a - b).join("-");
}

const combos: Record<string, DiceInterpretation> = {
  // === TRINCAS (todos iguais) ===
  "1-1-1": {
    titulo: "Trinca de Ás — O Recomeço",
    energia: "Energia de renovação total. Zé Pelintra limpa os caminhos.",
    mensagem: "Três ases: tudo volta ao zero. É hora de recomeçar do princípio, sem carregar o peso do passado. Zé Pelintra diz que a humildade é sua maior força agora.",
    conselho: "Largue o orgulho. Aceite ajuda. Comece pequeno, mas comece hoje.",
    alerta: "Cuidado com a teimosia. Insistir no mesmo erro é desafiar a sorte.",
  },
  "2-2-2": {
    titulo: "Trinca de Dois — A Dualidade",
    energia: "Energia de escolha e decisão. Encruzilhada espiritual.",
    mensagem: "Dois caminhos se apresentam, e Zé Pelintra mostra que ambos têm consequências. A indecisão é o maior perigo agora. Escolha com o coração, mas use a cabeça.",
    conselho: "Tome a decisão que você está adiando. O tempo de pensar acabou.",
    alerta: "Não tente ficar com os dois lados. Quem anda em duas canoas, cai na água.",
  },
  "3-3-3": {
    titulo: "Trinca de Três — A Trindade",
    energia: "Energia de proteção tripla. Corpo, mente e espírito alinhados.",
    mensagem: "Combinação poderosa! Zé Pelintra, seus guias e seus ancestrais estão todos presentes. Momento de grande força espiritual e clareza mental.",
    conselho: "Aproveite essa fase para fazer pedidos importantes e tomar decisões grandes.",
  },
  "4-4-4": {
    titulo: "Trinca de Quatro — A Estabilidade",
    energia: "Energia de firmeza e segurança. Base sólida construída.",
    mensagem: "Os quatro cantos estão firmes. Sua vida está entrando numa fase de estabilidade que você construiu com esforço. Zé Pelintra reconhece sua luta.",
    conselho: "Mantenha a disciplina. Não relaxe agora que as coisas estão se ajeitando.",
  },
  "5-5-5": {
    titulo: "Trinca de Cinco — A Transformação",
    energia: "Energia de mudança radical. Nada será como antes.",
    mensagem: "Três cincos: a roda da fortuna gira com força! Zé Pelintra anuncia transformações profundas. Pode ser assustador, mas é necessário. O velho precisa morrer para o novo nascer.",
    conselho: "Não resista à mudança. Flua com ela. Quem nada contra a correnteza se afoga.",
    alerta: "Mudanças virão quer você queira ou não. Melhor se preparar.",
  },
  "6-6-6": {
    titulo: "Trinca de Seis — O Poder Absoluto",
    energia: "Energia máxima! Zé Pelintra em sua plenitude.",
    mensagem: "A combinação mais poderosa da dadomancia! Todos os caminhos estão abertos, todas as portas destrancadas. Zé Pelintra coloca sua cartola e diz: 'Hoje você é o rei da noite!'",
    conselho: "Use esse poder com sabedoria. Peça o que quiser, mas peça com respeito.",
    alerta: "Poder absoluto exige responsabilidade absoluta. Não abuse da sorte.",
  },

  // === PARES + 1 ===
  "1-1-2": {
    titulo: "Par de Ás com Dois",
    energia: "Recomeço com escolha à frente.",
    mensagem: "Você está recomeçando, mas logo terá que fazer uma escolha importante. Zé Pelintra diz para não ter pressa — a decisão certa virá naturalmente.",
    conselho: "Observe antes de agir. A resposta está nos detalhes.",
  },
  "1-1-3": {
    titulo: "Par de Ás com Três",
    energia: "Novo início com proteção espiritual.",
    mensagem: "Um recomeço abençoado. Seus guias estão preparando o terreno para você. Confie na intuição e siga em frente.",
    conselho: "Acenda uma vela branca e agradeça pela nova oportunidade.",
  },
  "1-1-4": {
    titulo: "Par de Ás com Quatro",
    energia: "Recomeço que trará estabilidade.",
    mensagem: "O novo começo que você tanto precisa vai trazer a segurança que faltava. Paciência — a base está sendo construída.",
    conselho: "Invista em algo sólido. Nada de aventuras arriscadas agora.",
  },
  "1-1-5": {
    titulo: "Par de Ás com Cinco",
    energia: "Recomeço através de mudança.",
    mensagem: "Para recomeçar, algo precisa mudar primeiro. Zé Pelintra pede coragem para romper com o que não serve mais.",
    conselho: "Corte os laços que te prendem ao passado.",
    alerta: "A mudança pode doer, mas a estagnação mata.",
  },
  "1-1-6": {
    titulo: "Par de Ás com Seis",
    energia: "Recomeço com sorte grande.",
    mensagem: "Que combinação! O novo começo vem acompanhado de muita sorte. Zé Pelintra abriu os caminhos — agora é com você.",
    conselho: "Aproveite essa janela de oportunidade. Ela não dura para sempre.",
  },
  "2-2-1": {
    titulo: "Par de Dois com Ás",
    energia: "Decisão que leva a um recomeço.",
    mensagem: "A escolha que você precisa fazer vai resultar num novo início. Não tenha medo de fechar uma porta — outra se abrirá.",
    conselho: "Decida com firmeza e não olhe para trás.",
  },
  "2-2-3": {
    titulo: "Par de Dois com Três",
    energia: "Escolha guiada espiritualmente.",
    mensagem: "Seus guias estão te mostrando o caminho certo. Preste atenção nos sinais, nos sonhos, nas coincidências. A resposta já está aí.",
    conselho: "Medite ou ore antes de tomar qualquer decisão importante.",
  },
  "2-2-4": {
    titulo: "Par de Dois com Quatro",
    energia: "Decisão que traz segurança.",
    mensagem: "A escolha certa vai te levar à estabilidade. Zé Pelintra diz: 'Escolha o caminho mais seguro desta vez.'",
    conselho: "Pense no longo prazo, não no prazer imediato.",
  },
  "2-2-5": {
    titulo: "Par de Dois com Cinco",
    energia: "Escolha que gera transformação.",
    mensagem: "Qualquer caminho que você escolher vai trazer mudanças profundas. Prepare-se para o inesperado.",
    conselho: "Esteja aberto ao novo. Flexibilidade é sobrevivência.",
    alerta: "Não escolher também é uma escolha — e geralmente a pior.",
  },
  "2-2-6": {
    titulo: "Par de Dois com Seis",
    energia: "Decisão abençoada pela sorte.",
    mensagem: "Não importa qual caminho escolha, a sorte está do seu lado. Zé Pelintra garante que ambas as opções têm potencial.",
    conselho: "Confie na sua intuição. Ela está afiada hoje.",
  },
  "3-3-1": {
    titulo: "Par de Três com Ás",
    energia: "Proteção para um novo começo.",
    mensagem: "Você está protegido para dar o primeiro passo. Seus guias formam um escudo ao seu redor. Vá sem medo.",
    conselho: "Comece aquilo que você tem adiado. O momento é agora.",
  },
  "3-3-2": {
    titulo: "Par de Três com Dois",
    energia: "Proteção na hora da escolha.",
    mensagem: "Não se preocupe — qualquer que seja sua decisão, você tem proteção espiritual. Os guias não vão te deixar errar feio.",
    conselho: "Confie mais em si mesmo. Você sabe mais do que pensa.",
  },
  "3-3-4": {
    titulo: "Par de Três com Quatro",
    energia: "Proteção e estabilidade juntas.",
    mensagem: "Momento de paz e segurança. Seus guias mantêm tudo em ordem. Aproveite essa calmaria para se fortalecer.",
    conselho: "Organize sua vida enquanto tudo está calmo. Prepare-se para o futuro.",
  },
  "3-3-5": {
    titulo: "Par de Três com Cinco",
    energia: "Proteção durante a mudança.",
    mensagem: "Mudanças estão vindo, mas você está protegido. Zé Pelintra segura sua mão enquanto você atravessa a ponte.",
    conselho: "Aceite a transformação com gratidão. É para o seu bem.",
  },
  "3-3-6": {
    titulo: "Par de Três com Seis",
    energia: "Proteção máxima com sorte.",
    mensagem: "Combinação excelente! Protegido e com sorte. Zé Pelintra diz que é hora de arriscar um pouco mais.",
    conselho: "Aposte naquele projeto, naquela ideia. O momento é favorável.",
  },
  "4-4-1": {
    titulo: "Par de Quatro com Ás",
    energia: "Estabilidade que permite recomeçar.",
    mensagem: "Sua base está firme o suficiente para você tentar algo novo. Use a segurança que construiu como trampolim.",
    conselho: "Não tenha medo de inovar. Você tem onde se apoiar se cair.",
  },
  "4-4-2": {
    titulo: "Par de Quatro com Dois",
    energia: "Estabilidade ameaçada por uma escolha.",
    mensagem: "Cuidado — uma decisão pode abalar sua estabilidade. Pense bem antes de mudar o que está funcionando.",
    conselho: "Se não está quebrado, não conserte. Priorize a segurança.",
    alerta: "Aventuras agora podem custar caro.",
  },
  "4-4-3": {
    titulo: "Par de Quatro com Três",
    energia: "Base sólida com proteção espiritual.",
    mensagem: "Tudo está no lugar. Vida estável, guias presentes. Momento de agradecer e manter o rumo.",
    conselho: "Gratidão atrai mais bênçãos. Agradeça pelo que tem.",
  },
  "4-4-5": {
    titulo: "Par de Quatro com Cinco",
    energia: "Estabilidade prestes a mudar.",
    mensagem: "A fase estável está chegando ao fim. Mudanças batem à porta. Não é ruim — é evolução.",
    conselho: "Prepare-se para o próximo nível. Cresça ou fique para trás.",
  },
  "4-4-6": {
    titulo: "Par de Quatro com Seis",
    energia: "Segurança com prosperidade.",
    mensagem: "Fase excelente para finanças e negócios. Estabilidade somada à sorte — receita de sucesso.",
    conselho: "Invista, negocie, expanda. O terreno é fértil.",
  },
  "5-5-1": {
    titulo: "Par de Cinco com Ás",
    energia: "Mudança que leva ao recomeço total.",
    mensagem: "Uma transformação radical te levará a começar do zero em alguma área da vida. Pode parecer perda, mas é libertação.",
    conselho: "Solte o que precisa ser solto. Mãos livres agarram melhor o novo.",
  },
  "5-5-2": {
    titulo: "Par de Cinco com Dois",
    energia: "Mudança com escolha crucial.",
    mensagem: "No meio da tempestade, uma decisão precisa ser tomada. Zé Pelintra diz: 'Não dá pra esperar a chuva passar — dance na chuva.'",
    conselho: "Aja agora, mesmo sem certeza total. A ação gera clareza.",
  },
  "5-5-3": {
    titulo: "Par de Cinco com Três",
    energia: "Transformação protegida.",
    mensagem: "As mudanças são intensas, mas você não está sozinho. Proteção espiritual forte durante a travessia.",
    conselho: "Confie no processo. Tudo tem um propósito maior.",
  },
  "5-5-4": {
    titulo: "Par de Cinco com Quatro",
    energia: "Mudança buscando nova estabilidade.",
    mensagem: "Depois da tempestade vem a bonança. As mudanças atuais te levarão a uma nova fase de segurança.",
    conselho: "Aguente firme. A recompensa está próxima.",
  },
  "5-5-6": {
    titulo: "Par de Cinco com Seis",
    energia: "Transformação abençoada.",
    mensagem: "Mudança com sorte! O que parecia ruim vai se revelar a melhor coisa que poderia acontecer.",
    conselho: "Abrace o caos. Dele nascerá sua maior vitória.",
  },
  "6-6-1": {
    titulo: "Par de Seis com Ás",
    energia: "Sorte grande para novos começos.",
    mensagem: "Momento perfeito para iniciar projetos, negócios, relacionamentos. A sorte está totalmente do seu lado.",
    conselho: "Não desperdice essa energia. Comece algo importante hoje.",
  },
  "6-6-2": {
    titulo: "Par de Seis com Dois",
    energia: "Sorte na escolha.",
    mensagem: "Você tem sorte para escolher certo. Confie no seu instinto — ele está calibrado.",
    conselho: "Siga o que seu coração diz. Hoje ele não erra.",
  },
  "6-6-3": {
    titulo: "Par de Seis com Três",
    energia: "Sorte com proteção divina.",
    mensagem: "Abençoado e com sorte. Zé Pelintra coloca a mão na sua cabeça e diz: 'Vai com fé que hoje é seu dia.'",
    conselho: "Peça o que quiser. As chances de conseguir são altíssimas.",
  },
  "6-6-4": {
    titulo: "Par de Seis com Quatro",
    energia: "Sorte que traz segurança.",
    mensagem: "A sorte atual vai consolidar sua estabilidade. Ganhos materiais e emocionais à vista.",
    conselho: "Guarde o que ganhar. Construa reservas para o futuro.",
  },
  "6-6-5": {
    titulo: "Par de Seis com Cinco",
    energia: "Sorte em meio à mudança.",
    mensagem: "Mesmo com tudo mudando ao redor, a sorte te acompanha. Surfar na onda da mudança com sucesso.",
    conselho: "Adapte-se rápido. A sorte favorece quem é ágil.",
  },

  // === SEQUÊNCIAS ===
  "1-2-3": {
    titulo: "Sequência Baixa — O Início da Jornada",
    energia: "Energia de começo, escolha e proteção.",
    mensagem: "Você está no início de algo importante. Os primeiros passos são os mais difíceis, mas Zé Pelintra garante que vale a pena.",
    conselho: "Comece devagar, mas comece. Cada passo conta.",
  },
  "2-3-4": {
    titulo: "Sequência Média-Baixa — Construindo",
    energia: "Decisão, proteção e estabilidade se formando.",
    mensagem: "Você está construindo algo sólido. A base está sendo montada com cuidado e proteção espiritual.",
    conselho: "Continue no ritmo. Consistência vence talento.",
  },
  "3-4-5": {
    titulo: "Sequência Central — A Travessia",
    energia: "Proteção, estabilidade e mudança convergem.",
    mensagem: "Momento de transição. O velho e o novo se encontram. Zé Pelintra te guia pela ponte entre duas fases da vida.",
    conselho: "Mantenha a fé durante a travessia. Já passou do meio do caminho.",
  },
  "4-5-6": {
    titulo: "Sequência Alta — A Ascensão",
    energia: "Estabilidade, transformação e sorte em crescendo.",
    mensagem: "Combinação de ascensão! Você está subindo, evoluindo, crescendo. Zé Pelintra diz: 'O topo está perto. Não pare agora.'",
    conselho: "Dê o último empurrão. A vitória está ao alcance das mãos.",
  },
  "1-3-5": {
    titulo: "Ímpares — Caminhos Espirituais",
    energia: "Energia espiritual intensa. Conexão com o invisível.",
    mensagem: "Os números ímpares falam de espiritualidade pura. Seus guias querem se comunicar. Preste atenção em sonhos e sinais.",
    conselho: "Dedique tempo à oração, meditação ou ao seu ritual espiritual.",
  },
  "2-4-6": {
    titulo: "Pares — Caminhos Materiais",
    energia: "Energia material e prática. Foco no concreto.",
    mensagem: "Os números pares falam de coisas terrenas: dinheiro, trabalho, saúde, casa. Zé Pelintra orienta: 'Cuide do que é real.'",
    conselho: "Resolva pendências práticas. Pague dívidas, organize documentos, cuide da saúde.",
  },

  // === COMBINAÇÕES DIVERSAS ===
  "1-2-4": {
    titulo: "Começo com Decisão Segura",
    energia: "Novo caminho com escolha que traz segurança.",
    mensagem: "Você vai começar algo novo e logo precisará escolher. Escolha o caminho mais seguro desta vez.",
    conselho: "Priorize estabilidade sobre aventura neste momento.",
  },
  "1-2-5": {
    titulo: "Recomeço com Escolha Transformadora",
    energia: "Início novo com decisão que muda tudo.",
    mensagem: "O recomeço depende de uma escolha corajosa. Zé Pelintra diz: 'Quem não arrisca, não petisca.'",
    conselho: "Seja ousado, mas inteligente.",
  },
  "1-2-6": {
    titulo: "Novo Caminho com Sorte na Escolha",
    energia: "Começo abençoado com decisão favorável.",
    mensagem: "Qualquer direção que tomar será boa. A sorte acompanha seu novo começo.",
    conselho: "Siga em frente com confiança. O universo conspira a seu favor.",
  },
  "1-3-4": {
    titulo: "Recomeço Protegido e Seguro",
    energia: "Novo início com guarda espiritual e base firme.",
    mensagem: "Proteção e estabilidade amparam seu recomeço. Vá tranquilo.",
    conselho: "Construa com calma. Não há pressa quando se tem proteção.",
  },
  "1-3-6": {
    titulo: "Novo Começo com Bênção e Sorte",
    energia: "Início protegido e afortunado.",
    mensagem: "Zé Pelintra abençoa seu novo caminho com proteção e sorte. Combinação rara e poderosa!",
    conselho: "Inicie aquele projeto dos sonhos. Agora é a hora.",
  },
  "1-4-5": {
    titulo: "Recomeço Estável em Transformação",
    energia: "Base firme enquanto tudo muda.",
    mensagem: "Você tem uma âncora enquanto navega em águas turbulentas. Use sua estabilidade como força.",
    conselho: "Mude o que precisa, mas mantenha seus valores.",
  },
  "1-4-6": {
    titulo: "Novo Início com Base e Sorte",
    energia: "Recomeço sólido e afortunado.",
    mensagem: "Combinação excelente para negócios e investimentos. Base sólida + sorte = sucesso.",
    conselho: "Empreenda. O momento é de ouro.",
  },
  "1-5-6": {
    titulo: "Recomeço com Mudança e Sorte",
    energia: "Transformação afortunada marca o novo início.",
    mensagem: "Das cinzas nasce a fênix. Sua transformação trará muita sorte e oportunidades.",
    conselho: "Não tema o desconhecido. Ele traz presentes.",
  },
  "2-3-5": {
    titulo: "Escolha Protegida com Mudança",
    energia: "Decisão guiada em tempos de transformação.",
    mensagem: "Seus guias te mostram o caminho certo em meio à mudança. Siga os sinais.",
    conselho: "Confie na intuição. Ela é a voz dos seus guias.",
  },
  "2-3-6": {
    titulo: "Escolha Protegida com Sorte",
    energia: "Decisão abençoada e afortunada.",
    mensagem: "Escolha com o coração — ele está protegido e com sorte. Zé Pelintra guia sua mão.",
    conselho: "Não pense demais. A primeira impressão é a que vale hoje.",
  },
  "2-4-5": {
    titulo: "Decisão Estável em Transformação",
    energia: "Escolha entre segurança e mudança.",
    mensagem: "Você precisa decidir: manter a segurança ou abraçar a mudança? Zé Pelintra diz que às vezes é preciso arriscar para crescer.",
    conselho: "Avalie os riscos, mas não deixe o medo te paralisar.",
  },
  "2-5-6": {
    titulo: "Escolha com Mudança e Sorte",
    energia: "Decisão em meio a mudanças afortunadas.",
    mensagem: "A mudança traz oportunidades. Escolha a que brilha mais — é ela que Zé Pelintra aponta.",
    conselho: "Siga a oportunidade que te dá frio na barriga. É essa.",
  },
  "3-4-6": {
    titulo: "Proteção, Estabilidade e Sorte",
    energia: "Tríade poderosa de segurança total.",
    mensagem: "Protegido, estável e com sorte. Momento excepcional! Zé Pelintra sorri: 'Pode ir tranquilo, meu filho.'",
    conselho: "Viva plenamente. Poucos momentos são tão favoráveis quanto este.",
  },
  "3-5-6": {
    titulo: "Proteção na Mudança com Sorte",
    energia: "Transformação protegida e afortunada.",
    mensagem: "A mudança vem forte, mas você está protegido e com sorte. Tudo se alinhará ao seu favor.",
    conselho: "Aceite as mudanças de braços abertos. Elas trazem presentes.",
  },
  "1-6-6": {
    titulo: "Recomeço com Dupla Sorte",
    energia: "Início novo com sorte dobrada.",
    mensagem: "Zé Pelintra dobra a aposta no seu recomeço! Sorte em dobro para quem tem coragem de começar de novo.",
    conselho: "Não olhe para trás. O melhor está à sua frente.",
  },
};

export function getDiceInterpretation(d1: number, d2: number, d3: number): DiceInterpretation {
  const key = makeKey(d1, d2, d3);

  if (combos[key]) {
    return combos[key];
  }

  // Fallback based on sum
  const sum = d1 + d2 + d3;
  const fallbacks: Record<number, DiceInterpretation> = {
    3: { titulo: "Mínimo — Cautela Total", energia: "Energia baixa.", mensagem: "Momento de extrema cautela. Zé Pelintra pede paciência — não é hora de agir, mas de observar.", conselho: "Espere. O tempo certo chegará." },
    4: { titulo: "Caminhos Travados", energia: "Energia bloqueada.", mensagem: "Há algo oculto impedindo seu avanço. Faça uma limpeza espiritual.", conselho: "Banho de ervas e oração." },
    5: { titulo: "Mudança Lenta", energia: "Energia gradual.", mensagem: "Confie no tempo — as coisas vão se ajeitar aos poucos.", conselho: "Tenha paciência e fé." },
    6: { titulo: "Equilíbrio Frágil", energia: "Energia instável.", mensagem: "Cuide das suas relações e evite conflitos desnecessários.", conselho: "Diplomacia acima de tudo." },
    7: { titulo: "Sorte Moderada", energia: "Energia neutra tendendo ao positivo.", mensagem: "O jogo está aberto, mas depende de você jogar certo.", conselho: "Estratégia vence força bruta." },
    8: { titulo: "Oportunidades à Vista", energia: "Energia crescente.", mensagem: "Fique atento aos sinais — uma porta vai se abrir.", conselho: "Prepare-se para quando a oportunidade bater." },
    9: { titulo: "Prosperidade", energia: "Energia de abundância.", mensagem: "O caminho financeiro está favorável. Aproveite com sabedoria.", conselho: "Invista no que conhece." },
    10: { titulo: "Vitória", energia: "Energia vitoriosa.", mensagem: "Zé Pelintra abençoa seus passos. Vá em frente sem medo.", conselho: "Ação decisiva agora!" },
    11: { titulo: "Proteção Espiritual", energia: "Energia de guarda.", mensagem: "Seus guias estão ao seu lado. Momento de força e fé.", conselho: "Agradeça e peça orientação." },
    12: { titulo: "Conquista", energia: "Energia de realização.", mensagem: "Os dados caíram a seu favor. Celebre, mas mantenha a humildade.", conselho: "Compartilhe sua vitória com quem te ajudou." },
    13: { titulo: "Atenção Redobrada", energia: "Energia de alerta.", mensagem: "Cuidado com excesso de confiança. A sorte pode virar.", conselho: "Prudência é a mãe da boa sorte." },
    14: { titulo: "Transformação Profunda", energia: "Energia de renascimento.", mensagem: "Algo antigo precisa morrer para o novo nascer.", conselho: "Desapegue do que já cumpriu seu papel." },
    15: { titulo: "Caminho de Luz", energia: "Energia luminosa.", mensagem: "Zé Pelintra ilumina sua jornada. Siga com coragem.", conselho: "Não desvie do caminho, mesmo que pareça difícil." },
    16: { titulo: "Abundância", energia: "Energia farta.", mensagem: "Momento excelente para negócios e empreendimentos.", conselho: "Plante agora para colher em dobro." },
    17: { titulo: "Proteção Máxima", energia: "Energia de escudo.", mensagem: "Zé Pelintra está de guarda. Nenhum mal chegará até você.", conselho: "Viva sem medo. Você está blindado." },
    18: { titulo: "Realização Total", energia: "Energia plena.", mensagem: "O melhor resultado possível. Todos os caminhos abertos!", conselho: "Celebre e agradeça. Você mereceu." },
  };

  return fallbacks[sum] || {
    titulo: "Mensagem de Zé Pelintra",
    energia: "Energia neutra.",
    mensagem: "Consulte Zé Pelintra para orientação adicional.",
    conselho: "Mantenha a fé e siga em frente.",
  };
}
