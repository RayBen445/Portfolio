// Vercel serverless function to send messages to Telegram
export default async function handler(req, res) {
  const startTime = new Date();
  console.log('=== SEND-MESSAGE FUNCTION START ===');
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
    
    const { name, email, subject, message } = req.body;
    
    console.log('Extracted parameters:');
    console.log('- name present:', !!name, 'length:', name ? name.length : 0);
    console.log('- email present:', !!email, 'length:', email ? email.length : 0);
    console.log('- subject present:', !!subject, 'length:', subject ? subject.length : 0);
    console.log('- message present:', !!message, 'length:', message ? message.length : 0);

    // Validate required fields
    console.log('Validating required fields...');
    if (!name || !email || !message) {
      console.log('Validation failed - missing required fields');
      console.log('Missing fields:', {
        name: !name,
        email: !email, 
        message: !message
      });
      return res.status(400).json({ 
        error: 'Missing required fields',
        details: 'Name, email, and message are required' 
      });
    }
    console.log('Field validation passed');

    // Get environment variables
    console.log('Checking environment variables...');
    const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const CHAT_ID = process.env.TELEGRAM_USER_ID;
    
    console.log('Environment variables status:');
    console.log('- TELEGRAM_BOT_TOKEN present:', !!BOT_TOKEN, 'length:', BOT_TOKEN ? BOT_TOKEN.length : 0);
    console.log('- TELEGRAM_USER_ID present:', !!CHAT_ID, 'length:', CHAT_ID ? CHAT_ID.length : 0);

    if (!BOT_TOKEN || !CHAT_ID) {
      console.error('Missing environment variables');
      console.error('BOT_TOKEN missing:', !BOT_TOKEN);
      console.error('CHAT_ID missing:', !CHAT_ID);
      return res.status(500).json({ 
        error: 'Server configuration error',
        details: 'Please contact the administrator' 
      });
    }
    console.log('Environment variables validation passed');

    // Format beautiful message for Telegram
    console.log('Formatting message for Telegram...');
    const now = new Date();
    console.log('Current timestamp for message:', now.toISOString());
    
    const formattedDate = now.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    const formattedTime = now.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
    
    console.log('Formatted date:', formattedDate);
    console.log('Formatted time:', formattedTime);

    const telegramMessage = `
🌟 <b>NEW PORTFOLIO MESSAGE</b> 🌟
━━━━━━━━━━━━━━━━━━━━━━━━━━━━

<b>👤 Sender Information:</b>
┏━ <b>Name:</b> ${name}
┗━ <b>Email:</b> ${email}

<b>📋 Subject:</b> ${subject || '💭 General Inquiry'}

<b>💬 Message:</b>
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━
┃ ${message.replace(/\n/g, '\n┃ ')}
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━

<b>⏰ Received:</b>
📅 ${formattedDate}
🕐 ${formattedTime}

<b>🔗 Quick Actions:</b>
• Reply directly to this chat
• Check portfolio: <a href="https://rayben445.vercel.app">Portfolio</a>
• GitHub: <a href="https://github.com/RayBen445">@RayBen445</a>

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
<i>🚀 Sent via RayBen445 Portfolio</i>`;

    console.log('Telegram message formatted, length:', telegramMessage.length);

    // Send to Telegram
    console.log('Preparing Telegram API request...');
    const telegramUrl = `https://api.telegram.org/bot${BOT_TOKEN.substring(0, 10)}***/sendMessage`;
    console.log('Telegram API URL (sanitized):', telegramUrl);
    
    const requestBody = {
      chat_id: CHAT_ID,
      text: telegramMessage,
      parse_mode: 'HTML'
    };
    
    console.log('Request body prepared:');
    console.log('- chat_id:', CHAT_ID);
    console.log('- text length:', telegramMessage.length);
    console.log('- parse_mode:', requestBody.parse_mode);
    
    console.log('Sending request to Telegram API...');
    const response = await fetch(telegramUrl.replace('***', BOT_TOKEN.substring(10)), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });
    
    console.log('Telegram API response received:');
    console.log('- status:', response.status);
    console.log('- statusText:', response.statusText);
    console.log('- ok:', response.ok);
    console.log('- headers:', Object.fromEntries(response.headers.entries()));

    const data = await response.json();
    console.log('Response data parsed:', typeof data);
    console.log('Response data keys:', Object.keys(data || {}));

    if (!response.ok) {
      console.error('Telegram API request failed');
      console.error('Response status:', response.status);
      console.error('Response statusText:', response.statusText);
      console.error('Telegram API error data:', data);
      return res.status(500).json({ 
        error: 'Failed to send message',
        details: 'Please try again later' 
      });
    }

    console.log('Telegram API request successful!');
    console.log('Success response data summary:', {
      ok: data.ok,
      message_id: data.result?.message_id,
      chat: data.result?.chat?.id
    });
    
    const endTime = new Date();
    const duration = endTime - startTime;
    console.log('=== SEND-MESSAGE FUNCTION SUCCESS ===');
    console.log('End timestamp:', endTime.toISOString());
    console.log('Total duration (ms):', duration);

    return res.status(200).json({ 
      success: true, 
      message: 'Message sent successfully!' 
    });

  } catch (error) {
    const endTime = new Date();
    const duration = endTime - startTime;
    console.error('=== SEND-MESSAGE FUNCTION ERROR ===');
    console.error('Error timestamp:', endTime.toISOString());
    console.error('Total duration before error (ms):', duration);
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    console.error('Error details:', {
      cause: error.cause,
      code: error.code,
      errno: error.errno,
      syscall: error.syscall
    });
    return res.status(500).json({ 
      error: 'Internal server error',
      details: 'Please try again later' 
    });
  }
}