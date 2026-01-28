import 'dotenv/config';        // 🔑 IMPORTANT
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY, // ✅ correct name
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
          model: "gemini-3-flash-preview",
          contents: question,
          generationConfig: {
            temperature: 0.3,
            maxOutputTokens: 50,
          },
        });

        return response.text;

      } catch (err) {
        if (err?.error?.code === 503 && i < retries - 1) {
          await new Promise(res => setTimeout(res, 3000));
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