// Vercel serverless function for Google GenAI Image Generation (Imagen)
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
    const { prompt, numberOfImages = 4 } = req.body;

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

    // Generate images using Imagen
    const response = await genAI.models.generateImages({
      model: 'imagen-3.0-generate-001',
      prompt: prompt,
      config: {
        numberOfImages: Math.min(Math.max(1, numberOfImages), 8), // Limit between 1-8
      },
    });

    // Process the generated images
    const images = [];
    let idx = 1;
    for (const generatedImage of response.generatedImages) {
      const imgBytes = generatedImage.image.imageBytes;
      // Convert to base64 for web display
      const base64Image = `data:image/png;base64,${imgBytes}`;
      images.push({
        id: idx,
        base64: base64Image,
        filename: `imagen-${idx}.png`
      });
      idx++;
    }

    return res.status(200).json({ 
      success: true, 
      images: images,
      prompt: prompt,
      count: images.length
    });

  } catch (error) {
    console.error('Error generating images:', error);
    
    // Handle specific Google API errors
    if (error.message.includes('API key')) {
      return res.status(401).json({ 
        error: 'Invalid API key',
        details: 'Please check your Google API configuration' 
      });
    }
    
    return res.status(500).json({ 
      error: 'Image generation failed',
      details: error.message || 'Please try again later' 
    });
  }
}