import { Braces, Code2, Cpu, Layers, Play, Terminal } from 'lucide-react';
import { motion } from 'motion/react';
import { POINTS_PER_QUESTION, QUIZ_QUESTIONS } from '../data/questions';

interface StartScreenProps {
  onStart: () => void;
}

const TOPICS_LIST = [
  'Lógica de Programação',
  'Algoritmos',
  'Pensamento Computacional',
  'Variáveis',
  'Condicionais (if / else)',
  'Laços (for / while)',
  'Arrays e Vetores',
  'HTML, CSS e JavaScript',
];

export function StartScreen({ onStart }: StartScreenProps) {
  const totalQuestions = QUIZ_QUESTIONS.length;
  const maxPoints = totalQuestions * POINTS_PER_QUESTION;

  return (
    <motion.section
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-4xl mx-auto"
    >
      <div className="relative overflow-hidden rounded-3xl border border-sky-400/20 bg-gradient-to-b from-[#0A1733]/95 via-[#071128]/95 to-[#040B1B]/95 p-6 sm:p-10 md:p-12 shadow-[0_24px_80px_rgba(3,10,30,0.85),0_0_50px_rgba(37,99,235,0.16)] backdrop-blur-xl">
        {/* Specular top edge highlight */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-300/60 to-transparent"
        />

        {/* Ambient blue radial highlights inside card */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-28 left-1/2 h-64 w-[28rem] -translate-x-1/2 rounded-full bg-blue-500/18 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-sky-400/12 blur-3xl"
        />

        <div className="relative z-10 flex flex-col items-center text-center">
          {/* Luminous Blue Tech Emblem */}
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-sky-300/35 bg-gradient-to-br from-blue-600/30 via-blue-800/30 to-sky-400/20 shadow-[0_0_32px_rgba(56,189,248,0.22)]">
            <Terminal className="h-8 w-8 text-sky-300" aria-hidden="true" />
          </div>

          <h1
            className="font-display text-3xl sm:text-5xl md:text-[3.35rem] font-extrabold tracking-tight text-white leading-[1.08]"
            style={{ textWrap: 'balance' }}
          >
            DESAFIO DA{' '}
            <span className="bg-gradient-to-r from-sky-200 via-sky-400 to-blue-500 bg-clip-text text-transparent">
              PROGRAMAÇÃO
            </span>
          </h1>

          <p className="mt-4 text-lg sm:text-xl font-medium text-sky-200/95 max-w-2xl">
            Você domina a lógica da programação?
          </p>

          <p className="mt-4 text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
            Teste seus conhecimentos em um quiz interativo com{' '}
            <strong className="text-white font-semibold">{totalQuestions} perguntas</strong>{' '}
            sobre fundamentos de desenvolvimento e pensamento computacional. Cada resposta
            correta vale{' '}
            <strong className="text-sky-300 font-semibold">
              {POINTS_PER_QUESTION} pontos
            </strong>
            , podendo chegar a{' '}
            <strong className="text-blue-300 font-semibold">{maxPoints} pontos</strong>{' '}
            no placar final.
          </p>

          {/* Primary CTA */}
          <div className="mt-8 w-full sm:w-auto">
            <motion.button
              type="button"
              onClick={onStart}
              whileHover={{ scale: 1.025, y: -1 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
              className="group relative inline-flex w-full sm:w-auto min-w-[260px] items-center justify-center gap-3 rounded-2xl border border-sky-300/35 bg-gradient-to-r from-blue-700 via-blue-600 to-sky-500 px-8 py-4 text-base sm:text-lg font-bold tracking-wide text-white shadow-[0_0_32px_rgba(37,99,235,0.5)] hover:shadow-[0_0_44px_rgba(56,189,248,0.55)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#071128] cursor-pointer whitespace-nowrap shrink-0"
            >
              <Play
                className="h-5 w-5 fill-current text-sky-100 transition-transform duration-150 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
              <span>COMEÇAR JOGO</span>
            </motion.button>
          </div>

          {/* Hairline blue divider */}
          <div className="my-8 h-px w-full bg-gradient-to-r from-transparent via-sky-400/25 to-transparent" />

          {/* 3-card overview in layered sapphire tones */}
          <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-3 text-left">
            <div className="flex items-start gap-3.5 rounded-2xl border border-blue-400/15 bg-[#040B1B]/80 p-4 transition-colors hover:border-sky-400/30">
              <Cpu className="mt-0.5 h-5 w-5 shrink-0 text-sky-400" aria-hidden="true" />
              <div>
                <p className="text-sm font-semibold text-white">10 Perguntas</p>
                <p className="mt-1 text-xs text-slate-400 leading-relaxed">
                  Questões práticas e conceituais com explicação imediata.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 rounded-2xl border border-blue-400/15 bg-[#040B1B]/80 p-4 transition-colors hover:border-sky-400/30">
              <Braces className="mt-0.5 h-5 w-5 shrink-0 text-blue-400" aria-hidden="true" />
              <div>
                <p className="text-sm font-semibold text-white tabular-nums">
                  10 Pontos por Acerto
                </p>
                <p className="mt-1 text-xs text-slate-400 leading-relaxed">
                  Acompanhe seu progresso e pontuação atualizada a cada etapa.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 rounded-2xl border border-blue-400/15 bg-[#040B1B]/80 p-4 transition-colors hover:border-sky-400/30">
              <Layers className="mt-0.5 h-5 w-5 shrink-0 text-cyan-300" aria-hidden="true" />
              <div>
                <p className="text-sm font-semibold text-white">Trilha Completa</p>
                <p className="mt-1 text-xs text-slate-400 leading-relaxed">
                  Lógica, algoritmos, estruturas de controle, HTML, CSS e JS.
                </p>
              </div>
            </div>
          </div>

          {/* Quiet unboxed topic list */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 text-xs text-slate-400">
            <span className="inline-flex items-center gap-1.5 text-sky-200 font-medium">
              <Code2 className="h-3.5 w-3.5 text-sky-400" aria-hidden="true" />
              Temas abordados:
            </span>
            {TOPICS_LIST.map((topic, idx) => (
              <span key={topic} className="inline-flex items-center gap-3">
                <span>{topic}</span>
                {idx < TOPICS_LIST.length - 1 && (
                  <span aria-hidden="true" className="text-blue-500/60">
                    ·
                  </span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
