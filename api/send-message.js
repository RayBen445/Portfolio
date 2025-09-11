// Vercel serverless function to send messages to Telegram
module.exports = async function handler(req, res) {
  console.log('=== SEND-MESSAGE FUNCTION START ===');
  console.log('Node version:', process.version);
  console.log('Timestamp:', new Date().toISOString());
  console.log('Request method:', req.method);
  console.log('Environment check:', {
    NODE_ENV: process.env.NODE_ENV,
    VERCEL: process.env.VERCEL,
    VERCEL_ENV: process.env.VERCEL_ENV
  });
  
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
    
    const { name, email, subject, message } = req.body;
    console.log('Request data received:', { 
      hasName: !!name, 
      hasEmail: !!email, 
      hasSubject: !!subject, 
      hasMessage: !!message 
    });

    // Validate required fields
    if (!name || !email || !message) {
      console.log('Validation failed - missing required fields');
      return res.status(400).json({ 
        error: 'Missing required fields',
        details: 'Name, email, and message are required',
        received: { hasName: !!name, hasEmail: !!email, hasMessage: !!message }
      });
    }

    // Check environment variables
    const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const CHAT_ID = process.env.TELEGRAM_USER_ID;
    
    console.log('Environment variables check:', {
      hasBotToken: !!BOT_TOKEN,
      hasChatId: !!CHAT_ID,
      botTokenLength: BOT_TOKEN ? BOT_TOKEN.length : 0,
      chatIdLength: CHAT_ID ? CHAT_ID.length : 0
    });

    if (!BOT_TOKEN) {
      console.error('TELEGRAM_BOT_TOKEN environment variable missing');
      return res.status(500).json({ 
        error: 'Server configuration error',
        details: 'Telegram bot token not configured' 
      });
    }
    
    if (!CHAT_ID) {
      console.error('TELEGRAM_USER_ID environment variable missing');
      return res.status(500).json({ 
        error: 'Server configuration error',
        details: 'Telegram chat ID not configured' 
      });
    }

    // Create a simplified message format
    console.log('Creating Telegram message');
    const telegramMessage = `🌟 NEW PORTFOLIO MESSAGE

👤 From: ${name}
📧 Email: ${email}
📋 Subject: ${subject || 'General Inquiry'}

💬 Message:
${message}

⏰ Received: ${new Date().toLocaleString()}`;

    console.log('Message created, length:', telegramMessage.length);

    // Send to Telegram API
    const telegramUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
    console.log('Sending to Telegram API...');
    
    const requestData = {
      chat_id: CHAT_ID,
      text: telegramMessage
    };

    const response = await fetch(telegramUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    });
    
    console.log('Telegram API response status:', response.status);

    const data = await response.json();
    console.log('Telegram API response parsed');

    if (!response.ok) {
      console.error('Telegram API error:', data);
      return res.status(500).json({ 
        error: 'Failed to send message',
        details: 'Please try again later' 
      });
    }

    console.log('Message sent successfully');
    return res.status(200).json({ 
      success: true, 
      message: 'Message sent successfully!' 
    });

  } catch (error) {
    console.error('=== SEND-MESSAGE FUNCTION ERROR ===');
    console.error('Error type:', error.constructor.name);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    
    return res.status(500).json({ 
      error: 'Internal server error',
      details: 'Please try again later',
      timestamp: new Date().toISOString()
    });
  }
};