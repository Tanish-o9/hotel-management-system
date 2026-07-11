import { useState, useRef, useEffect } from "react";
import { FaTimes, FaPaperPlane, FaRobot, FaSpinner } from "react-icons/fa";
import { chatWithAI } from "../services/gemini";

interface Message {
  role: "user" | "model";
  text: string;
}

const SUGGESTIONS = [
  "Best hotels in Goa under ₹3000",
  "Luxury hotels in Mumbai",
  "Family friendly hotels in Jaipur",
  "Recommend a hotel for honeymoon",
];

const ChatBot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "model", text: "Hi! I'm **Find With Me** 🏨\nYour AI hotel assistant. Ask me anything about hotels, travel tips, or recommendations across India!" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  const send = async (text: string) => {
    if (!text.trim() || loading) return;
    const userMsg: Message = { role: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);
    try {
      const history = messages.filter((m) => m.role === "user" || m.role === "model").map((m) => ({ role: m.role, text: m.text }));
      const reply = await chatWithAI(text, history);
      setMessages((prev) => [...prev, { role: "model", text: reply }]);
    } catch (e: any) {
      setMessages((prev) => [...prev, { role: "model", text: `❌ Error: ${e.message}` }]);
    } finally {
      setLoading(false);
    }
  };

  const formatText = (text: string) =>
    text
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(/\n/g, "<br/>");

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-[999] flex h-14 w-14 items-center justify-center rounded-full bg-amber-500 shadow-2xl transition hover:bg-amber-400 hover:scale-110"
      >
        {open ? <FaTimes size={20} className="text-white" /> : <FaRobot size={22} className="text-white" />}
      </button>

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-24 right-6 z-[998] flex w-[360px] flex-col rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl overflow-hidden"
          style={{ height: "520px" }}>

          {/* Header */}
          <div className="flex items-center gap-3 bg-slate-800 px-4 py-3 border-b border-slate-700">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-500">
              <FaRobot size={16} className="text-white" />
            </div>
            <div>
              <p className="text-sm font-black text-white">Find With Me</p>
              <p className="text-xs text-green-400 flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-green-400 inline-block" /> Online
              </p>
            </div>
            <button onClick={() => setOpen(false)} className="ml-auto text-slate-400 hover:text-white">
              <FaTimes size={14} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                {m.role === "model" && (
                  <div className="mr-2 mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-500">
                    <FaRobot size={12} className="text-white" />
                  </div>
                )}
                <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-6 ${
                  m.role === "user"
                    ? "bg-amber-500 text-white rounded-tr-sm"
                    : "bg-slate-800 text-slate-200 rounded-tl-sm border border-slate-700"
                }`}
                  dangerouslySetInnerHTML={{ __html: formatText(m.text) }}
                />
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="mr-2 mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-500">
                  <FaRobot size={12} className="text-white" />
                </div>
                <div className="rounded-2xl rounded-tl-sm border border-slate-700 bg-slate-800 px-4 py-3">
                  <FaSpinner className="animate-spin text-amber-400" size={14} />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Suggestions */}
          {messages.length <= 1 && (
            <div className="px-4 pb-2 flex flex-wrap gap-2">
              {SUGGESTIONS.map((s) => (
                <button key={s} onClick={() => send(s)}
                  className="rounded-full border border-slate-600 bg-slate-800 px-3 py-1 text-xs text-slate-300 hover:border-amber-500 hover:text-amber-400 transition">
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="border-t border-slate-700 px-3 py-3 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send(input)}
              placeholder="Ask about hotels..."
              className="flex-1 rounded-xl border border-slate-600 bg-slate-800 px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none focus:border-amber-500"
            />
            <button onClick={() => send(input)} disabled={loading || !input.trim()}
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500 text-white transition hover:bg-amber-400 disabled:opacity-40">
              <FaPaperPlane size={14} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
