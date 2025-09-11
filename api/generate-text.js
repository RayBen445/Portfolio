// Vercel serverless function for Google GenAI Text Generation (Gemini)

module.exports = async function handler(req, res) {
  console.log('=== GENERATE-TEXT FUNCTION START ===');
  console.log('Node version:', process.version);
  console.log('Timestamp:', new Date().toISOString());
  console.log('Request method:', req.method);
  
  // Set CORS headers first
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    console.log('Handling OPTIONS request');
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    console.log('Invalid method:', req.method);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('Processing POST request');
    
    // Check if request body exists
    if (!req.body) {
      console.log('No request body provided');
      return res.status(400).json({ 
        error: 'No request body provided',
        details: 'Request body is required' 
      });
    }
    
    const { prompt, model = "gemini-1.5-flash-latest" } = req.body;
    console.log('Request data:', { hasPrompt: !!prompt, model });

    if (!prompt) {
      console.log('Validation failed - missing prompt');
      return res.status(400).json({ 
        error: 'Missing required fields',
        details: 'Prompt is required' 
      });
    }

    // Check environment variable
    const API_KEY = process.env.GOOGLE_API_KEY;
    console.log('Environment check:', { hasApiKey: !!API_KEY, keyLength: API_KEY ? API_KEY.length : 0 });

    if (!API_KEY) {
      console.error('GOOGLE_API_KEY environment variable missing');
      return res.status(500).json({ 
        error: 'Server configuration error',
        details: 'Google API key not configured' 
      });
    }

    // Try to load the Google Generative AI library
    console.log('Loading Google Generative AI library...');
    let GoogleGenerativeAI;
    try {
      const genAiLib = require("@google/generative-ai");
      GoogleGenerativeAI = genAiLib.GoogleGenerativeAI;
      console.log('Google Generative AI library loaded successfully');
    } catch (libError) {
      console.error('Failed to load Google Generative AI library:', libError.message);
      return res.status(500).json({ 
        error: 'Library loading failed',
        details: 'Google Generative AI library not available' 
      });
    }

    // Initialize Google GenAI
    console.log('Initializing Google GenAI...');
    const genAI = new GoogleGenerativeAI(API_KEY);
    const genModel = genAI.getGenerativeModel({ model: model });
    console.log('Google GenAI initialized successfully');

    // Generate content
    console.log('Generating content...');
    const result = await genModel.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    
    console.log('Content generated successfully, length:', text ? text.length : 0);

    return res.status(200).json({ 
      success: true, 
      text: text,
      prompt: prompt,
      model: model,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('=== GENERATE-TEXT FUNCTION ERROR ===');
    console.error('Error type:', error.constructor.name);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    
    // Handle specific error types
    if (error.message && error.message.includes('API key')) {
      return res.status(401).json({ 
        error: 'Invalid API key',
        details: 'Please check your Google API configuration' 
      });
    }
    
    if (error.message && error.message.includes('quota')) {
      return res.status(429).json({ 
        error: 'API quota exceeded',
        details: 'Please try again later' 
      });
    }
    
    return res.status(500).json({ 
      error: 'Text generation failed',
      details: error.message || 'Please try again later',
      timestamp: new Date().toISOString()
    });
  }
};