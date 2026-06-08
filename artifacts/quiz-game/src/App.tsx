import { useState, useRef, useCallback, useEffect } from 'react';
import './index.css';

const geralWords = [
  { emoji: "🇧🇷", palavra: "BRASIL", vogal: "I", pos: 4 },
  { emoji: "🏠", palavra: "CASA", vogal: "A", pos: 3 },
  { emoji: "👄", palavra: "BOCA", vogal: "O", pos: 1 },
  { emoji: "👠", palavra: "SAPATO", vogal: "A", pos: 3 },
  { emoji: "🐝", palavra: "ABELHA", vogal: "A", pos: 0 },
  { emoji: "✈️", palavra: "AVIÃO", vogal: "A", pos: 0 },
  { emoji: "🦜", palavra: "ARARA", vogal: "A", pos: 0 },
  { emoji: "🍌", palavra: "BANANA", vogal: "A", pos: 1 },
  { emoji: "🐈", palavra: "GATO", vogal: "A", pos: 1 },
  { emoji: "🐘", palavra: "ELEFANTE", vogal: "E", pos: 0 },
  { emoji: "⭐", palavra: "ESTRELA", vogal: "E", pos: 0 },
  { emoji: "🍇", palavra: "UVA", vogal: "U", pos: 0 },
  { emoji: "⚽", palavra: "BOLA", vogal: "O", pos: 1 },
  { emoji: "🐶", palavra: "CACHORRO", vogal: "O", pos: 4 },
  { emoji: "🍎", palavra: "MAÇÃ", vogal: "A", pos: 1 },
  { emoji: "🥛", palavra: "LEITE", vogal: "E", pos: 1 },
  { emoji: "🧅", palavra: "CEBOLA", vogal: "O", pos: 3 },
  { emoji: "☀️", palavra: "SOL", vogal: "O", pos: 1 },
  { emoji: "🌙", palavra: "LUA", vogal: "U", pos: 1 },
  { emoji: "🐟", palavra: "PEIXE", vogal: "E", pos: 1 },
  { emoji: "🦁", palavra: "LEÃO", vogal: "E", pos: 1 },
  { emoji: "🐒", palavra: "MACACO", vogal: "A", pos: 1 },
  { emoji: "🦉", palavra: "CORUJA", vogal: "U", pos: 3 },
  { emoji: "🐸", palavra: "SAPO", vogal: "A", pos: 1 },
  { emoji: "🚜", palavra: "TRATOR", vogal: "A", pos: 2 },
  { emoji: "🚢", palavra: "NAVIO", vogal: "I", pos: 3 },
  { emoji: "🚲", palavra: "BICICLETA", vogal: "I", pos: 1 },
  { emoji: "🧁", palavra: "BOLO", vogal: "O", pos: 1 },
  { emoji: "🧀", palavra: "QUEIJO", vogal: "E", pos: 2 },
  { emoji: "🥕", palavra: "CENOURA", vogal: "E", pos: 1 },
  { emoji: "🍉", palavra: "MELANCIA", vogal: "I", pos: 6 },
  { emoji: "🍋", palavra: "LIMÃO", vogal: "I", pos: 1 },
  { emoji: "🧸", palavra: "URSO", vogal: "U", pos: 0 },
  { emoji: "🧥", palavra: "CASACO", vogal: "A", pos: 3 },
  { emoji: "🧦", palavra: "MEIA", vogal: "E", pos: 1 },
  { emoji: "🌹", palavra: "FLOR", vogal: "O", pos: 2 },
  { emoji: "🌳", palavra: "ÁRVORE", vogal: "O", pos: 3 },
  { emoji: "🔔", palavra: "SINO", vogal: "I", pos: 1 },
  { emoji: "🛋️", palavra: "SOFÁ", vogal: "O", pos: 1 },
  { emoji: "🪟", palavra: "JANELA", vogal: "E", pos: 3 },
  { emoji: "🚪", palavra: "PORTA", vogal: "O", pos: 1 },
  { emoji: "🪓", palavra: "MACHADO", vogal: "A", pos: 1 },
  { emoji: "✏️", palavra: "LÁPIS", vogal: "I", pos: 3 },
  { emoji: "📚", palavra: "LIVRO", vogal: "I", pos: 1 },
  { emoji: "🎒", palavra: "MOCHILA", vogal: "O", pos: 1 },
  { emoji: "🪙", palavra: "MOEDA", vogal: "O", pos: 1 },
  { emoji: "🔑", palavra: "CHAVE", vogal: "A", pos: 2 },
  { emoji: "🪺", palavra: "OVO", vogal: "O", pos: 0 },
  { emoji: "🥣", palavra: "SOPA", vogal: "O", pos: 1 },
  { emoji: "💍", palavra: "ANEL", vogal: "A", pos: 0 },
];

const nomesWords = [
  { emoji: "", palavra: "BEATRIZ",   vogal: "E", pos: 1,  fala: "" },
  { emoji: "", palavra: "CAMILA",    vogal: "I", pos: 3,  fala: "" },
  { emoji: "", palavra: "MANUELA",   vogal: "U", pos: 3,  fala: "" },
  { emoji: "", palavra: "ELLEN",     vogal: "E", pos: 0,  fala: "Élen" },
  { emoji: "", palavra: "LAVÍNIA",   vogal: "I", pos: 3,  fala: "Lavínia" },
  { emoji: "", palavra: "ANA PAULA", vogal: "A", pos: 2,  fala: "" },
  { emoji: "", palavra: "LANINHA",   vogal: "A", pos: 1,  fala: "" },
  { emoji: "", palavra: "VÍTOR",     vogal: "I", pos: 1,  fala: "Vítor" },
  { emoji: "", palavra: "LARISSA",   vogal: "I", pos: 3,  fala: "" },
  { emoji: "", palavra: "LUCAS",     vogal: "A", pos: 3,  fala: "" },
  { emoji: "", palavra: "LIDIANE",   vogal: "I", pos: 1,  fala: "" },
  { emoji: "", palavra: "PEDRO",     vogal: "E", pos: 1,  fala: "" },
  { emoji: "", palavra: "MARCELLE",  vogal: "E", pos: 4,  fala: "Marcéle" },
  { emoji: "", palavra: "LAYSA",     vogal: "A", pos: 1,  fala: "Laíza" },
  { emoji: "", palavra: "GABRIEL",   vogal: "A", pos: 1,  fala: "" },
];

type WordItem = {
  emoji: string;
  palavra: string;
  vogal: string;
  pos: number;
  fala?: string;
};

type Category = 'geral' | 'nomes';
type VowelState = 'idle' | 'correct' | 'wrong';
type Particle = { id: number; color: string; x: string; y: string };

let particleId = 0;

function shuffleIndices(length: number): number[] {
  const arr = Array.from({ length }, (_, i) => i);
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function makeParticles(): Particle[] {
  const colors = ['#ff4081', '#3f51b5', '#ffeb3b', '#4caf50', '#ff5722'];
  return Array.from({ length: 30 }, () => ({
    id: particleId++,
    color: colors[Math.floor(Math.random() * colors.length)],
    x: `${(Math.random() - 0.5) * 260}px`,
    y: `${(Math.random() - 0.5) * 260}px`,
  }));
}

export default function App() {
  const [onHome, setOnHome] = useState(true);
  const [category, setCategory] = useState<Category>('geral');
  const [gameIndex, setGameIndex] = useState(0);
  const [stars, setStars] = useState(0);
  const [order, setOrder] = useState<number[]>([]);
  const [answered, setAnswered] = useState(false);
  const [selectedVowel, setSelectedVowel] = useState<string | null>(null);
  const [vowelState, setVowelState] = useState<VowelState>('idle');
  const [gameOver, setGameOver] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [popKey, setPopKey] = useState(0);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const musicRef = useRef<Record<string, any>>({});
  const unlockedRef = useRef(false);
  const fireworkRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const convolverRef = useRef<ConvolverNode | null>(null);
  const masterRef = useRef<GainNode | null>(null);

  const pool: WordItem[] = category === 'nomes' ? nomesWords : geralWords;
  const currentItem: WordItem | null =
    order.length > 0 && gameIndex < pool.length ? pool[order[gameIndex]] : null;

  const getCtx = useCallback(() => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return audioCtxRef.current;
  }, []);

  const startMusic = useCallback(() => {
    const ctx = getCtx();
    if (masterRef.current) return;

    const master = ctx.createGain();
    master.gain.setValueAtTime(0, ctx.currentTime);
    master.gain.linearRampToValueAtTime(0.045, ctx.currentTime + 3);
    master.connect(ctx.destination);
    masterRef.current = master;

    const convolver = ctx.createConvolver();
    const buf = ctx.createBuffer(2, ctx.sampleRate * 2.5, ctx.sampleRate);
    for (let ch = 0; ch < 2; ch++) {
      const data = buf.getChannelData(ch);
      for (let i = 0; i < data.length; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / data.length, 2.5);
      }
    }
    convolver.buffer = buf;
    convolver.connect(master);
    convolverRef.current = convolver;

    const pentatonic = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25, 784.00, 880.00];
    const patterns = [
      [0, 2, 4, 7, 2, 4, 0, 7],
      [4, 2, 0, 4, 7, 4, 2, 0],
      [2, 4, 7, 4, 2, 0, 2, 4],
    ];
    let step = 0;
    let patIdx = 0;

    function playNote() {
      if (!masterRef.current || !convolverRef.current) return;
      const c = getCtx();
      const pattern = patterns[patIdx % patterns.length];
      const freq = pentatonic[pattern[step % pattern.length] % pentatonic.length];

      const osc = c.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, c.currentTime);

      const env = c.createGain();
      env.gain.setValueAtTime(0, c.currentTime);
      env.gain.linearRampToValueAtTime(0.28, c.currentTime + 0.08);
      env.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 1.1);

      osc.connect(env);
      env.connect(convolverRef.current);
      env.connect(masterRef.current);
      osc.start(c.currentTime);
      osc.stop(c.currentTime + 1.2);

      step++;
      if (step % pattern.length === 0) patIdx++;

      musicRef.current.timer = setTimeout(playNote, 700 + Math.floor(Math.random() * 500));
    }

    playNote();
  }, [getCtx]);

  const stopMusic = useCallback(() => {
    if (musicRef.current.timer) clearTimeout(musicRef.current.timer);
    if (masterRef.current) {
      const ctx = getCtx();
      masterRef.current.gain.linearRampToValueAtTime(0, ctx.currentTime + 1);
      setTimeout(() => {
        masterRef.current = null;
        convolverRef.current = null;
        musicRef.current = {};
      }, 1200);
    }
  }, [getCtx]);

  const unlockAudio = useCallback(() => {
    if (unlockedRef.current) return;
    unlockedRef.current = true;
    const ctx = getCtx();
    if (ctx.state === 'suspended') ctx.resume();
    const buf = ctx.createBuffer(1, 1, 22050);
    const src = ctx.createBufferSource();
    src.buffer = buf;
    src.connect(ctx.destination);
    src.start(0);
    startMusic();
  }, [getCtx, startMusic]);

  const playCorrect = useCallback(() => {
    const ctx = getCtx();
    [[523.25, 0], [659.25, 0.12], [783.99, 0.24]].forEach(([freq, delay]) => {
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.value = freq;
      g.gain.setValueAtTime(0, ctx.currentTime + delay);
      g.gain.linearRampToValueAtTime(0.22, ctx.currentTime + delay + 0.05);
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + 0.38);
      osc.connect(g); g.connect(ctx.destination);
      osc.start(ctx.currentTime + delay);
      osc.stop(ctx.currentTime + delay + 0.4);
    });
  }, [getCtx]);

  const playWrong = useCallback(() => {
    const ctx = getCtx();
    [[220, 0], [196, 0.15]].forEach(([freq, delay]) => {
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.value = freq;
      g.gain.setValueAtTime(0, ctx.currentTime + delay);
      g.gain.linearRampToValueAtTime(0.14, ctx.currentTime + delay + 0.04);
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + 0.3);
      osc.connect(g); g.connect(ctx.destination);
      osc.start(ctx.currentTime + delay);
      osc.stop(ctx.currentTime + delay + 0.32);
    });
  }, [getCtx]);

  const speakWord = useCallback((text: string) => {
    if (!window.speechSynthesis) return;
    try {
      window.speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(text.toLowerCase());
      utter.lang = 'pt-BR';
      utter.rate = 0.9;
      utter.pitch = 1.5;
      utter.volume = 1;
      const voices = window.speechSynthesis.getVoices();
      const voice = voices.find(v => v.lang === 'pt-BR') || voices.find(v => v.lang.startsWith('pt'));
      if (voice) utter.voice = voice;
      window.speechSynthesis.speak(utter);
    } catch (e) { /* silent */ }
  }, []);

  useEffect(() => {
    const handler = () => unlockAudio();
    document.addEventListener('touchstart', handler, { once: true, passive: true });
    document.addEventListener('mousedown', handler, { once: true });
    return () => {
      document.removeEventListener('touchstart', handler);
      document.removeEventListener('mousedown', handler);
    };
  }, [unlockAudio]);

  useEffect(() => {
    if (gameOver) {
      setParticles(makeParticles());
      fireworkRef.current = setInterval(() => setParticles(makeParticles()), 1500);
    }
    return () => { if (fireworkRef.current) clearInterval(fireworkRef.current); };
  }, [gameOver]);

  const startGame = useCallback((cat: Category) => {
    const p = cat === 'nomes' ? nomesWords : geralWords;
    setCategory(cat);
    setOrder(shuffleIndices(p.length));
    setGameIndex(0);
    setStars(0);
    setAnswered(false);
    setSelectedVowel(null);
    setVowelState('idle');
    setGameOver(false);
    setParticles([]);
    setOnHome(false);
    setPopKey(k => k + 1);
    unlockAudio();
    if (!masterRef.current) startMusic();
  }, [unlockAudio, startMusic]);

  const checkAnswer = useCallback((selected: string) => {
    if (answered || !currentItem) return;
    setAnswered(true);
    setSelectedVowel(selected);
    const isCorrect = selected === currentItem.vogal;
    setVowelState(isCorrect ? 'correct' : 'wrong');
    if (isCorrect) { setStars(s => s + 1); playCorrect(); }
    else { playWrong(); }
    setTimeout(() => {
      unlockAudio();
      speakWord(currentItem.fala || currentItem.palavra);
    }, 300);
  }, [answered, currentItem, playCorrect, playWrong, speakWord, unlockAudio]);

  const nextQuestion = useCallback(() => {
    const nextIdx = gameIndex + 1;
    if (nextIdx >= pool.length) {
      setGameOver(true);
    } else {
      setGameIndex(nextIdx);
      setAnswered(false);
      setSelectedVowel(null);
      setVowelState('idle');
      setPopKey(k => k + 1);
    }
  }, [gameIndex, pool.length]);

  const goHome = useCallback(() => {
    if (fireworkRef.current) clearInterval(fireworkRef.current);
    stopMusic();
    window.speechSynthesis?.cancel();
    setOnHome(true);
    setGameOver(false);
    setParticles([]);
  }, [stopMusic]);

  function renderWord(item: WordItem) {
    return item.palavra.split('').map((char, i) => {
      if (char === ' ') return <span key={i} style={{ width: 20, display: 'inline-block' }} />;
      if (i === item.pos) {
        return answered
          ? <span key={i} className="highlight-letter" style={{ margin: '0 4px' }}>{item.vogal}</span>
          : <span key={i} style={{ margin: '0 4px' }}>_</span>;
      }
      return <span key={i} style={{ margin: '0 4px' }}>{char}</span>;
    });
  }

  const total = pool.length;

  const vowelFocusClass = `center-feedback-vowel${vowelState === 'idle' ? '' : ` ${vowelState}`}${gameOver ? ' correct trophy-end' : ''}`;

  return (
    <div className="app-container">
      {onHome && (
        <div id="homeScreen">
          <div style={{ fontSize: '5rem', marginBottom: 15, display: 'flex', gap: 15 }}>🎒 📚</div>
          <h1 className="main-title">Eu amo vogais</h1>
          <p style={{ color: '#555', marginBottom: 10, maxWidth: 500, fontSize: '1.1rem', fontWeight: 'bold' }}>
            ESCOLHA UMA CATEGORIA PARA JOGAR:
          </p>
          <div className="category-container">
            <button
              className="btn-category bg-geral"
              data-testid="btn-geral"
              onClick={() => startGame('geral')}
            >
              <span style={{ fontSize: '2.5rem' }}>🧸</span>
              PALAVRAS GERAIS
            </button>
            <button
              className="btn-category bg-nomes"
              data-testid="btn-nomes"
              onClick={() => startGame('nomes')}
            >
              <span style={{ fontSize: '2.5rem' }}>👤</span>
              NOMES DE PESSOAS
            </button>
          </div>
          <button
            className="btn-red"
            style={{ maxWidth: 200 }}
            onClick={() => { if (window.confirm('DESEJA LIMPAR O HISTÓRICO?')) location.reload(); }}
          >
            🗑️ LIMPAR MEMÓRIA
          </button>
        </div>
      )}

      {!onHome && (
        <>
          <div className="main-game" style={{ display: 'flex' }}>
            <div className="game-header">
              <div className="badge-phase" data-testid="phase-badge">
                {gameOver ? 'FIM! 🏆' : `FASE ${gameIndex + 1} / ${total}`}
              </div>
              <div className="star-counter" data-testid="star-counter">⭐ {stars}</div>
            </div>

            <div className="quiz-area">
              {particles.map(p => (
                <div
                  key={p.id}
                  className="firework"
                  style={{
                    backgroundColor: p.color,
                    left: '50%',
                    top: '50%',
                    ['--x' as string]: p.x,
                    ['--y' as string]: p.y,
                    animation: 'explode 1s ease-out forwards',
                  }}
                />
              ))}

              {!gameOver && currentItem && currentItem.emoji && (
                <div key={popKey} className="image-box pop" data-testid="image-box">
                  {currentItem.emoji}
                </div>
              )}

              {!gameOver && currentItem && (
                <div className="word-display" data-testid="word-display">
                  {renderWord(currentItem)}
                </div>
              )}

              <div className={vowelFocusClass} data-testid="vowel-focus">
                {gameOver ? '🏆' : vowelState === 'idle' ? '?' : currentItem?.vogal}
              </div>
            </div>

            {!gameOver && (
              <div className="choices-container" data-testid="choices-container">
                {['A', 'E', 'I', 'O', 'U'].map(v => {
                  let cls = 'choice-btn';
                  if (answered) {
                    if (v === currentItem?.vogal) cls += ' correct';
                    else if (v === selectedVowel && selectedVowel !== currentItem?.vogal) cls += ' wrong';
                  }
                  return (
                    <button
                      key={v}
                      className={cls}
                      disabled={answered}
                      onClick={() => checkAnswer(v)}
                      data-testid={`btn-vowel-${v}`}
                    >
                      {v}
                    </button>
                  );
                })}
              </div>
            )}

            <div className="navigation-area">
              {answered && !gameOver && (
                <button className="btn-next" onClick={nextQuestion} data-testid="btn-next">
                  PRÓXIMO ➔
                </button>
              )}
              {gameOver && (
                <button className="btn-next" onClick={goHome} data-testid="btn-restart">
                  🏠 JOGAR NOVAMENTE
                </button>
              )}
            </div>
          </div>

          <div className="sidebar" style={{ display: 'flex' }}>
            <button className="btn-back-small" onClick={goHome} data-testid="btn-back">
              ⬅ VOLTAR
            </button>
            <div className="sidebar-decor">✏️</div>
          </div>
        </>
      )}
    </div>
  );
}
