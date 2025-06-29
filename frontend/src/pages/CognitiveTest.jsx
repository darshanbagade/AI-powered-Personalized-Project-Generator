import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { Card, CardContent } from "../components/Card";
import { Brain, Clock, Target, Zap, CheckCircle, ArrowRight, AlertTriangle } from "lucide-react";

const CognitiveTest = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(120);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [debugInfo, setDebugInfo] = useState("");

  const questions = [
    {
      id: 1,
      type: "pattern",
      question: "What comes next in the sequence: 2, 6, 12, 20, 30, ?",
      options: ["40", "42", "44", "46"],
      correct: "42",
      explanation: "The difference between consecutive terms increases by 2: +4, +6, +8, +10, +12"
    },
    {
      id: 2,
      type: "logic",
      question: "If all roses are flowers and some flowers are red, which statement is definitely true?",
      options: [
        "All roses are red",
        "Some roses are red", 
        "All red things are roses",
        "None of the above"
      ],
      correct: "Some roses are red",
      explanation: "Since all roses are flowers and some flowers are red, it's possible that some roses are red."
    },
    {
      id: 3,
      type: "spatial",
      question: "A cube is painted on all sides and cut into 27 smaller cubes. How many small cubes have exactly 2 painted faces?",
      options: ["8", "12", "16", "20"],
      correct: "12",
      explanation: "The cubes with exactly 2 painted faces are on the edges but not corners. A cube has 12 edges."
    },
    {
      id: 4,
      type: "verbal",
      question: "Choose the word that best completes the analogy: Book is to Reading as Fork is to:",
      options: ["Eating", "Cooking", "Kitchen", "Food"],
      correct: "Eating",
      explanation: "A book is a tool used for reading, just as a fork is a tool used for eating."
    },
    {
      id: 5,
      type: "numerical",
      question: "If 3 workers can complete a task in 8 days, how many days will it take 6 workers to complete the same task?",
      options: ["2 days", "4 days", "6 days", "8 days"],
      correct: "4 days",
      explanation: "More workers means less time. If workers double, time halves: 8 ÷ 2 = 4 days."
    },
    {
      id: 6,
      type: "memory",
      question: "Remember this sequence: 7-2-9-4-1-8-3. What is the 4th number in the sequence?",
      options: ["7", "2", "9", "4"],
      correct: "4",
      explanation: "The 4th number in the sequence 7-2-9-4-1-8-3 is 4."
    },
    {
      id: 7,
      type: "problem-solving",
      question: "A clock shows 3:15. What is the angle between the hour and minute hands?",
      options: ["7.5°", "15°", "22.5°", "30°"],
      correct: "7.5°",
      explanation: "At 3:15, the hour hand is 3.25 hours from 12 (3 + 15/60), and the minute hand is at 3. The difference is 0.25 hours = 7.5°."
    }
  ];

  // Timer effect
  useEffect(() => {
    let interval = null;
    if (isTimerRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      nextQuestion();
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timeLeft]);

  const handleAnswer = (answer) => {
    console.log("🎯 Answer clicked:", answer);
    setDebugInfo(`Clicked: ${answer}`);
    
    const questionId = questions[currentQuestion].id;
    setAnswers(prev => {
      const newAnswers = {
        ...prev,
        [questionId]: answer
      };
      console.log("📝 Updated answers:", newAnswers);
      return newAnswers;
    });
  };

  const nextQuestion = () => {
    console.log("➡ Next question clicked");
    if (currentQuestion < questions.length - 1) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
        setTimeLeft(120);
        setIsTimerRunning(true);
        setIsTransitioning(false);
        setDebugInfo("");
      }, 300);
    } else {
      const results = calculateResults();
      navigate('/cognitive-results', { state: { results, answers, questions } });
    }
  };

  const calculateResults = () => {
    let correct = 0;
    let totalScore = 0;
    const maxScore = questions.length * 10;

    questions.forEach((q) => {
      if (answers[q.id] === q.correct) {
        correct++;
        totalScore += 10;
      }
    });

    const percentage = (correct / questions.length) * 100;
    let level = "";
    let description = "";

    if (percentage >= 90) {
      level = "Exceptional";
      description = "Your cognitive abilities are outstanding. You demonstrate superior analytical thinking and problem-solving skills.";
    } else if (percentage >= 80) {
      level = "Advanced";
      description = "You have excellent cognitive abilities with strong logical reasoning and pattern recognition skills.";
    } else if (percentage >= 70) {
      level = "Proficient";
      description = "You show solid cognitive abilities with good analytical thinking and reasoning skills.";
    } else if (percentage >= 60) {
      level = "Competent";
      description = "You have adequate cognitive abilities with room for improvement in certain areas.";
    } else {
      level = "Developing";
      description = "Your cognitive abilities are still developing. Focus on practice and learning to improve your skills.";
    }

    return {
      correct,
      total: questions.length,
      percentage,
      score: totalScore,
      maxScore,
      level,
      description
    };
  };

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const isTimeWarning = timeLeft <= 30 && timeLeft > 10;
  const isTimeDanger = timeLeft <= 10;
  const selectedAnswer = answers[currentQ.id];

  return (
    <div className="min-h-screen cyber-mesh-bg text-white overflow-x-hidden">
      {/* Debug Info */}
      <div className="fixed top-20 left-4 z-50 bg-red-500 text-white p-2 rounded text-xs">
        Debug: {debugInfo || "No clicks yet"}
        <br />
        Selected: {selectedAnswer || "None"}
        <br />
        Question: {currentQuestion + 1}
      </div>

      {/* Floating Elements - Fixed with pointer-events-none */}
      <div className="cognitive-floating pointer-events-none">
        <Brain className="text-6xl" />
      </div>
      <div className="cognitive-floating pointer-events-none">
        <Target className="text-5xl" />
      </div>
      <div className="cognitive-floating pointer-events-none">
        <Zap className="text-6xl" />
      </div>
      <div className="cognitive-floating pointer-events-none">
        <Brain className="text-5xl" />
      </div>

      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-40 bg-black/20 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Brain className="w-8 h-8 text-cyan-400 question-type-icon" />
              <h1 className="text-2xl font-bold">Cognitive Assessment</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className={`flex items-center space-x-2 ${isTimeWarning ? 'timer-warning' : ''} ${isTimeDanger ? 'timer-danger' : ''}`}>
                <Clock className="w-5 h-5" />
                <span className="text-lg font-mono">
                  {minutes}:{seconds.toString().padStart(2, '0')}
                </span>
                {isTimeDanger && <AlertTriangle className="w-4 h-4" />}
              </div>
              <div className="text-sm text-gray-300">
                Question {currentQuestion + 1} of {questions.length}
              </div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4 w-full bg-white/10 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full transition-all duration-300 progress-bar"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-32 pb-20 px-4 relative z-30">
        <div className="max-w-4xl mx-auto">
          <Card className={`glass-card border-2 border-white/20 rounded-2xl result-card transition-all duration-300 ${
            isTransitioning ? 'opacity-0 transform translate-x-full pointer-events-none' : 'opacity-100 transform translate-x-0'
          }`}>
            <CardContent className="p-8">
              {/* Question Header */}
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg pulse-glow">
                  {currentQuestion + 1}
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-cyan-400 capitalize">{currentQ.type} Question</h2>
                  <p className="text-gray-300">Question {currentQuestion + 1} of {questions.length}</p>
                </div>
              </div>

              {/* Question */}
              <div className="mb-8 cognitive-question">
                <h3 className="text-2xl font-bold mb-6 leading-relaxed">{currentQ.question}</h3>
              </div>

              {/* Options */}
              <div className="space-y-4 mb-8">
                {currentQ.options.map((option, index) => (
                  <div
                    key={index}
                    onClick={() => handleAnswer(option)}
                    className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-300 cognitive-option cognitive-button transform hover:scale-[1.02] cursor-pointer select-none ${
                      selectedAnswer === option
                        ? 'border-cyan-400 bg-cyan-400/10 text-cyan-400 shadow-lg shadow-cyan-400/20'
                        : 'border-white/20 bg-white/5 hover:border-white/40 hover:bg-white/10'
                    }`}
                    style={{ pointerEvents: 'auto' }}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                        selectedAnswer === option
                          ? 'border-cyan-400 bg-cyan-400 scale-110'
                          : 'border-white/40'
                      }`}>
                        {selectedAnswer === option && (
                          <CheckCircle className="w-4 h-4 text-white animate-pulse" />
                        )}
                      </div>
                      <span className="text-lg">{option}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation */}
              <div className="flex justify-between items-center">
                <div className="text-gray-300">
                  {selectedAnswer && (
                    <div className="flex items-center space-x-2 fade-in-up animate-bounce">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span>Answer selected</span>
                    </div>
                  )}
                </div>
                
                <Button
                  onClick={nextQuestion}
                  disabled={!selectedAnswer}
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-8 py-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 cognitive-button transform hover:scale-105"
                >
                  {currentQuestion === questions.length - 1 ? (
                    <>
                      View Results
                      <Target className="ml-2 w-5 h-5" />
                    </>
                  ) : (
                    <>
                      Next Question
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Tips */}
          <div className="mt-8 text-center">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-lg rounded-full px-6 py-3 fade-in-up">
              <Zap className="w-5 h-5 text-yellow-400" />
              <span className="text-gray-300">Take your time to think through each question carefully</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CognitiveTest;