import React, { useState } from "react";
import { motion } from "framer-motion";
import ChatBotWidget from "../components/ChatBotWidget";
function ProjectSuggester() {
  const [input, setInput] = useState("");
  const [responseData, setResponseData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:8000/suggest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input }),
      });
      const data = await res.json();
      setResponseData(data);
    } catch (err) {
      console.error("Error fetching suggestions:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex flex-col items-center">
      <div> </div>
      <ChatBotWidget/>
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-6"
      >
        Environment Monitoring Project Suggestion Tool
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="w-full max-w-xl"
      >
        <textarea
          placeholder="Enter your project idea or domain..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="mb-4 w-full p-3 bg-gray-800 border border-gray-600 rounded text-white resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={4}
        />
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded text-white font-semibold transition duration-200"
        >
          {loading ? "Generating Suggestions..." : "Get Suggestions"}
        </button>
      </motion.div>

      {responseData && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-10 w-full max-w-4xl space-y-6"
        >
          {responseData.suggestions?.map((s, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * index }}
              className="bg-gray-800 border border-gray-700 rounded-lg p-5 shadow-md"
            >
              <div className="text-green-400 text-sm mb-2">Suggestion #{index + 1}</div>
              <h2 className="text-xl font-bold mb-2 text-white">{s.title}</h2>
              <p className="text-gray-300 mb-2"><span className="font-semibold text-gray-400">Category:</span> {s.category}</p>
              <p className="text-gray-300"><span className="font-semibold text-gray-400">Description:</span> {s.description}</p>
            </motion.div>
          ))}

          {/* <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-green-400">Complete JSON Response</h2>
            <pre className="whitespace-pre-wrap break-words text-sm text-gray-200 bg-gray-900 p-4 rounded border border-gray-700 overflow-x-auto">
              {JSON.stringify(responseData, null, 2)}
            </pre>
          </div> */}
        </motion.div>
      )}
    </div>
  );
}

// ✅ Don't forget this!
export default ProjectSuggester;
