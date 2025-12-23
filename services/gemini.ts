import { GoogleGenAI, Type, Schema } from "@google/genai";
import { ActionResponse } from "../types";

const RESPONSE_SCHEMA: Schema = {
  type: Type.OBJECT,
  properties: {
    classification: {
      type: Type.STRING,
      description: "A short category for the complaint (e.g., 'Consumer Rights', 'Tenant Dispute').",
    },
    formalComplaint: {
      type: Type.STRING,
      description: "A professionally written, formal complaint letter ready for submission. Use placeholders like [Date] or [Your Name] if appropriate.",
    },
    recommendedAuthority: {
      type: Type.STRING,
      description: "The specific entity, department, or organization the user should contact (e.g., 'State Consumer Protection Office', 'Landlord', 'HR Department').",
    },
    actionSteps: {
      type: Type.ARRAY,
      items: {
        type: Type.STRING,
      },
      description: "A list of 3-5 clear, actionable next steps for the user.",
    },
  },
  required: ["classification", "formalComplaint", "recommendedAuthority", "actionSteps"],
};

export const generateComplaint = async (apiKey: string, userText: string): Promise<ActionResponse> => {
  if (!apiKey) {
    throw new Error("API Key is required");
  }

  const ai = new GoogleGenAI({ apiKey });
  
  // Using gemini-3-pro-preview for complex reasoning and legal drafting
  const modelId = "gemini-3-pro-preview";

  const prompt = `
    You are an expert legal aide and professional advocate. 
    Transform the following user grievance into a formal, actionable complaint package.
    
    User Grievance:
    "${userText}"
    
    Your task:
    1. Classify the issue.
    2. Write a professional, firm, and polite formal complaint letter. It should use legal terminology where appropriate but remain accessible.
    3. Identify the most likely authority or department to receive this complaint.
    4. Provide a concrete list of next steps.
    
    Return the result strictly as JSON.
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: RESPONSE_SCHEMA,
        thinkingConfig: {
            thinkingBudget: 2048 // Allow some budget for legal reasoning
        }
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response received from AI");
    }

    return JSON.parse(text) as ActionResponse;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to generate complaint. Please check your API key and try again.");
  }
};
