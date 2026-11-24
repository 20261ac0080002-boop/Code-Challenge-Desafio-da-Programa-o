import {
  ArrowRight,
  Binary,
  Braces,
  CheckCircle2,
  Code2,
  Cpu,
  GitBranch,
  Layers,
  Palette,
  Repeat,
  Terminal,
  Trophy,
  Workflow,
  XCircle,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect } from 'react';
import {
  POINTS_PER_QUESTION,
  QuizQuestion,
  TopicIconName,
} from '../data/questions';

interface QuizScreenProps {
  question: QuizQuestion;
  currentIndex: number;
  totalQuestions: number;
  score: number;
  selectedOption: number | null;
  onSelectOption: (optionIndex: number) => void;
  onNext: () => void;
}

const OPTION_LETTERS = ['A', 'B', 'C', 'D'] as const;

function TopicIcon({ icon }: { icon: TopicIconName }) {
  const iconClass = 'h-4 w-4 shrink-0 text-sky-300';
  switch (icon) {
    case 'logic':
      return <Binary className={iconClass} aria-hidden="true" />;
    case 'algorithm':
      return <Workflow className={iconClass} aria-hidden="true" />;
    case 'thinking':
      return <Cpu className={iconClass} aria-hidden="true" />;
    case 'variable':
      return <Terminal className={iconClass} aria-hidden="true" />;
    case 'conditional':
      return <GitBranch className={iconClass} aria-hidden="true" />;
    case 'loop':
      return <Repeat className={iconClass} aria-hidden="true" />;
    case 'array':
      return <Layers className={iconClass} aria-hidden="true" />;
    case 'html':
      return <Code2 className={iconClass} aria-hidden="true" />;
    case 'css':
      return <Palette className={iconClass} aria-hidden="true" />;
    case 'javascript':
      return <Braces className={iconClass} aria-hidden="true" />;
  }
}

export function QuizScreen({
  question,
  currentIndex,
  totalQuestions,
  score,
  selectedOption,
  onSelectOption,
  onNext,
}: QuizScreenProps) {
  const hasAnswered = selectedOption !== null;
  const isCorrect = selectedOption === question.correctIndex;
  const isLastQuestion = currentIndex === totalQuestions - 1;
  const progressPercent = ((currentIndex + (hasAnswered ? 1 : 0)) / totalQuestions) * 100;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      if (!hasAnswered) {
        const key = e.key.toUpperCase();
        if (key === '1' || key === 'A') onSelectOption(0);
        else if (key === '2' || key === 'B') onSelectOption(1);
        else if (key === '3' || key === 'C') onSelectOption(2);
        else if (key === '4' || key === 'D') onSelectOption(3);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        onNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [hasAnswered, onSelectOption, onNext]);

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-3xl mx-auto"
    >
      {/* Top HUD: Progress & Score */}
      <div className="mb-5 relative overflow-hidden rounded-2xl border border-sky-400/20 bg-gradient-to-b from-[#0A1733]/95 to-[#061026]/95 px-5 py-4 backdrop-blur-md shadow-[0_8px_30px_rgba(3,10,30,0.65)]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-400/45 to-transparent"
        />
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 text-sm sm:text-base font-semibold text-white tabular-nums">
            <span className="text-sky-300">
              Pergunta {currentIndex + 1} de {totalQuestions}
            </span>
            <span aria-hidden="true" className="text-blue-400/40">
              ·
            </span>
            <span className="text-blue-100/80 font-medium text-xs sm:text-sm">
              {question.topic}
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm sm:text-base font-bold text-white tabular-nums">
            <Trophy className="h-4 w-4 text-sky-300" aria-hidden="true" />
            <span>Pontuação:</span>
            <motion.span
              key={score}
              initial={{ scale: 1.25, color: '#7dd3fc' }}
              animate={{ scale: 1, color: '#38bdf8' }}
              transition={{ duration: 0.25 }}
              className="text-sky-400"
            >
              {score} pts
            </motion.span>
          </div>
        </div>

        {/* Luminous blue progress bar */}
        <div
          className="mt-3.5 h-2.5 w-full overflow-hidden rounded-full bg-[#030918] border border-blue-500/25"
          role="progressbar"
          aria-valuenow={Math.round(progressPercent)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Progresso do quiz: pergunta ${currentIndex + 1} de ${totalQuestions}`}
        >
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-blue-600 via-blue-400 to-sky-300 shadow-[0_0_14px_rgba(56,189,248,0.65)]"
            initial={false}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
      </div>

      {/* Question Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={question.id}
          initial={{ opacity: 0, x: 14 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -14 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-3xl border border-sky-400/20 bg-gradient-to-b from-[#0A1733]/95 via-[#071128]/95 to-[#040B1B]/95 p-6 sm:p-8 shadow-[0_20px_60px_rgba(3,10,30,0.8),0_0_40px_rgba(37,99,235,0.12)] backdrop-blur-xl"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-300/55 to-transparent"
          />

          {/* Clean topic header without characters or pill boxes */}
          <div className="mb-4 flex items-center gap-2.5 text-xs sm:text-sm font-medium text-sky-300">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl border border-sky-400/25 bg-blue-600/20">
              <TopicIcon icon={question.icon} />
            </span>
            <span className="font-semibold text-sky-200">{question.topic}</span>
            <span aria-hidden="true" className="text-blue-400/40">
              ·
            </span>
            <span className="text-slate-400 tabular-nums">
              Vale {POINTS_PER_QUESTION} pontos
            </span>
          </div>

          <h2 className="font-display text-xl sm:text-2xl font-bold text-white leading-snug">
            {question.question}
          </h2>

          {/* Optional Code Block */}
          {question.codeSnippet && (
            <div className="mt-5 overflow-x-auto rounded-2xl border border-blue-400/20 bg-[#020817] p-4 sm:p-5 shadow-inner">
              <pre className="font-mono text-xs sm:text-sm leading-relaxed text-sky-100">
                <code>{question.codeSnippet}</code>
              </pre>
            </div>
          )}

          {/* 4 Options */}
          <div className="mt-6 grid grid-cols-1 gap-3.5" role="group" aria-label="Alternativas">
            {question.options.map((option, index) => {
              const isSelected = selectedOption === index;
              const isOptionCorrect = index === question.correctIndex;

              let buttonClasses =
                'border-blue-400/20 bg-[#050E22]/90 text-slate-200 hover:border-sky-400/65 hover:bg-[#0D1E42] hover:text-white hover:shadow-[0_0_20px_rgba(56,189,248,0.14)] cursor-pointer';
              let badgeClasses =
                'border-blue-400/25 bg-[#08142E] text-sky-200 group-hover:border-sky-300/70 group-hover:bg-blue-600/30 group-hover:text-white';
              let animationClass = '';

              if (hasAnswered) {
                if (isOptionCorrect) {
                  buttonClasses =
                    'border-emerald-400/80 bg-emerald-950/45 text-emerald-50 shadow-[0_0_24px_rgba(16,185,129,0.24)] cursor-default';
                  badgeClasses =
                    'border-emerald-400/75 bg-emerald-500/20 text-emerald-300';
                  if (isSelected) {
                    animationClass = 'animate-quiz-pop';
                  }
                } else if (isSelected && !isOptionCorrect) {
                  buttonClasses =
                    'border-rose-500/80 bg-rose-950/45 text-rose-50 shadow-[0_0_24px_rgba(244,63,94,0.24)] cursor-default';
                  badgeClasses = 'border-rose-400/75 bg-rose-500/20 text-rose-300';
                  animationClass = 'animate-quiz-shake';
                } else {
                  buttonClasses =
                    'border-slate-800/60 bg-[#040A18]/60 text-slate-500 opacity-60 cursor-default';
                  badgeClasses = 'border-slate-800 bg-slate-900/60 text-slate-500';
                }
              }

              return (
                <button
                  key={option}
                  type="button"
                  disabled={hasAnswered}
                  onClick={() => onSelectOption(index)}
                  aria-pressed={isSelected}
                  className={`group flex min-h-[60px] w-full items-center justify-between gap-4 rounded-2xl border px-4 py-3.5 text-left transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 ${buttonClasses} ${animationClass}`}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border font-mono text-sm font-bold transition-colors ${badgeClasses}`}
                    >
                      {OPTION_LETTERS[index]}
                    </span>
                    <span className="text-sm sm:text-base font-medium leading-snug break-words">
                      {option}
                    </span>
                  </div>

                  {hasAnswered && isOptionCorrect && (
                    <CheckCircle2
                      className="h-5 w-5 shrink-0 text-emerald-400"
                      aria-label="Alternativa correta"
                    />
                  )}
                  {hasAnswered && isSelected && !isOptionCorrect && (
                    <XCircle
                      className="h-5 w-5 shrink-0 text-rose-400"
                      aria-label="Alternativa incorreta"
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Feedback Message & Next Button */}
          <AnimatePresence>
            {hasAnswered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="mt-6 space-y-5"
              >
                <div
                  role="status"
                  aria-live="polite"
                  className={`rounded-2xl border p-4 sm:p-5 ${
                    isCorrect
                      ? 'border-emerald-400/50 bg-emerald-950/35 text-emerald-100'
                      : 'border-rose-400/50 bg-rose-950/35 text-rose-100'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {isCorrect ? (
                      <CheckCircle2
                        className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400"
                        aria-hidden="true"
                      />
                    ) : (
                      <XCircle
                        className="mt-0.5 h-5 w-5 shrink-0 text-rose-400"
                        aria-hidden="true"
                      />
                    )}
                    <div>
                      <p className="text-sm sm:text-base font-bold">
                        {isCorrect
                          ? `Resposta correta! +${POINTS_PER_QUESTION} pontos`
                          : `Resposta incorreta! A alternativa correta é a ${OPTION_LETTERS[question.correctIndex]}.`}
                      </p>
                      <p className="mt-1.5 text-xs sm:text-sm text-slate-200/90 leading-relaxed">
                        {question.explanation}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <motion.button
                    type="button"
                    onClick={onNext}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                    className="inline-flex w-full sm:w-auto items-center justify-center gap-2.5 rounded-2xl border border-sky-300/35 bg-gradient-to-r from-blue-700 via-blue-600 to-sky-500 px-7 py-3.5 text-sm sm:text-base font-bold text-white shadow-[0_0_24px_rgba(37,99,235,0.45)] hover:shadow-[0_0_34px_rgba(56,189,248,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 cursor-pointer whitespace-nowrap shrink-0"
                  >
                    <span>
                      {isLastQuestion ? 'VER RESULTADO FINAL' : 'PRÓXIMA PERGUNTA'}
                    </span>
                    <ArrowRight className="h-5 w-5" aria-hidden="true" />
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>
    </motion.section>
  );
}
