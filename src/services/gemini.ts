const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent`;

const SYSTEM_PROMPT = `You are "Find With Me", a friendly AI hotel assistant for "Find My Hotel" — a hotel discovery platform in India.
You help users with finding hotels, recommendations, travel tips, pricing, and bookings across Indian cities like Mumbai, Delhi, Bengaluru, Chennai, Hyderabad, Kolkata, Jaipur, Goa, Pune, Ahmedabad, Gurgaon, Noida.
Keep responses concise, friendly and helpful. Use emojis occasionally.`;

export const chatWithAI = async (
  userMessage: string,
  history: { role: string; text: string }[]
): Promise<string> => {
  const contents = [
    { role: "user", parts: [{ text: SYSTEM_PROMPT }] },
    { role: "model", parts: [{ text: "Got it! I'm Find With Me, your hotel assistant 🏨 How can I help?" }] },
    ...history.map((h) => ({
      role: h.role === "model" ? "model" : "user",
      parts: [{ text: h.text }],
    })),
    { role: "user", parts: [{ text: userMessage }] },
  ];

  const res = await fetch(`${API_URL}?key=${API_KEY}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ contents }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err?.error?.message ?? "API error");
  }

  const data = await res.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text ?? "Sorry, no response received.";
};
