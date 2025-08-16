import React, { useState, useEffect, useRef } from "react";
import { Upload, Send, MessageCircle } from "lucide-react";
import axios from "axios";

const Chat = ({ onFileUploadClick }) => {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hello! I'm here to help you. You can chat with me or upload documents for analysis." }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);
  const sessionId = "default";

  const scrollToBottom = () => chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages([...messages, userMessage]);
    const currentInput = input;
    setInput("");
    setIsTyping(true);

    try {
      const res = await axios.post("http://127.0.0.1:5000/chat", {
        message: currentInput,
        session_id: sessionId
      });
      
      const reply = { role: "assistant", content: res.data.reply };
      setMessages((prev) => [...prev, reply]);
    } catch (err) {
      console.error(err);
      const errorMsg = { role: "assistant", content: "Error: Could not get response. Please check your connection." };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-slate-50 to-white shadow-2xl rounded-2xl overflow-hidden border border-slate-200">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 flex items-center gap-3">
        <div className="bg-white/20 p-2 rounded-full">
          <MessageCircle size={24} />
        </div>
        <div>
          <h1 className="text-xl font-bold">AI Assistant</h1>
          <p className="text-blue-100 text-sm">Always here to help</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-auto p-6 space-y-4 bg-gradient-to-b from-slate-50/50 to-transparent">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl shadow-sm ${
                msg.role === "user"
                  ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-br-md"
                  : "bg-white border border-slate-200 text-slate-800 rounded-bl-md"
              }`}
            >
              <p className="text-sm leading-relaxed">{msg.content}</p>
            </div>
          </div>
        ))}
        
        {/* Typing indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white border border-slate-200 text-slate-800 px-4 py-3 rounded-2xl rounded-bl-md shadow-sm">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={chatEndRef}></div>
      </div>

      {/* Input */}
      <div className="p-4 border-t border-slate-200 bg-white">
        <div className="flex items-center gap-3">
          <button
            onClick={onFileUploadClick}
            className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
            title="Upload file"
          >
            <Upload size={20} />
          </button>
          <div className="flex-1 relative">
            <input
              type="text"
              className="w-full border border-slate-300 rounded-full px-4 py-2 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-slate-400"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type your message..."
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;