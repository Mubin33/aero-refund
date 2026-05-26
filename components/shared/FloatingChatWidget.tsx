"use client";

import { Bot, Send, X } from "lucide-react";
import { useState } from "react";

export default function FloatingChatWidget() {
  const [open, setOpen] = useState(false);

  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi 👋 How can I help you today?",
      sender: "bot",
    },
  ]);

  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessage = {
      id: Date.now(),
      text: input,
      sender: "user",
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput("");

    // Fake bot reply
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: "Thanks for your message! Our AI assistant will reply soon.",
          sender: "bot",
        },
      ]);
    }, 700);
  };

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-[999]">
        <button
          onClick={() => setOpen(!open)}
          className="group relative flex items-center"
        >
          {/* Text Bubble */}
          <div className="hidden sm:flex h-[38px] rounded-l-full bg-[#F2B124] px-5 pr-12 items-center shadow-xl">
            <span className="text-[15px] font-semibold text-white whitespace-nowrap">
              Live Chat with PP AI
            </span>
          </div>

          {/* Circle Icon */}
          <div className="relative sm:absolute sm:-right-4 flex h-[58px] w-[58px] items-center justify-center rounded-full bg-[#F2B124] shadow-2xl transition-transform duration-300 group-hover:scale-105">
            {open ? (
              <X className="h-6 w-6 text-white" />
            ) : (
              <Bot className="h-6 w-6 text-white" />
            )}
          </div>
        </button>
      </div>

      {/* Chat Box */}
      {open && (
        <div className="fixed bottom-20 right-4 md:bottom-24 md:right-6 z-[999] w-[calc(100vw-32px)] max-w-[360px] overflow-hidden rounded-3xl border border-white/10 bg-white shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between bg-[#F2B124] px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                <Bot className="h-5 w-5 text-white" />
              </div>

              <div>
                <h3 className="text-sm font-semibold text-white">
                  PP AI Assistant
                </h3>
                <p className="text-xs text-white/80">Online now</p>
              </div>
            </div>

            <button
              onClick={() => setOpen(false)}
              className="text-white/80 transition hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="h-[320px] space-y-4 overflow-y-auto bg-[#F8F8F8] p-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.sender === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${
                    msg.sender === "user"
                      ? "rounded-br-md bg-[#F2B124] text-white"
                      : "rounded-bl-md bg-white text-gray-700 shadow"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="border-t bg-white p-3">
            <div className="flex items-center gap-2 rounded-full border border-gray-200 px-3 py-2">
              <input
                type="text"
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && handleSend()
                }
                className="flex-1 bg-transparent text-sm outline-none"
              />

              <button
                onClick={handleSend}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F2B124] text-white transition hover:scale-105"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}