import React, { useState, useEffect, useRef } from "react";
import { marked } from "marked";

function ChatBotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem("chat_history");
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState("");
  const [skillLevel, setSkillLevel] = useState("beginner");
  const [domain, setDomain] = useState("coding");
  const [mode, setMode] = useState("ideas");
  const scrollRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("chat_history", JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = { sender: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    try {
      const res = await fetch("http://localhost:5000/api/chatbot/generate-projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input, skillLevel, domain, mode }),
      });

      const data = await res.json();
      const aiMsg = { sender: "ai", content: data.result };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      const errorMsg = { sender: "ai", content: "⚠️ Error fetching response." };
      setMessages((prev) => [...prev, errorMsg]);
    }
  };

  return (
    <>
      {/* Floating Chat Icon */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen && (
          <button
            className="bg-blue-600 text-white rounded-full p-4 shadow-xl hover:bg-blue-700 transition"
            onClick={() => setIsOpen(true)}
            title="Open AI Assistant"
          >
            💬
          </button>
        )}
      </div>

      {/* Chat Modal */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 z-50 w-full max-w-md bg-[#1f1f1f] text-white rounded-xl shadow-lg flex flex-col h-[80vh]">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700 bg-[#2c2c2c] rounded-t-xl">
            <h3 className="text-lg font-semibold">AI DIY Assistant</h3>
            <button onClick={() => setIsOpen(false)} className="text-white text-xl">✖</button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4">
            {messages.map((msg, i) => (
              <div key={i} className={`mb-4 ${msg.sender === "user" ? "text-right" : "text-left"}`}>
                <div
                  className={`inline-block px-4 py-2 rounded-lg max-w-xl whitespace-pre-wrap text-sm leading-relaxed
                  ${msg.sender === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-black dark:bg-[#252525] dark:text-white"
                    }`}
                  dangerouslySetInnerHTML={{ __html: marked(msg.content || "") }}
                />
              </div>
            ))}
          </div>

          {/* Input Box */}
          <div className="py-4 px-4 flex">
            <input
              type="text"
              placeholder="Ask for a project idea or get help..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 mr-3 pl-4 border outline-none bg-[#212121] p-2 rounded text-white"
            />
            <button
              onClick={handleSend}
              className="bg-black font-bold text-white px-4 py-2 rounded hover:bg-gray-800"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default ChatBotWidget;
