// Vercel serverless function for Google GenAI Image Generation (Imagen)
import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  const startTime = new Date();
  console.log('=== GENERATE-IMAGES FUNCTION START ===');
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
    
    const { prompt, numberOfImages = 4 } = req.body;
    
    console.log('Extracted parameters:');
    console.log('- prompt present:', !!prompt, 'length:', prompt ? prompt.length : 0);
    console.log('- numberOfImages:', numberOfImages, 'type:', typeof numberOfImages);

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

    // Generate images using Imagen
    console.log('Preparing image generation request...');
    const imageCount = Math.min(Math.max(1, numberOfImages), 8);
    console.log('Adjusted numberOfImages:', imageCount, '(limited between 1-8)');
    console.log('Prompt length:', prompt.length);
    console.log('Prompt preview:', prompt.substring(0, 100) + (prompt.length > 100 ? '...' : ''));
    
    console.log('Starting image generation with Imagen...');
    const response = await genAI.models.generateImages({
      model: 'imagen-3.0-generate-001',
      prompt: prompt,
      config: {
        numberOfImages: imageCount,
      },
    });
    
    console.log('Image generation completed');
    console.log('Response type:', typeof response);
    console.log('Response has generatedImages:', !!response.generatedImages);
    console.log('Generated images count:', response.generatedImages ? response.generatedImages.length : 0);

    // Process the generated images
    console.log('Processing generated images...');
    const images = [];
    let idx = 1;
    for (const generatedImage of response.generatedImages) {
      console.log(`Processing image ${idx}...`);
      console.log(`- Image ${idx} has image property:`, !!generatedImage.image);
      console.log(`- Image ${idx} has imageBytes:`, !!generatedImage.image?.imageBytes);
      
      const imgBytes = generatedImage.image.imageBytes;
      console.log(`- Image ${idx} bytes length:`, imgBytes ? imgBytes.length : 0);
      
      // Convert to base64 for web display
      const base64Image = `data:image/png;base64,${imgBytes}`;
      console.log(`- Image ${idx} base64 length:`, base64Image.length);
      
      images.push({
        id: idx,
        base64: base64Image,
        filename: `imagen-${idx}.png`
      });
      console.log(`- Image ${idx} processed successfully`);
      idx++;
    }
    
    console.log('All images processed successfully');
    console.log('Final images array length:', images.length);

    const endTime = new Date();
    const duration = endTime - startTime;
    console.log('=== GENERATE-IMAGES FUNCTION SUCCESS ===');
    console.log('End timestamp:', endTime.toISOString());
    console.log('Total duration (ms):', duration);

    return res.status(200).json({ 
      success: true, 
      images: images,
      prompt: prompt,
      count: images.length
    });

  } catch (error) {
    const endTime = new Date();
    const duration = endTime - startTime;
    console.error('=== GENERATE-IMAGES FUNCTION ERROR ===');
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
    
    console.error('General error, returning 500');
    return res.status(500).json({ 
      error: 'Image generation failed',
      details: error.message || 'Please try again later' 
    });
  }
}