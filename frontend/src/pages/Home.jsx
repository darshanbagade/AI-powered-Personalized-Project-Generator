import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/Button";
import { Card, CardContent } from "../components/Card";
import {
  ArrowDown,
  Code,
  User,
  MessageSquare,
  Search,
  BookOpen,
  Zap,
  Shield,
  Lock,
  Eye,
  Key,
  Fingerprint
} from "lucide-react";
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import 'remixicon/fonts/remixicon.css'
import { useAuth } from '../context/AuthContext'

const Home = () => {
  const [scrollY, setScrollY] = useState(0);
  const { isAuthenticated } = useAuth()

  console.log(isAuthenticated)
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const features = [
    {
      icon: BookOpen,
      title: "Concept-Based Learning",
      description:
        "Master fundamental concepts through interactive tutorials and real-world applications."
    },
    {
      icon: Search,
      title: "Assessment Quiz",
      description:
        "Personalized quizzes that adapt to your skill level and learning pace."
    },
    {
      icon: Code,
      title: "Project Recommendations",
      description:
        "AI-powered suggestions for projects that match your interests and skill level."
    },
    {
      icon: MessageSquare,
      title: "Chatbot Guidance",
      description:
        "24/7 AI assistant to help you overcome coding challenges and provide hints."
    },
    {
      icon: Zap,
      title: "Smart Hints System",
      description:
        "Progressive hint system that guides you to solutions without giving everything away."
    },
    {
      icon: User,
      title: "Personalized Journey",
      description:
        "Tailored learning path based on your goals, preferences, and progress."
    }
  ];

  const [showContent, setShowContent] = useState(false);
  useGSAP(() => {
    const tl = gsap.timeline();
    tl.to('.vi-mask-group', {
      rotate: 10,
      duration: 2,
      ease: 'power4.easeInOut',
      transformOrigin: '50% 50%',
    })

    tl.to('.vi-mask-group', {
      scale: 10,
      duration: 2,
      delay: -1.8,
      ease: 'Expo.easeInOut',
      transformOrigin: '50% 50%',
      opacity: 0,
      onUpdate: function () {
        if (this.progress() >= .9) {
          document.querySelector('.svg').remove();
          setShowContent(true);
          this.kill();
        }
      }
    })

  })
  return (<>
    <div className="svg flex items-center justify-center fixed top-0 left-0 z-[100] w-full h-screen overflow-hidden bg-[#000]">
      <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
        <defs>
          <mask id="viMask">
            <rect width="100%" height="100%" fill="black" />
            <g className="vi-mask-group">
              <text
                x="50%"
                y="50%"
                fontSize="250"
                textAnchor="middle"
                fill="white"
                dominantBaseline="middle"
                fontFamily="Arial Black"
              >
                GG
              </text>
            </g>
          </mask>
        </defs>
        <image
          href="./bg.png"
          width="100%"
          height="100%"
          preserveAspectRatio="xMidYMid slice"
          mask="url(#viMask)"
        />
      </svg>
    </div>
    <div className="min-h-screen cyber-mesh-bg text-white overflow-x-hidden">
      {/* Floating Security Icons */}
      <div className="security-icons">
        <Shield className="security-icon text-4xl" />
        <Lock className="security-icon text-3xl" />
        <Eye className="security-icon text-4xl" />
        <Key className="security-icon text-3xl" />
        <Fingerprint className="security-icon text-4xl" />
      </div>
      
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 w-full">
        <div className="flex justify-end w-full absolute top-0">
          <Link to="/suggest-project">
            <Button
              size="lg"
              variant="outline"
              className="glass-card border-2 border-white/30 text-white hover:bg-white/10 mr-10 mt-7 px-8 py-4 text-lg rounded-xl backdrop-blur-lg transition-all duration-300 security-border"
            >
              Go Real World
            </Button>
          </Link>
        </div>
        <div className="text-center z-10 max-w-4xl mx-auto">
          <div className="animate-fade-in">
            <h1 className="text-6xl md:text-8xl font-bold mb-6 privacy-text animate-pulse">
              Build Your Future
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-300 leading-relaxed">
              AI-powered DIY project recommendations that adapt to your learning style and help you master technology through hands-on experience.
            </p>
            <Link to="/login">
              <Button
                size="lg"
                className="privacy-gradient text-white px-12 py-6 text-xl rounded-2xl shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105 group"
              >
                Try Me Now
                <ArrowDown className="ml-2 group-hover:translate-y-1 transition-transform duration-300" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Enhanced Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full opacity-20 animate-pulse blur-sm" />
        <div
          className="absolute bottom-32 right-16 w-16 h-16 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full opacity-20 animate-pulse blur-sm"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 right-10 w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-20 animate-pulse blur-sm"
          style={{ animationDelay: "2s" }}
        />
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6 privacy-text">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Everything you need to accelerate your learning journey and build amazing projects
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={feature.title}
                  className="glass-card hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl group rounded-2xl"
                  style={{
                    animationDelay: `${index * 0.1}s`,
                    transform: `translateY(${Math.sin(scrollY * 0.01 + index) * 10}px)`
                  }}
                >
                  <CardContent className="p-8 text-center">
                    <Icon className="w-12 h-12 mx-auto mb-4 text-cyan-400 group-hover:text-pink-400 transition-colors duration-300" />
                    <h3 className="text-xl font-semibold mb-3 text-white">{feature.title}</h3>
                    <p className="text-gray-300 group-hover:text-white transition-colors duration-300">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 text-center relative">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Ready to Start Building?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of learners who are already building their future with AI-powered guidance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button
                size="lg"
                className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-8 py-4 text-lg rounded-xl shadow-xl hover:shadow-cyan-500/25 transition-all duration-300"
              >
                Get Started Free
              </Button>
            </Link>
            <Link to="/login">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg rounded-xl backdrop-blur-lg transition-all duration-300"
              >
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  </>
  );
};

export default Home;
