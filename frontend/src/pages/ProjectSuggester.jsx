import React, { useState } from "react";
import { motion } from "framer-motion";

function ProjectSuggester() {
  const [input, setInput] = useState("");
  const [responseData, setResponseData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:8000/suggest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input }),
      });
      const data = await res.json();
      setResponseData(data);
    } catch (err) {
      console.error("Error fetching suggestions:", err);
    } finally {
      setLoading(false);
    }
  };

  const examplePrompts = [
    "Give me a real-world project idea I can build.",
    "Propose a smart automation project for everyday tasks or businesses.",
    "Suggest an industry-level project to enhance my portfolio.",
  ];

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden text-white px-4 bg-black">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-gradient-to-br from-[#0d0d2b] via-[#00001a] to-[#000000] opacity-90" />
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full animate-sparkle"
              style={{
                width: `${Math.random() * 2 + 1.5}px`,
                height: `${Math.random() * 2 + 1.5}px`,
                backgroundColor: "rgba(255,255,255,0.7)",
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDuration: `${3 + Math.random() * 4}s`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Animated Blobs */}
      <motion.div
        className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] rounded-full bg-pink-500 opacity-30 mix-blend-screen filter blur-3xl z-0"
        animate={{ x: [0, 40, -40, 0], y: [0, 30, -30, 0] }}
        transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-120px] right-[-120px] w-[400px] h-[400px] rounded-full bg-purple-700 opacity-30 mix-blend-screen filter blur-3xl z-0"
        animate={{ x: [0, -40, 40, 0], y: [0, -30, 30, 0] }}
        transition={{ repeat: Infinity, duration: 14, ease: "easeInOut" }}
      />

      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-3xl bg-white/5 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-purple-700/40 z-10"
      >
        {/* Glowing orb */}
        <motion.div
          animate={{ scale: [1, 1.1, 1], rotate: [0, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          className="flex justify-center mb-6"
        >
          <div className="h-20 w-20 rounded-full bg-gradient-to-tr from-pink-500 via-purple-500 to-indigo-500 animate-pulse shadow-2xl shadow-purple-800/40" />
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-2xl md:text-3xl font-semibold text-white text-center mb-8"
        >
          Real-world impact starts with one idea. <br /> Want one?
        </motion.h1>

        {/* Prompt Buttons */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
          className="mb-10 flex flex-col md:flex-row gap-4 justify-center"
        >
          {examplePrompts.map((prompt, i) => (
            <motion.button
              key={i}
              onClick={() => setInput(prompt)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              className="bg-white/10 border border-purple-400/40 text-base font-medium text-purple-100 px-6 py-3 rounded-xl transition hover:bg-purple-700/40"
            >
              {prompt}
            </motion.button>
          ))}
        </motion.div>

        {/* Input */}
        <div className="relative mt-4">
          <input
            type="text"
            placeholder="Suggest a real-world project idea"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full py-3 px-5 pr-12 rounded-full border border-purple-700 bg-purple-900/30 text-purple-100 placeholder-purple-400 shadow-inner focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
          />
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 text-purple-300 hover:text-purple-500 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </button>
        </div>

        {/* Show corrected prompt */}
        {responseData?.corrected_prompt && (
          <p className="text-center text-purple-300 mt-6 italic text-sm">
            Did you mean: <span className="font-semibold">{responseData.corrected_prompt}</span>?
          </p>
        )}

        {/* Loading message */}
        {loading && (
          <div className="text-center text-purple-400 mt-6 animate-pulse">
            Thinking of the best ideas for you...
          </div>
        )}

        {/* Cards Section */}
        {responseData?.suggestions && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-10"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {responseData.suggestions.map((s, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-xl hover:shadow-purple-700/40 hover:border-purple-500 transition-all"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-semibold text-purple-300">
                      Suggestion #{index + 1}
                    </span>
                    <button
                      onClick={() =>
                        navigator.clipboard.writeText(`${s.Title} - ${s.Description}`)
                      }
                      title="Copy suggestion"
                      className="text-purple-300 hover:text-purple-500 transition"
                    >
                      📋
                    </button>
                  </div>
                  <h2 className="text-lg font-bold text-white mb-2">{s.Title}</h2>
                  <div className="text-xs px-2 py-1 rounded-full bg-purple-900/40 text-purple-300 font-medium mb-3 inline-block">
                    {s.Domain}
                  </div>
                  <p className="text-sm text-purple-100 leading-relaxed">
                    {s.Description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Sparkle CSS */}
      <style>{`
        @keyframes sparkle {
          0% { transform: translate(0, 0) scale(1); opacity: 0.8; }
          50% { transform: translate(5px, -5px) scale(1.2); opacity: 1; }
          100% { transform: translate(-5px, 5px) scale(1); opacity: 0.8; }
        }
        .animate-sparkle {
          animation-name: sparkle;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }
      `}</style>
    </div>
  );
}

export default ProjectSuggester;
