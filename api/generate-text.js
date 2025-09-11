// Vercel serverless function for Google GenAI Text Generation (Gemini)
const { GoogleGenerativeAI } = require("@google/generative-ai");

module.exports = async function handler(req, res) {
  const startTime = new Date();
  console.log('=== GENERATE-TEXT FUNCTION START ===');
  console.log('Timestamp:', startTime.toISOString());
  console.log('Request method:', req.method);
  console.log('Request headers present:', Object.keys(req.headers || {}));
  
  // Set CORS headers
  console.log('Setting CORS headers...');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    console.log('Handling OPTIONS request - returning 200');
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    console.log('Invalid method received:', req.method);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  console.log('POST request confirmed, processing...');

  try {
    console.log('Starting request body parsing...');
    console.log('Request body exists:', !!req.body);
    console.log('Request body type:', typeof req.body);
    
    const { prompt, model = "gemini-1.5-flash-latest" } = req.body;
    
    console.log('Extracted parameters:');
    console.log('- prompt present:', !!prompt, 'length:', prompt ? prompt.length : 0);
    console.log('- model specified:', model);

    // Validate required fields
    console.log('Validating required fields...');
    if (!prompt) {
      console.log('Validation failed - missing prompt');
      return res.status(400).json({ 
        error: 'Missing required fields',
        details: 'Prompt is required' 
      });
    }
    console.log('Field validation passed');

    // Get environment variable
    console.log('Checking environment variables...');
    const API_KEY = process.env.GOOGLE_API_KEY;
    
    console.log('Environment variables status:');
    console.log('- GOOGLE_API_KEY present:', !!API_KEY, 'length:', API_KEY ? API_KEY.length : 0);

    if (!API_KEY) {
      console.error('Missing GOOGLE_API_KEY environment variable');
      return res.status(500).json({ 
        error: 'Server configuration error',
        details: 'Please contact the administrator' 
      });
    }
    console.log('Environment variables validation passed');

    // Initialize Google GenAI
    console.log('Initializing Google GenAI...');
    console.log('Using API key prefix:', API_KEY.substring(0, 10) + '***');
    const genAI = new GoogleGenerativeAI(API_KEY);
    console.log('GoogleGenerativeAI instance created successfully');

    // Get the generative model
    console.log('Getting generative model...');
    console.log('Requested model:', model);
    const genModel = genAI.getGenerativeModel({ model: model });
    console.log('Generative model instance created successfully');

    // Generate content
    console.log('Starting content generation...');
    console.log('Prompt length:', prompt.length);
    console.log('Prompt preview:', prompt.substring(0, 100) + (prompt.length > 100 ? '...' : ''));
    
    const result = await genModel.generateContent(prompt);
    console.log('Content generation completed');
    console.log('Result type:', typeof result);
    console.log('Result has response:', !!result.response);
    
    const response = result.response;
    console.log('Response extracted');
    console.log('Response type:', typeof response);
    
    const text = response.text();
    console.log('Text extracted successfully');
    console.log('Generated text length:', text ? text.length : 0);
    console.log('Generated text preview:', text ? text.substring(0, 100) + (text.length > 100 ? '...' : '') : 'No text');

    const endTime = new Date();
    const duration = endTime - startTime;
    console.log('=== GENERATE-TEXT FUNCTION SUCCESS ===');
    console.log('End timestamp:', endTime.toISOString());
    console.log('Total duration (ms):', duration);

    return res.status(200).json({ 
      success: true, 
      text: text,
      prompt: prompt,
      model: model,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    const endTime = new Date();
    const duration = endTime - startTime;
    console.error('=== GENERATE-TEXT FUNCTION ERROR ===');
    console.error('Error timestamp:', endTime.toISOString());
    console.error('Total duration before error (ms):', duration);
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    console.error('Error details:', {
      cause: error.cause,
      code: error.code,
      status: error.status,
      statusText: error.statusText
    });
    
    // Handle specific Google API errors
    console.log('Analyzing error type...');
    if (error.message.includes('API key')) {
      console.error('API key related error detected');
      return res.status(401).json({ 
        error: 'Invalid API key',
        details: 'Please check your Google API configuration' 
      });
    }
    
    if (error.message.includes('quota')) {
      console.error('Quota related error detected');
      return res.status(429).json({ 
        error: 'API quota exceeded',
        details: 'Please try again later' 
      });
    }
    
    console.error('General error, returning 500');
    return res.status(500).json({ 
      error: 'Text generation failed',
      details: error.message || 'Please try again later' 
    });
  }
};