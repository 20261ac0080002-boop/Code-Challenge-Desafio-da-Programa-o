import {
  Award,
  CheckCircle2,
  RotateCcw,
  Trophy,
  XCircle,
} from 'lucide-react';
import { motion } from 'motion/react';
import { POINTS_PER_QUESTION, QuizQuestion } from '../data/questions';

export interface AnswerRecord {
  questionId: number;
  topic: string;
  selectedOption: number;
  correctIndex: number;
  isCorrect: boolean;
}

interface ResultScreenProps {
  score: number;
  totalQuestions: number;
  answers: AnswerRecord[];
  questions: QuizQuestion[];
  onRestart: () => void;
  onBackToStart: () => void;
}

function getPerformanceFeedback(score: number, maxScore: number) {
  const ratio = score / maxScore;
  if (ratio >= 0.9) {
    return {
      title: 'Excelente desempenho!',
      message:
        'Você domina a lógica e os fundamentos da programação com precisão.',
      accentClass: 'text-sky-300',
    };
  }
  if (ratio >= 0.7) {
    return {
      title: 'Muito bom!',
      message:
        'Você construiu uma base sólida em programação e pensamento computacional. Continue avançando!',
      accentClass: 'text-blue-200',
    };
  }
  if (ratio >= 0.5) {
    return {
      title: 'Bom progresso!',
      message:
        'Você já compreende conceitos importantes, mas vale revisar alguns detalhes de sintaxe e lógica.',
      accentClass: 'text-sky-200',
    };
  }
  return {
    title: 'Continue praticando!',
    message:
      'Todo programador evolui com prática constante. Revise os tópicos abaixo e tente novamente!',
    accentClass: 'text-blue-200',
  };
}

export function ResultScreen({
  score,
  totalQuestions,
  answers,
  questions,
  onRestart,
  onBackToStart,
}: ResultScreenProps) {
  const maxScore = totalQuestions * POINTS_PER_QUESTION;
  const correctCount = answers.filter((a) => a.isCorrect).length;
  const wrongCount = totalQuestions - correctCount;
  const accuracyPercent = Math.round((correctCount / totalQuestions) * 100);
  const feedback = getPerformanceFeedback(score, maxScore);

  return (
    <motion.section
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-4xl mx-auto"
    >
      <div className="relative overflow-hidden rounded-3xl border border-sky-400/20 bg-gradient-to-b from-[#0A1733]/95 via-[#071128]/95 to-[#040B1B]/95 p-6 sm:p-10 shadow-[0_24px_80px_rgba(3,10,30,0.85),0_0_50px_rgba(37,99,235,0.16)] backdrop-blur-xl">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-300/60 to-transparent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 left-1/2 h-56 w-96 -translate-x-1/2 rounded-full bg-gradient-to-r from-blue-600/22 to-sky-400/20 blur-3xl"
        />

        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-sky-300/35 bg-gradient-to-br from-blue-600/30 via-blue-800/30 to-sky-400/20 shadow-[0_0_32px_rgba(56,189,248,0.24)]">
            <Trophy className="h-8 w-8 text-sky-300" aria-hidden="true" />
          </div>

          <p className="text-sm font-semibold text-sky-300">
            Desafio Concluído
          </p>

          <h2 className="mt-1.5 font-display text-3xl sm:text-4xl font-extrabold text-white">
            {feedback.title}
          </h2>

          {/* Final Score Readout */}
          <div className="mt-5 flex items-baseline justify-center gap-2 font-display tabular-nums">
            <span className="text-5xl sm:text-6xl font-extrabold bg-gradient-to-r from-sky-200 via-sky-400 to-blue-500 bg-clip-text text-transparent">
              {score}
            </span>
            <span className="text-xl sm:text-2xl font-semibold text-slate-400">
              / {maxScore} pontos
            </span>
          </div>

          <p className={`mt-3 max-w-xl text-sm sm:text-base leading-relaxed ${feedback.accentClass}`}>
            {feedback.message}
          </p>

          {/* 3-stat breakdown */}
          <div className="mt-8 grid w-full grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-emerald-400/30 bg-emerald-950/25 px-5 py-4">
              <div className="flex items-center justify-center gap-2 text-emerald-300 text-sm font-medium">
                <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                <span>Acertos</span>
              </div>
              <p className="mt-1.5 font-display text-3xl font-bold text-white tabular-nums">
                {correctCount}
              </p>
            </div>

            <div className="rounded-2xl border border-rose-400/30 bg-rose-950/25 px-5 py-4">
              <div className="flex items-center justify-center gap-2 text-rose-300 text-sm font-medium">
                <XCircle className="h-4 w-4" aria-hidden="true" />
                <span>Erros</span>
              </div>
              <p className="mt-1.5 font-display text-3xl font-bold text-white tabular-nums">
                {wrongCount}
              </p>
            </div>

            <div className="rounded-2xl border border-sky-400/30 bg-blue-950/35 px-5 py-4">
              <div className="flex items-center justify-center gap-2 text-sky-300 text-sm font-medium">
                <Award className="h-4 w-4" aria-hidden="true" />
                <span>Aproveitamento</span>
              </div>
              <p className="mt-1.5 font-display text-3xl font-bold text-white tabular-nums">
                {accuracyPercent}%
              </p>
            </div>
          </div>

          {/* Restart CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full sm:w-auto">
            <motion.button
              type="button"
              onClick={onRestart}
              whileHover={{ scale: 1.025, y: -1 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex w-full sm:w-auto min-w-[230px] items-center justify-center gap-2.5 rounded-2xl border border-sky-300/35 bg-gradient-to-r from-blue-700 via-blue-600 to-sky-500 px-8 py-4 text-base font-bold tracking-wide text-white shadow-[0_0_30px_rgba(37,99,235,0.48)] hover:shadow-[0_0_42px_rgba(56,189,248,0.55)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 cursor-pointer whitespace-nowrap shrink-0"
            >
              <RotateCcw className="h-5 w-5" aria-hidden="true" />
              <span>JOGAR NOVAMENTE</span>
            </motion.button>

            <button
              type="button"
              onClick={onBackToStart}
              className="inline-flex w-full sm:w-auto items-center justify-center rounded-2xl border border-blue-400/25 bg-[#040B1B]/90 px-6 py-4 text-sm font-semibold text-sky-100 hover:border-sky-300/50 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 cursor-pointer whitespace-nowrap shrink-0"
            >
              Tela Inicial
            </button>
          </div>

          {/* Divider */}
          <div className="my-8 h-px w-full bg-gradient-to-r from-transparent via-sky-400/25 to-transparent" />

          {/* Answer Review Summary */}
          <div className="w-full text-left">
            <h3 className="font-display text-base sm:text-lg font-bold text-white mb-4">
              Resumo das Respostas
            </h3>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {questions.map((q, idx) => {
                const record = answers[idx];
                const correct = record?.isCorrect ?? false;

                return (
                  <div
                    key={q.id}
                    className={`rounded-2xl border p-4 ${
                      correct
                        ? 'border-emerald-400/25 bg-[#040F1E]/85'
                        : 'border-rose-400/25 bg-[#120A1A]/85'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-semibold text-sky-100 tabular-nums">
                        {idx + 1}. {q.topic}
                      </span>
                      <span
                        className={`inline-flex items-center gap-1 text-xs font-bold shrink-0 ${
                          correct ? 'text-emerald-400' : 'text-rose-400'
                        }`}
                      >
                        {correct ? (
                          <>
                            <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                            Acertou
                          </>
                        ) : (
                          <>
                            <XCircle className="h-3.5 w-3.5" aria-hidden="true" />
                            Errou
                          </>
                        )}
                      </span>
                    </div>
                    <p className="mt-1.5 text-xs text-slate-400 line-clamp-2">
                      {q.question}
                    </p>
                    {!correct && (
                      <p className="mt-2 text-xs text-emerald-300/95">
                        Correta: <span className="font-medium">{q.options[q.correctIndex]}</span>
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
