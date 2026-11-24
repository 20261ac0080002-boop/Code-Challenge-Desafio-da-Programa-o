export type TopicIconName =
  | 'logic'
  | 'algorithm'
  | 'thinking'
  | 'variable'
  | 'conditional'
  | 'loop'
  | 'array'
  | 'html'
  | 'css'
  | 'javascript';

export interface QuizQuestion {
  id: number;
  topic: string;
  icon: TopicIconName;
  question: string;
  codeSnippet?: string;
  options: [string, string, string, string];
  correctIndex: 0 | 1 | 2 | 3;
  explanation: string;
}

export const POINTS_PER_QUESTION = 10;

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    topic: 'Lógica de Programação',
    icon: 'logic',
    question:
      'Na lógica de programação, qual é o comportamento do operador lógico E (AND / &&) ao avaliar duas condições A e B?',
    options: [
      'Retorna verdadeiro apenas quando A e B são verdadeiros.',
      'Retorna verdadeiro se pelo menos uma das condições for verdadeira.',
      'Inverte o resultado da condição A e ignora a condição B.',
      'Retorna falso somente quando A e B são falsos ao mesmo tempo.',
    ],
    correctIndex: 0,
    explanation:
      'O operador lógico E (&&) exige que todas as expressões envolvidas sejam verdadeiras para retornar verdadeiro.',
  },
  {
    id: 2,
    topic: 'Algoritmos',
    icon: 'algorithm',
    question: 'Qual opção descreve corretamente o conceito de algoritmo na computação?',
    options: [
      'Um componente físico da memória RAM responsável por salvar arquivos.',
      'Uma sequência finita e ordenada de instruções para resolver um problema.',
      'Um estilo visual usado para colorir páginas web no navegador.',
      'Um erro inesperado que interrompe a execução de um programa.',
    ],
    correctIndex: 1,
    explanation:
      'Um algoritmo é um passo a passo lógico, finito e bem definido que transforma entradas em uma saída esperada.',
  },
  {
    id: 3,
    topic: 'Pensamento Computacional',
    icon: 'thinking',
    question: 'No pensamento computacional, o pilar chamado Decomposição consiste em:',
    options: [
      'Apagar linhas de código antigas para reduzir o tamanho do arquivo.',
      'Traduzir um programa diretamente para linguagem binária.',
      'Dividir um problema complexo em partes menores e mais fáceis de resolver.',
      'Executar o mesmo bloco de código infinitas vezes sem condição de parada.',
    ],
    correctIndex: 2,
    explanation:
      'A decomposição quebra um desafio complexo em subproblemas menores e independentes, facilitando o raciocínio e a solução.',
  },
  {
    id: 4,
    topic: 'Variáveis',
    icon: 'variable',
    question:
      'Em JavaScript moderno, qual é a principal diferença ao declarar uma variável com const em relação a let?',
    options: [
      'Variáveis declaradas com const armazenam exclusivamente números inteiros.',
      'Variáveis declaradas com let só podem ser usadas dentro de arquivos CSS.',
      'Variáveis declaradas com const não permitem reatribuir um novo valor à referência.',
      'Variáveis declaradas com const são apagadas automaticamente após a primeira leitura.',
    ],
    correctIndex: 2,
    explanation:
      'O identificador criado com const mantém sua vinculação fixa e não pode receber outra atribuição direta, ao contrário de let.',
  },
  {
    id: 5,
    topic: 'Estruturas Condicionais (if e else)',
    icon: 'conditional',
    question: 'Analise o trecho em JavaScript abaixo. Qual mensagem será exibida no console?',
    codeSnippet: `const nota = 75;\nif (nota >= 70) {\n  console.log("Aprovado");\n} else {\n  console.log("Recuperação");\n}`,
    options: ['Recuperação', 'Aprovado', '75', 'undefined'],
    correctIndex: 1,
    explanation:
      'Como nota vale 75 e a condição 75 >= 70 é verdadeira, apenas o bloco do if é executado, exibindo "Aprovado".',
  },
  {
    id: 6,
    topic: 'Laços de Repetição (for e while)',
    icon: 'loop',
    question: 'Quantas vezes a palavra "Código" será impressa durante a execução deste laço for?',
    codeSnippet: `for (let i = 0; i < 4; i++) {\n  console.log("Código");\n}`,
    options: ['3 vezes', '4 vezes', '5 vezes', 'Infinitas vezes'],
    correctIndex: 1,
    explanation:
      'A variável i inicia em 0 e o laço executa enquanto i < 4, passando pelos valores 0, 1, 2 e 3: exatamente 4 repetições.',
  },
  {
    id: 7,
    topic: 'Arrays e Vetores',
    icon: 'array',
    question: 'Considerando o vetor abaixo, qual expressão acessa o elemento "JavaScript"?',
    codeSnippet: `const tecnologias = ["HTML", "CSS", "JavaScript", "Python"];`,
    options: [
      'tecnologias[1]',
      'tecnologias[2]',
      'tecnologias[3]',
      'tecnologias.first()',
    ],
    correctIndex: 1,
    explanation:
      'Os índices de um array começam em 0. Assim: índice 0 é "HTML", índice 1 é "CSS" e índice 2 é "JavaScript".',
  },
  {
    id: 8,
    topic: 'HTML',
    icon: 'html',
    question:
      'Qual tag HTML semântica é a mais indicada para envolver o conteúdo principal e único de uma página?',
    options: ['<div>', '<br>', '<main>', '<span>'],
    correctIndex: 2,
    explanation:
      'A tag semântica <main> indica aos navegadores e leitores de tela onde está o conteúdo central da página.',
  },
  {
    id: 9,
    topic: 'CSS',
    icon: 'css',
    question:
      'No CSS, qual propriedade define o espaçamento interno entre o conteúdo de um elemento e a sua borda?',
    options: ['margin', 'padding', 'border-radius', 'gap'],
    correctIndex: 1,
    explanation:
      'A propriedade padding controla o espaço interno entre o conteúdo e a borda, enquanto margin define o espaço externo.',
  },
  {
    id: 10,
    topic: 'JavaScript',
    icon: 'javascript',
    question:
      'Qual método de array em JavaScript cria um novo array contendo apenas os itens que satisfazem uma condição?',
    options: ['push()', 'pop()', 'filter()', 'join()'],
    correctIndex: 2,
    explanation:
      'O método filter() percorre cada elemento e retorna um novo array somente com os itens para os quais a função retorna true.',
  },
];
