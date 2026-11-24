let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  const AudioContextClass =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AudioContextClass) return null;

  if (!audioCtx) {
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

export function playTone(
  type: 'correct' | 'wrong' | 'click' | 'finish',
  enabled: boolean
): void {
  if (!enabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;

  const playNote = (
    freq: number,
    startOffset: number,
    duration: number,
    wave: OscillatorType,
    volume: number
  ) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = wave;
    osc.frequency.setValueAtTime(freq, now + startOffset);

    gain.gain.setValueAtTime(0.0001, now + startOffset);
    gain.gain.exponentialRampToValueAtTime(volume, now + startOffset + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + startOffset + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now + startOffset);
    osc.stop(now + startOffset + duration + 0.02);
  };

  if (type === 'click') {
    playNote(520, 0, 0.06, 'sine', 0.06);
  } else if (type === 'correct') {
    playNote(523.25, 0, 0.12, 'triangle', 0.11);
    playNote(659.25, 0.08, 0.16, 'triangle', 0.12);
    playNote(783.99, 0.16, 0.22, 'sine', 0.1);
  } else if (type === 'wrong') {
    playNote(240, 0, 0.15, 'sawtooth', 0.06);
    playNote(185, 0.12, 0.22, 'sawtooth', 0.06);
  } else if (type === 'finish') {
    playNote(523.25, 0, 0.14, 'triangle', 0.1);
    playNote(659.25, 0.1, 0.14, 'triangle', 0.1);
    playNote(783.99, 0.2, 0.14, 'triangle', 0.1);
    playNote(1046.5, 0.3, 0.35, 'sine', 0.12);
  }
}
