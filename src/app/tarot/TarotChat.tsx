"use client";

import { useEffect, useRef, useState } from "react";

type Role = "user" | "bot";
type ChatMsg = { role: Role; text: string };

export default function TarotChat({ prompt = "" }: { prompt?: string }) {
  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const viewportRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll ke bawah tiap ada pesan baru
  useEffect(() => {
    const el = viewportRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages]);

  async function sendMessage() {
    const q = input.trim();
    if (!q || loading) return;

    setLoading(true);
    setMessages((prev) => [...prev, { role: "user", text: q }]);

    try {
      const API_KEY = process.env.NEXT_PUBLIC_GROQ_API_KEY; // ⬅️ pakai key publik khusus demo
      const API_URL = "https://api.groq.com/openai/v1/chat/completions";
      const MODEL = "llama-3.1-8b-instant";

      if (!API_KEY) {
        setMessages((prev) => [
          ...prev,
          { role: "bot", text: "DEMO MODE: NEXT_PUBLIC_GROQ_API_KEY belum di-set." },
        ]);
        return;
      }

      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          model: MODEL,
          messages: [
            { role: "system", content: "Anda adalah penafsir tarot profesional. Hangat & membantu." },
            { role: "user", content: `${prompt}\n\nUser: ${q}` },
          ],
          temperature: 0.7,
        }),
      });

      if (!res.ok) {
        const txt = await res.text();
        setMessages((prev) => [
          ...prev,
          { role: "bot", text: `Server error (${res.status}): ${txt}` },
        ]);
      } else {
        const data = await res.json();
        const bot: string =
          data?.choices?.[0]?.message?.content ?? "Model tidak memberi jawaban.";
        setMessages((prev) => [...prev, { role: "bot", text: bot }]);
      }
    } catch (err) {
      console.error(err);
      setMessages((prev) => [...prev, { role: "bot", text: "Gagal terhubung ke AI." }]);
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
          type="button"
          onClick={resetChat}
          className="px-2 py-1 text-xs rounded-lg border hover:bg-neutral-100"
        >
          Reset
        </button>
      </div>

      {/* Riwayat chat */}
      <div
        ref={viewportRef}
        className="flex-1 overflow-y-auto space-y-2 text-sm mb-2 max-h-80 pr-1"
        aria-live="polite"
      >
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
        {messages.length === 0 && (
          <p className="text-xs text-neutral-500">
            Mulai percakapan—tulis pertanyaanmu tentang tarot di bawah.
          </p>
        )}
      </div>

      {/* Input */}
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Tanya lebih lanjut…"
          className="flex-1 rounded-xl border px-3 py-2 text-sm"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey && !loading) {
              e.preventDefault();
              sendMessage();
            }
          }}
          disabled={loading}
        />
        <button
          type="button"
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
