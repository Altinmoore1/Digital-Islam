
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getInspiration = async (topic: string = "gratitude") => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Provide a short, uplifting Islamic reflection or a brief fact about Islamic history related to ${topic}. Keep it concise and inspiring for a youth audience. Format: A short quote/verse followed by 2 sentences of reflection.`,
      config: {
        temperature: 0.8,
        topP: 0.9,
      }
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "The best of people are those who are most beneficial to people. (Prophetic Wisdom)";
  }
};

export const askQuestions = async (question: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: question,
      config: {
        systemInstruction: "You are an assistant for 'Digital Islam', a faith-based organization. Answer questions about Islam politely, accurately, and with a focus on community and positive values. Keep answers brief (max 150 words).",
      }
    });
    return response.text;
  } catch (error) {
    return "I'm sorry, I'm unable to answer that right now. Please consult a local scholar or reach out to our education department.";
  }
};
