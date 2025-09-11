// Vercel serverless function for Google GenAI Text Generation (Gemini)
import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { prompt, model = "gemini-1.5-flash-latest" } = req.body;

    // Validate required fields
    if (!prompt) {
      return res.status(400).json({ 
        error: 'Missing required fields',
        details: 'Prompt is required' 
      });
    }

    // Get environment variable
    const API_KEY = process.env.GOOGLE_API_KEY;

    if (!API_KEY) {
      console.error('Missing GOOGLE_API_KEY environment variable');
      return res.status(500).json({ 
        error: 'Server configuration error',
        details: 'Please contact the administrator' 
      });
    }

    // Initialize Google GenAI
    const genAI = new GoogleGenerativeAI(API_KEY);

    // Get the generative model
    const genModel = genAI.getGenerativeModel({ model: model });

    // Generate content
    const result = await genModel.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    return res.status(200).json({ 
      success: true, 
      text: text,
      prompt: prompt,
      model: model,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error generating text:', error);
    
    // Handle specific Google API errors
    if (error.message.includes('API key')) {
      return res.status(401).json({ 
        error: 'Invalid API key',
        details: 'Please check your Google API configuration' 
      });
    }
    
    if (error.message.includes('quota')) {
      return res.status(429).json({ 
        error: 'API quota exceeded',
        details: 'Please try again later' 
      });
    }
    
    return res.status(500).json({ 
      error: 'Text generation failed',
      details: error.message || 'Please try again later' 
    });
  }
}