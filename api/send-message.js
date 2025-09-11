// Vercel serverless function to send messages to Telegram
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
    const { name, email, subject, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ 
        error: 'Missing required fields',
        details: 'Name, email, and message are required' 
      });
    }

    // Get environment variables
    const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const CHAT_ID = process.env.TELEGRAM_USER_ID;

    if (!BOT_TOKEN || !CHAT_ID) {
      console.error('Missing environment variables');
      return res.status(500).json({ 
        error: 'Server configuration error',
        details: 'Please contact the administrator' 
      });
    }

    // Format beautiful message for Telegram
    const now = new Date();
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

    // Send to Telegram
    const telegramUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
    
    const response = await fetch(telegramUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: telegramMessage,
        parse_mode: 'HTML'
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Telegram API error:', data);
      return res.status(500).json({ 
        error: 'Failed to send message',
        details: 'Please try again later' 
      });
    }

    return res.status(200).json({ 
      success: true, 
      message: 'Message sent successfully!' 
    });

  } catch (error) {
    console.error('Error sending message:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      details: 'Please try again later' 
    });
  }
}