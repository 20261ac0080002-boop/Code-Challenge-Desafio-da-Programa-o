import { Terminal, Volume2, VolumeX } from 'lucide-react';
import { useCallback, useState } from 'react';
import { QuizScreen } from './components/QuizScreen';
import { AnswerRecord, ResultScreen } from './components/ResultScreen';
import { StartScreen } from './components/StartScreen';
import { POINTS_PER_QUESTION, QUIZ_QUESTIONS } from './data/questions';
import { playTone } from './utils/sound';

type GamePhase = 'START' | 'PLAYING' | 'RESULT';

export default function App() {
  const [phase, setPhase] = useState<GamePhase>('START');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answers, setAnswers] = useState<AnswerRecord[]>([]);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  const currentQuestion = QUIZ_QUESTIONS[currentIndex];

  const handleStart = useCallback(() => {
    playTone('click', soundEnabled);
    setCurrentIndex(0);
    setScore(0);
    setSelectedOption(null);
    setAnswers([]);
    setPhase('PLAYING');
  }, [soundEnabled]);

  const handleSelectOption = useCallback(
    (optionIndex: number) => {
      // Prevent answering the same question twice
      if (selectedOption !== null) return;

      const isCorrect = optionIndex === currentQuestion.correctIndex;
      setSelectedOption(optionIndex);

      if (isCorrect) {
        setScore((prev) => prev + POINTS_PER_QUESTION);
        playTone('correct', soundEnabled);
      } else {
        playTone('wrong', soundEnabled);
      }

      setAnswers((prev) => [
        ...prev,
        {
          questionId: currentQuestion.id,
          topic: currentQuestion.topic,
          selectedOption: optionIndex,
          correctIndex: currentQuestion.correctIndex,
          isCorrect,
        },
      ]);
    },
    [selectedOption, currentQuestion, soundEnabled]
  );

  const handleNext = useCallback(() => {
    if (selectedOption === null) return;

    if (currentIndex + 1 < QUIZ_QUESTIONS.length) {
      playTone('click', soundEnabled);
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
    } else {
      playTone('finish', soundEnabled);
      setPhase('RESULT');
    }
  }, [selectedOption, currentIndex, soundEnabled]);

  const handleBackToStart = useCallback(() => {
    playTone('click', soundEnabled);
    setCurrentIndex(0);
    setScore(0);
    setSelectedOption(null);
    setAnswers([]);
    setPhase('START');
  }, [soundEnabled]);

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-[#020714] text-slate-100 flex flex-col">
      {/* Ambient layered blue depth backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 bg-tech-grid opacity-90"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed -top-44 left-1/4 h-[30rem] w-[30rem] rounded-full bg-blue-600/20 blur-[135px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed -bottom-44 right-1/4 h-[30rem] w-[30rem] rounded-full bg-sky-400/15 blur-[135px]"
      />

      {/* Clean Minimal Header */}
      <header className="relative z-10 mx-auto flex w-full max-w-5xl items-center justify-between gap-4 px-4 py-4 sm:px-6 sm:py-5">
        <button
          type="button"
          onClick={handleBackToStart}
          className="inline-flex items-center gap-2.5 text-left font-display text-sm sm:text-base font-bold tracking-tight text-white hover:text-sky-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 rounded-lg px-1 py-0.5 cursor-pointer whitespace-nowrap shrink-0"
          title="Voltar para a tela inicial"
        >
          <Terminal className="h-5 w-5 text-sky-400 shrink-0" aria-hidden="true" />
          <span>Desafio da Programação</span>
        </button>

        <button
          type="button"
          onClick={() => setSoundEnabled((prev) => !prev)}
          aria-label={soundEnabled ? 'Desativar efeitos sonoros' : 'Ativar efeitos sonoros'}
          className="inline-flex items-center gap-2 rounded-xl border border-sky-400/25 bg-[#071128]/90 px-3.5 py-2 text-xs font-medium text-sky-100 hover:border-sky-300/55 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 cursor-pointer whitespace-nowrap shrink-0"
        >
          {soundEnabled ? (
            <Volume2 className="h-4 w-4 text-sky-400" aria-hidden="true" />
          ) : (
            <VolumeX className="h-4 w-4 text-slate-500" aria-hidden="true" />
          )}
          <span className="hidden sm:inline">{soundEnabled ? 'Som ativo' : 'Som mudo'}</span>
        </button>
      </header>

      {/* Main Content Stage */}
      <main className="relative z-10 flex flex-1 items-center justify-center px-4 py-4 sm:px-6 sm:py-8">
        {phase === 'START' && <StartScreen onStart={handleStart} />}

        {phase === 'PLAYING' && currentQuestion && (
          <QuizScreen
            question={currentQuestion}
            currentIndex={currentIndex}
            totalQuestions={QUIZ_QUESTIONS.length}
            score={score}
            selectedOption={selectedOption}
            onSelectOption={handleSelectOption}
            onNext={handleNext}
          />
        )}

        {phase === 'RESULT' && (
          <ResultScreen
            score={score}
            totalQuestions={QUIZ_QUESTIONS.length}
            answers={answers}
            questions={QUIZ_QUESTIONS}
            onRestart={handleStart}
            onBackToStart={handleBackToStart}
          />
        )}
      </main>

      {/* Quiet Footer */}
      <footer className="relative z-10 px-4 py-4 text-center text-xs text-slate-500">
        Quiz educativo de lógica, algoritmos e desenvolvimento web · 100% local no navegador
      </footer>
    </div>
  );
}
