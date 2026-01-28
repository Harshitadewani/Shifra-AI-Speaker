import { GoogleGenAI } from "@google/genai";

// ⚠️ API key ko ideally .env me rakho
const ai = new GoogleGenAI({
  apiKey: "AIzaSyBhglb7seX8pN39yVpvCmOqtFsj0ZvHUmM",
});

// 🔒 ek time pe sirf ek request
let isCalling = false;

async function run(question, retries = 4) {
  if (isCalling) return "AI abhi busy hai 😅";

  isCalling = true;

  try {
    for (let i = 0; i < retries; i++) {
      try {
        const response = await ai.models.generateContent({
          model: "gemini-3-flash-preview", // jo actually chal raha hai

          contents: question,

          generationConfig: {
            temperature: 0.3,     // fast + stable
            maxOutputTokens: 20,  // short response
          },
        });

        return response.text;

      } catch (err) {
        // 🔁 overload case
        if (err?.error?.code === 503 && i < retries - 1) {
          console.warn("Gemini busy, retrying...");
          await new Promise(res => setTimeout(res, 3000)); // 3 sec wait
        } else {
          throw err;
        }
      }
    }
  } catch (err) {
    console.error("Gemini Error:", err);
    return "AI thoda busy hai 😅 thodi der baad try karo.";
  } finally {
    isCalling = false;
  }
}

export default run;