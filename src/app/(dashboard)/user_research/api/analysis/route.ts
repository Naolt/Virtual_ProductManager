// Import `GoogleGenerative` from the package we installed earlier.
import { interviewAnalysisReportSchema } from "@/schema/api/analysisSchema";
import { marketResearchSchema } from "@/schema/api/marketResearchSchema";
import { personaGenerationSchema } from "@/schema/api/personaGenerationSchema";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// Create an asynchronous function POST to handle POST
// request with parameters request and response.
export async function POST(req, res) {
  // print the request body to the console
  console.log(req.body);
  try {
    // Access your API key by creating an instance of GoogleGenerativeAI we'll call it GenAI
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not defined");
    }
    const genAI = new GoogleGenerativeAI(apiKey);

    // Ininitalise a generative model
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-pro",
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: interviewAnalysisReportSchema,
      },
    });

    // Retrieve the data we recieve as part of the request body
    const data = await req.json();

    // Define a prompt varibale
    const prompt = data.body;

    // Pass the prompt to the model and retrieve the output
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const output = await response.text();

    console.log(output);

    // Send the llm output as a server reponse object
    return NextResponse.json({ output: output });
  } catch (error) {
    console.error(error);
  }
}
