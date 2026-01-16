
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export async function* getArchitectAdviceStream(userPrompt: string) {
  const model = 'gemini-3-pro-preview';
  
  const systemInstruction = `
    Você é um Arquiteto de Software Sênior especialista em Fintech (.NET 8 + MongoDB).
    Seu conhecimento é baseado no "ROADMAP DEFINITIVO — FINTECH".
    Suas diretrizes fundamentais:
    1. Ledger é imutável.
    2. Decisões financeiras exigem consistência forte (OCC).
    3. Use Sagas para transações distribuídas.
    4. Implemente Outbox para evitar perda de eventos.
    5. LGPD, Auditoria e Disaster Recovery são prioridades máximas.
    6. Seja técnico, cite padrões de projeto (DDD, CQRS) e forneça exemplos em C#/.NET quando solicitado.
    7. Nunca recomende consistência eventual para autorização de saldo.
    Responda em Português (Brasil).
  `;

  try {
    const chat = ai.chats.create({
      model: model,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      },
    });

    const streamResponse = await chat.sendMessageStream({ message: userPrompt });
    for await (const chunk of streamResponse) {
      const c = chunk as GenerateContentResponse;
      if (c.text) {
        yield c.text;
      }
    }
  } catch (error) {
    console.error("Gemini API Error:", error);
    yield "Desculpe, tive um problema ao processar sua consulta arquitetural.";
  }
}
