// src/app/api/tarot-chat/route.ts
export const runtime = "nodejs"; // atau "edge" juga boleh

type Payload = { prompt?: string; userMessage?: string };

export async function POST(req: Request) {
  try {
    const { prompt, userMessage }: Payload = await req
      .json()
      .catch(() => ({} as Payload));

    // fallback kalau body kosong
    if (!prompt && !userMessage) {
      return Response.json(
        { reply: "Server: body request kosong." },
        { status: 200 }
      );
    }

    const API_KEY = process.env.GROQ_API_KEY;
    const API_URL =
      process.env.GROQ_API_URL ??
      "https://api.groq.com/openai/v1/chat/completions";
    const MODEL = process.env.GROQ_MODEL ?? "llama-3.1-8b-instant";

    // Jika belum set API key, balikan dummy supaya UI tidak error
    if (!API_KEY) {
      const dummy =
        `DEMO (tanpa API key):\n\nPertanyaan: ${userMessage ?? "-"}\n` +
        `Prompt ringkas: ${(prompt ?? "").slice(0, 200)}...`;
      return Response.json({ reply: dummy }, { status: 200 });
    }

    // Panggil Groq (format OpenAI-compatible)
    const body = {
      model: MODEL,
      messages: [
        {
          role: "system",
          content: "Anda adalah penafsir tarot profesional. Hangat & membantu.",
        },
        {
          role: "user",
          content: `${prompt ?? ""}\n\nUser: ${userMessage ?? ""}`,
        },
      ],
      temperature: 0.7,
    };

    const r = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify(body),
    });

    // Jika provider error, tetap balikan teks agar UI tidak 'Terjadi kesalahan'
    if (!r.ok) {
      const txt = await r.text();
      console.error("Provider error:", r.status, txt);
      return Response.json(
        { reply: `Server error (${r.status}): ${txt}` },
        { status: 200 }
      );
    }

    const data = await r.json();
    const reply =
      data?.choices?.[0]?.message?.content ??
      data?.output?.[0]?.content ??
      data?.result ??
      "Model tidak memberi jawaban.";

    return Response.json({ reply }, { status: 200 });
  } catch (err) {
    console.error("tarot-chat internal:", err);
    return Response.json(
      { reply: "Internal error di server. Coba lagi ya." },
      { status: 200 }
    );
  }
}
