import { GoogleGenAI } from "@google/genai";
import { SYSTEM_INSTRUCTION } from '../constants';

let ai: GoogleGenAI | null = null;

export const initializeGemini = (apiKey: string) => {
  ai = new GoogleGenAI({ apiKey });
};

export const sendMessageToGemini = async (message: string, history: { role: 'user' | 'model'; text: string }[] = []) => {
  if (!ai) {
    throw new Error("Gemini API not initialized");
  }

  try {
    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
      history: history.map(h => ({
        role: h.role,
        parts: [{ text: h.text }]
      }))
    });

    const result = await chat.sendMessage({ message });
    return result.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
