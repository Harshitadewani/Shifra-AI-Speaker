import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export default async function handler(req, res) {
  try {
    const { question } = req.body;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: question,
      generationConfig: {
        temperature: 0.3,
        maxOutputTokens: 50,
      },
    });

    res.status(200).json({ text: response.text });
  } catch (err) {
    res.status(500).json({ text: "AI busy hai 😅" });
  }
}