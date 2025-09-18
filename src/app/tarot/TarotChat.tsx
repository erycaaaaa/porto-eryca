"use client";

import { TarotButtonLink } from "@/components/case/TarrotButton";
import { useState } from "react";

export default function TarotChat({ prompt }: { prompt: string }) {
  const [messages, setMessages] = useState<{ role: "user" | "bot"; text: string }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    if (!input || loading) return;
    setLoading(true);
    setMessages((m) => [...m, { role: "user", text: input }]);

    try {
      const res = await fetch("/api/tarot-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, userMessage: input }),
      });
      const data = await res.json();
      const bot = data.reply ?? "Terjadi kesalahan.";
      setMessages((m) => [...m, { role: "bot", text: bot }]);
    } catch {
      setMessages((m) => [...m, { role: "bot", text: "Gagal terhubung ke AI." }]);
    } finally {
      setInput("");
      setLoading(false);
    }
  }

  function resetChat() {
    setMessages([]);
  }

  return (
    <div className="rounded-2xl border bg-white/70 p-4 shadow-sm flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold">Chat Tarot AI</h3>
        <button
          onClick={resetChat}
          className="px-2 py-1 text-xs rounded-lg border hover:bg-neutral-100"
        >
          Reset
        </button>
      </div>

      <div className="flex-1 overflow-y-auto space-y-2 text-sm mb-2 max-h-80 pr-1">
        {messages.map((msg, i) => (
          <div key={i} className={msg.role === "user" ? "text-right" : "text-left"}>
            <span
              className={`inline-block px-3 py-2 rounded-xl ${
                msg.role === "user" ? "bg-black text-white" : "bg-neutral-200"
              }`}
            >
              {msg.text}
            </span>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Tanya lebih lanjut..."
          className="flex-1 rounded-xl border px-3 py-2 text-sm"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey && !loading) {
              e.preventDefault();
              sendMessage();
            }
          }}
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          className="px-4 py-2 rounded-xl bg-black text-white hover:bg-neutral-900 transition disabled:opacity-60"
        >
          {loading ? "..." : "Kirim"}
        </button>
      </div>
    </div>
  );
}
  <TarotButtonLink/>