import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Question = {
  id: number;
  question: string;
  correctAnswer: string;
  options: string[];
};

const QUESTIONS: Question[] = [
  {
    id: 1,
    question: "Qual é a capital do Brasil?",
    correctAnswer: "Brasília",
    options: ["Brasília", "São Paulo", "Rio de Janeiro", "Salvador"],
  },
  {
    id: 2,
    question: "Quantos estados tem o Brasil?",
    correctAnswer: "27",
    options: ["26", "25", "27", "28"],
  },
  {
    id: 3,
    question: "Qual animal é o símbolo do Brasil?",
    correctAnswer: "Onça-pintada",
    options: ["Arara-azul", "Onça-pintada", "Tucano", "Capivara"],
  },
  {
    id: 4,
    question: "Qual é o maior planeta do sistema solar?",
    correctAnswer: "Júpiter",
    options: ["Terra", "Saturno", "Júpiter", "Urano"],
  },
  {
    id: 5,
    question: "Quantos lados tem um hexágono?",
    correctAnswer: "6",
    options: ["5", "6", "7", "8"],
  },
  {
    id: 6,
    question: "Qual é o maior oceano do mundo?",
    correctAnswer: "Pacífico",
    options: ["Atlântico", "Índico", "Ártico", "Pacífico"],
  },
  {
    id: 7,
    question: "Em que ano o Brasil foi descoberto?",
    correctAnswer: "1500",
    options: ["1400", "1500", "1498", "1502"],
  },
  {
    id: 8,
    question: "Qual é a cor que surge ao misturar azul e amarelo?",
    correctAnswer: "Verde",
    options: ["Roxo", "Verde", "Laranja", "Marrom"],
  },
  {
    id: 9,
    question: "Quantos planetas tem o sistema solar?",
    correctAnswer: "8",
    options: ["7", "8", "9", "10"],
  },
  {
    id: 10,
    question: "Qual é o animal mais rápido do mundo?",
    correctAnswer: "Guepardo",
    options: ["Leão", "Leopardo", "Guepardo", "Gavião"],
  },
];

// Fisher-Yates Shuffle
const shuffleArray = <T,>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

export default function App() {
  const [gameState, setGameState] = useState<"start" | "playing" | "results">("start");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);

  useEffect(() => {
    if (gameState === "playing") {
      setShuffledOptions(shuffleArray(QUESTIONS[currentQuestionIndex].options));
      setSelectedAnswer(null);
      setIsAnswerChecked(false);
    }
  }, [currentQuestionIndex, gameState]);

  const handleStart = () => {
    setGameState("playing");
    setCurrentQuestionIndex(0);
    setScore(0);
  };

  const handleAnswerClick = (answer: string) => {
    if (isAnswerChecked) return;

    setSelectedAnswer(answer);
    setIsAnswerChecked(true);

    const isCorrect = answer === QUESTIONS[currentQuestionIndex].correctAnswer;
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    setTimeout(() => {
      if (currentQuestionIndex < QUESTIONS.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
      } else {
        setGameState("results");
      }
    }, 1200);
  };

  const getResultFeedback = () => {
    if (score === 10) return { message: "Perfeito! Você é um gênio!", emoji: "🎉" };
    if (score >= 7) return { message: "Muito bem! Quase lá!", emoji: "😎" };
    if (score >= 4) return { message: "Bom esforço! Mas dá para melhorar.", emoji: "👍" };
    return { message: "Poxa, tente de novo!", emoji: "😅" };
  };

  const currentQuestion = QUESTIONS[currentQuestionIndex];
  const progress = ((currentQuestionIndex) / QUESTIONS.length) * 100;

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 overflow-hidden font-sans p-4">
      <AnimatePresence mode="wait">
        {gameState === "start" && (
          <motion.div
            key="start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="bg-white/95 backdrop-blur-sm p-10 md:p-16 rounded-[2rem] shadow-2xl max-w-lg w-full text-center"
          >
            <motion.h1
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", bounce: 0.5 }}
              className="text-5xl md:text-6xl font-black text-indigo-600 mb-4"
            >
              Quiz Game
            </motion.h1>
            <p className="text-xl text-gray-600 mb-10 font-medium">
              Teste seus conhecimentos e divirta-se!
            </p>
            <motion.button
              data-testid="button-start"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleStart}
              className="bg-yellow-400 hover:bg-yellow-500 text-yellow-950 font-bold text-2xl py-4 px-12 rounded-full shadow-[0_8px_0_0_#ca8a04] active:shadow-[0_0px_0_0_#ca8a04] active:translate-y-[8px] transition-all"
            >
              Começar!
            </motion.button>
          </motion.div>
        )}

        {gameState === "playing" && (
          <motion.div
            key="playing"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
            className="bg-white/95 backdrop-blur-sm p-6 md:p-12 rounded-[2rem] shadow-2xl max-w-2xl w-full flex flex-col"
          >
            <div className="flex justify-between items-center mb-6">
              <span className="text-indigo-600 font-bold text-lg" data-testid="text-question-number">
                Pergunta {currentQuestionIndex + 1} de {QUESTIONS.length}
              </span>
              <span className="bg-indigo-100 text-indigo-700 font-bold py-1 px-4 rounded-full" data-testid="text-score">
                Placar: {score}
              </span>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-3 mb-8 overflow-hidden">
              <motion.div
                className="bg-indigo-500 h-3 rounded-full"
                initial={{ width: `${((currentQuestionIndex) / QUESTIONS.length) * 100}%` }}
                animate={{ width: `${((currentQuestionIndex + 1) / QUESTIONS.length) * 100}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>

            <h2 className="text-3xl md:text-4xl font-black text-gray-800 mb-10 text-center leading-tight">
              {currentQuestion.question}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-auto">
              {shuffledOptions.map((option, index) => {
                const isSelected = selectedAnswer === option;
                const isCorrect = option === currentQuestion.correctAnswer;
                
                let buttonClass = "bg-white text-gray-700 border-2 border-gray-200 hover:border-indigo-400 hover:bg-indigo-50";
                
                if (isAnswerChecked) {
                  if (isCorrect) {
                    buttonClass = "bg-green-500 border-green-600 text-white shadow-[0_6px_0_0_#16a34a] translate-y-[-6px]";
                  } else if (isSelected && !isCorrect) {
                    buttonClass = "bg-red-500 border-red-600 text-white shadow-[0_6px_0_0_#dc2626] translate-y-[-6px]";
                  } else {
                    buttonClass = "bg-gray-100 border-gray-200 text-gray-400 opacity-50";
                  }
                } else {
                  buttonClass = "bg-white text-gray-700 border-2 border-gray-200 hover:border-indigo-400 hover:bg-indigo-50 shadow-[0_6px_0_0_#e5e7eb] active:shadow-[0_0px_0_0_#e5e7eb] active:translate-y-[6px]";
                }

                return (
                  <motion.button
                    key={option}
                    data-testid={`button-option-${index}`}
                    disabled={isAnswerChecked}
                    whileHover={!isAnswerChecked ? { scale: 1.02 } : {}}
                    whileTap={!isAnswerChecked ? { scale: 0.98 } : {}}
                    onClick={() => handleAnswerClick(option)}
                    className={`p-6 rounded-2xl font-bold text-xl transition-all duration-200 text-left ${buttonClass}`}
                  >
                    <span className="inline-block w-8 h-8 rounded-full bg-black/10 text-center leading-8 mr-3 text-sm">
                      {["A", "B", "C", "D"][index]}
                    </span>
                    {option}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}

        {gameState === "results" && (
          <motion.div
            key="results"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", bounce: 0.5 }}
            className="bg-white/95 backdrop-blur-sm p-10 md:p-16 rounded-[2rem] shadow-2xl max-w-lg w-full text-center"
          >
            <div className="text-8xl mb-6">{getResultFeedback().emoji}</div>
            <h2 className="text-4xl font-black text-gray-800 mb-2">Fim de Jogo!</h2>
            <p className="text-2xl font-bold text-indigo-600 mb-6" data-testid="text-final-score">
              Você acertou {score} de {QUESTIONS.length}!
            </p>
            <p className="text-xl text-gray-600 mb-10">
              {getResultFeedback().message}
            </p>
            
            <motion.button
              data-testid="button-restart"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleStart}
              className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold text-2xl py-4 px-12 rounded-full shadow-[0_8px_0_0_#4f46e5] active:shadow-[0_0px_0_0_#4f46e5] active:translate-y-[8px] transition-all w-full"
            >
              Jogar de Novo
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
