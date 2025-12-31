
import React, { useState } from 'react';
import { MOCK_QUIZ } from '../constants';
import { Trophy, ArrowRight, RotateCcw, CheckCircle2, XCircle } from 'lucide-react';

const QuizModule: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<'intro' | 'active' | 'results'>('intro');
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);

  const startQuiz = () => {
    setCurrentStep('active');
    setCurrentQuestionIdx(0);
    setScore(0);
    setSelectedOption(null);
    setAnswers([]);
  };

  const handleNext = () => {
    if (selectedOption === null) return;

    const isCorrect = selectedOption === MOCK_QUIZ[currentQuestionIdx].correctAnswer;
    if (isCorrect) setScore(s => s + 1);
    setAnswers(prev => [...prev, isCorrect]);

    if (currentQuestionIdx < MOCK_QUIZ.length - 1) {
      setCurrentQuestionIdx(prev => prev + 1);
      setSelectedOption(null);
    } else {
      setCurrentStep('results');
    }
  };

  const currentQuestion = MOCK_QUIZ[currentQuestionIdx];

  return (
    <div className="max-w-3xl mx-auto">
      {currentStep === 'intro' && (
        <div className="bg-black/40 border border-white/10 rounded-3xl p-12 text-center space-y-8 animate-in fade-in zoom-in-95 duration-500">
          <div className="w-24 h-24 bg-yellow-400 rounded-full mx-auto flex items-center justify-center shadow-[0_0_30px_rgba(250,204,21,0.3)]">
            <Trophy className="text-black" size={48} />
          </div>
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-white tracking-tight">Kelulut Knowledge Challenge</h2>
            <p className="text-gray-400 max-w-md mx-auto">
              Test your understanding of the Indo-Malayan stingless bee ecosystem. Complete all questions to earn your repository completion score.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
            <div className="bg-white/5 p-4 rounded-2xl">
              <p className="text-2xl font-bold text-yellow-400">{MOCK_QUIZ.length}</p>
              <p className="text-[10px] text-gray-500 uppercase font-bold">Questions</p>
            </div>
            <div className="bg-white/5 p-4 rounded-2xl">
              <p className="text-2xl font-bold text-yellow-400">100%</p>
              <p className="text-[10px] text-gray-500 uppercase font-bold">Accuracy</p>
            </div>
          </div>
          <button 
            onClick={startQuiz}
            className="group flex items-center gap-2 px-8 py-4 bg-yellow-400 text-black font-bold rounded-2xl hover:bg-yellow-300 transition-all mx-auto"
          >
            Start Challenge
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      )}

      {currentStep === 'active' && (
        <div className="space-y-8 animate-in slide-in-from-right-4 duration-300">
          <div className="flex justify-between items-center px-2">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">
              Question {currentQuestionIdx + 1} of {MOCK_QUIZ.length}
            </span>
            <div className="flex gap-1">
              {MOCK_QUIZ.map((_, i) => (
                <div 
                  key={i} 
                  className={`h-1 w-8 rounded-full transition-all ${
                    i < currentQuestionIdx ? 'bg-yellow-400' : i === currentQuestionIdx ? 'bg-yellow-400/40 animate-pulse' : 'bg-white/10'
                  }`} 
                />
              ))}
            </div>
          </div>

          <div className="bg-black/40 border border-white/10 rounded-3xl p-8 md:p-12">
            <h3 className="text-2xl font-bold text-white mb-10 leading-snug">
              {currentQuestion.question}
            </h3>

            <div className="space-y-4">
              {currentQuestion.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedOption(idx)}
                  className={`w-full flex items-center justify-between p-5 rounded-2xl border transition-all text-left ${
                    selectedOption === idx 
                    ? 'bg-yellow-400/10 border-yellow-400 text-white shadow-[0_0_15px_rgba(250,204,21,0.1)]' 
                    : 'bg-white/5 border-transparent text-gray-400 hover:bg-white/10'
                  }`}
                >
                  <span className="font-medium">{option}</span>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                    selectedOption === idx ? 'border-yellow-400 bg-yellow-400' : 'border-white/20'
                  }`}>
                    {selectedOption === idx && <div className="w-2 h-2 bg-black rounded-full" />}
                  </div>
                </button>
              ))}
            </div>

            <button
              onClick={handleNext}
              disabled={selectedOption === null}
              className={`mt-10 w-full py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 ${
                selectedOption !== null 
                ? 'bg-yellow-400 text-black hover:bg-yellow-300' 
                : 'bg-white/5 text-gray-600 cursor-not-allowed'
              }`}
            >
              {currentQuestionIdx === MOCK_QUIZ.length - 1 ? 'Finish Challenge' : 'Next Question'}
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      )}

      {currentStep === 'results' && (
        <div className="bg-black/40 border border-white/10 rounded-3xl p-12 text-center space-y-8 animate-in fade-in zoom-in-95 duration-500">
          <div className="space-y-2">
            <h2 className="text-4xl font-black text-white italic tracking-tighter">MISSION COMPLETE</h2>
            <p className="text-gray-500 font-bold uppercase tracking-widest">Repository Assessment Results</p>
          </div>

          <div className="flex justify-center gap-4 py-8">
            <div className="w-40 h-40 rounded-full border-8 border-yellow-400 flex flex-col items-center justify-center shadow-[0_0_30px_rgba(250,204,21,0.2)]">
              <span className="text-5xl font-black text-white">{Math.round((score / MOCK_QUIZ.length) * 100)}</span>
              <span className="text-[10px] font-bold text-yellow-400 uppercase tracking-widest mt-1">Accuracy %</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white/5 p-6 rounded-2xl text-left border border-white/5">
              <p className="text-[10px] text-gray-500 uppercase font-bold mb-3">Performance Breakdown</p>
              <div className="flex gap-2 flex-wrap">
                {answers.map((correct, i) => (
                  <div key={i} className={`p-2 rounded-lg ${correct ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                    {correct ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white/5 p-6 rounded-2xl text-left border border-white/5 flex flex-col justify-center">
              <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">Rank Achievement</p>
              <h4 className="text-lg font-bold text-yellow-400">{score === MOCK_QUIZ.length ? 'Kelulut Specialist' : 'Learner Scout'}</h4>
              <p className="text-xs text-gray-400">Score: {score}/{MOCK_QUIZ.length} points</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button 
              onClick={startQuiz}
              className="flex-1 flex items-center justify-center gap-2 px-8 py-4 bg-white text-black font-bold rounded-2xl hover:bg-gray-200 transition-all"
            >
              <RotateCcw size={20} />
              Retry Assessment
            </button>
            <button 
              className="flex-1 flex items-center justify-center gap-2 px-8 py-4 bg-yellow-400 text-black font-bold rounded-2xl hover:bg-yellow-300 transition-all"
            >
              Print Certificate
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizModule;
