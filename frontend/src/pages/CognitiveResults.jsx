import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { Card, CardContent } from "../components/Card";
import { 
  Brain, 
  Trophy, 
  Target, 
  TrendingUp, 
  CheckCircle, 
  XCircle, 
  // ArrowRight,
  Home,
  BarChart3,
  Lightbulb,
  Star,
  Award
} from "lucide-react";

const CognitiveResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [animateScore, setAnimateScore] = useState(0);
  const [showDetails, setShowDetails] = useState(false);

  const { results, answers, questions } = location.state || {};

  useEffect(() => {
    if (results) {
      // Animate the score
      const timer = setTimeout(() => setAnimateScore(results.percentage), 500);
      return () => clearTimeout(timer);
    }
  }, [results]);

  useEffect(() => {
    if (animateScore > 0) {
      const timer = setTimeout(() => setShowDetails(true), 1000);
      return () => clearTimeout(timer);
    }
  }, [animateScore]);

  if (!results) {
    return (
      <div className="min-h-screen cyber-mesh-bg text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">No Results Found</h1>
          <Button onClick={() => navigate('/cognitive-test')}>
            Take the Test
          </Button>
        </div>
      </div>
    );
  }

  const getLevelColor = (level) => {
    switch (level) {
      case "Exceptional": return "from-yellow-400 to-orange-500";
      case "Advanced": return "from-purple-400 to-pink-500";
      case "Proficient": return "from-green-400 to-teal-500";
      case "Competent": return "from-blue-400 to-cyan-500";
      default: return "from-gray-400 to-slate-500";
    }
  };

  const getLevelIcon = (level) => {
    switch (level) {
      case "Exceptional": return <Trophy className="w-8 h-8" />;
      case "Advanced": return <Star className="w-8 h-8" />;
      case "Proficient": return <Award className="w-8 h-8" />;
      case "Competent": return <Target className="w-8 h-8" />;
      default: return <Brain className="w-8 h-8" />;
    }
  };

  const getRecommendations = (level) => {
    switch (level) {
      case "Exceptional":
        return [
          "Consider advanced problem-solving challenges",
          "Explore complex algorithmic thinking",
          "Mentor others to enhance your skills further"
        ];
      case "Advanced":
        return [
          "Focus on specialized cognitive domains",
          "Practice advanced pattern recognition",
          "Engage in competitive problem-solving"
        ];
      case "Proficient":
        return [
          "Strengthen weak areas through targeted practice",
          "Explore new cognitive domains",
          "Challenge yourself with complex problems"
        ];
      case "Competent":
        return [
          "Practice regularly to improve speed and accuracy",
          "Focus on fundamental problem-solving strategies",
          "Build confidence through consistent practice"
        ];
      default:
        return [
          "Start with basic cognitive exercises",
          "Practice pattern recognition daily",
          "Build a strong foundation through repetition"
        ];
    }
  };

  return (
    <div className="min-h-screen cyber-mesh-bg text-white overflow-x-hidden">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Brain className="w-8 h-8 text-cyan-400" />
              <h1 className="text-2xl font-bold">Cognitive Assessment Results</h1>
            </div>
            <Button
              onClick={() => navigate('/')}
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10"
            >
              <Home className="w-4 h-4 mr-2" />
              Home
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          
          {/* Score Overview */}
          <Card className="glass-card border-2 border-white/20 rounded-2xl mb-8 result-card">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <div className="flex items-center justify-center space-x-3 mb-4">
                  {getLevelIcon(results.level)}
                  <h2 className="text-3xl font-bold">Your Cognitive Level</h2>
                </div>
                <div className={`text-6xl font-bold bg-gradient-to-r ${getLevelColor(results.level)} bg-clip-text text-transparent mb-4`}>
                  {results.level}
                </div>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                  {results.description}
                </p>
              </div>

              {/* Score Circle */}
              <div className="flex justify-center mb-8">
                <div className="relative score-circle">
                  <svg className="w-48 h-48 transform -rotate-90">
                    <circle
                      cx="96"
                      cy="96"
                      r="80"
                      stroke="rgba(255,255,255,0.1)"
                      strokeWidth="8"
                      fill="none"
                    />
                    <circle
                      cx="96"
                      cy="96"
                      r="80"
                      stroke="url(#gradient)"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={2 * Math.PI * 80}
                      strokeDashoffset={2 * Math.PI * 80 * (1 - animateScore / 100)}
                      className="transition-all duration-2000 ease-out chart-animation"
                      style={{ '--percentage': animateScore }}
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#06b6d4" />
                        <stop offset="100%" stopColor="#3b82f6" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-white">
                        {Math.round(animateScore)}%
                      </div>
                      <div className="text-gray-300">
                        {results.correct}/{results.total} Correct
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Score Details */}
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-white/5 rounded-xl fade-in-up" style={{ animationDelay: '0.2s' }}>
                  <div className="text-2xl font-bold text-cyan-400">{results.correct}</div>
                  <div className="text-gray-300">Correct Answers</div>
                </div>
                <div className="text-center p-4 bg-white/5 rounded-xl fade-in-up" style={{ animationDelay: '0.4s' }}>
                  <div className="text-2xl font-bold text-blue-400">{results.total - results.correct}</div>
                  <div className="text-gray-300">Incorrect Answers</div>
                </div>
                <div className="text-center p-4 bg-white/5 rounded-xl fade-in-up" style={{ animationDelay: '0.6s' }}>
                  <div className="text-2xl font-bold text-green-400">{results.score}</div>
                  <div className="text-gray-300">Total Score</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Question Analysis */}
          {showDetails && (
            <Card className="glass-card border-2 border-white/20 rounded-2xl mb-8 result-card">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6 flex items-center">
                  <BarChart3 className="w-6 h-6 mr-3 text-cyan-400 question-type-icon" />
                  Question Analysis
                </h3>
                <div className="space-y-4">
                  {questions.map((question, index) => {
                    const isCorrect = answers[index] === question.correct;
                    return (
                      <div key={index} className="p-4 bg-white/5 rounded-xl border border-white/10 fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                        <div className="flex items-start space-x-4">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                            isCorrect ? 'bg-green-500' : 'bg-red-500'
                          }`}>
                            {isCorrect ? (
                              <CheckCircle className="w-5 h-5 text-white" />
                            ) : (
                              <XCircle className="w-5 h-5 text-white" />
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <span className="text-sm font-semibold text-cyan-400 capitalize">
                                {question.type}
                              </span>
                              <span className="text-gray-400">•</span>
                              <span className="text-sm text-gray-300">
                                Question {index + 1}
                              </span>
                            </div>
                            <p className="text-white mb-2">{question.question}</p>
                            <div className="text-sm">
                              <span className="text-gray-400">Your answer: </span>
                              <span className={`font-semibold ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                                {answers[index]}
                              </span>
                              {!isCorrect && (
                                <>
                                  <span className="text-gray-400 ml-2">• Correct: </span>
                                  <span className="text-green-400 font-semibold">{question.correct}</span>
                                </>
                              )}
                            </div>
                            <div className="mt-2 p-3 bg-white/5 rounded-lg">
                              <p className="text-sm text-gray-300">
                                <span className="text-cyan-400 font-semibold">Explanation: </span>
                                {question.explanation}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Recommendations */}
          {showDetails && (
            <Card className="glass-card border-2 border-white/20 rounded-2xl mb-8 result-card">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6 flex items-center">
                  <Lightbulb className="w-6 h-6 mr-3 text-yellow-400 question-type-icon" />
                  Personalized Recommendations
                </h3>
                <div className="grid md:grid-cols-1 gap-4">
                  {getRecommendations(results.level).map((recommendation, index) => (
                    <div key={index} className="flex items-center space-x-3 p-4 bg-white/5 rounded-xl recommendation-item" style={{ '--index': index }}>
                      <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                      <span className="text-gray-300">{recommendation}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => navigate('/cognitive-test')}
              className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-8 py-4 text-lg rounded-xl cognitive-button"
            >
              <Target className="w-5 h-5 mr-2" />
              Retake Test
            </Button>
            <Button
              onClick={() => navigate('/dashboard')}
              variant="outline"
              className="border-2 border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg rounded-xl cognitive-button"
            >
              <TrendingUp className="w-5 h-5 mr-2" />
              Go to Dashboard
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CognitiveResults;