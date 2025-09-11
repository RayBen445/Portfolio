# Environment Variables Setup Guide

This guide helps you set up the optional environment variables for enhanced portfolio features.

## 🎯 What You Need

| Variable | Purpose | Required? |
|----------|---------|-----------|
| `TELEGRAM_BOT_TOKEN` | Contact form messages to Telegram | No - form works without it |
| `TELEGRAM_USER_ID` | Your Telegram chat ID | No - needed only if using bot |
| `GOOGLE_API_KEY` | AI text & image generation | No - AI pages work without it |

**💡 The portfolio works perfectly without these variables!** They just enable extra features.

## ⚡ Quick Setup

### 1️⃣ Telegram Setup (for contact form)

#### Get Bot Token:
1. Message [@BotFather](https://t.me/BotFather) on Telegram
2. Send `/newbot`
3. Follow prompts to create your bot
4. Copy the token (format: `1234567890:ABCdef...`)

#### Get User ID:
1. Message [@userinfobot](https://t.me/userinfobot) on Telegram  
2. It replies with your user ID (format: `123456789`)

### 2️⃣ Google AI Setup (for AI features)

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create project or select existing one
3. Enable these APIs:
   - **Generative Language API** (for text)
   - **Vertex AI API** (for images)
4. Go to **Credentials** → **Create Credentials** → **API Key**
5. Copy your API key (format: `AIzaSyD...`)

### 3️⃣ Add to Vercel

**In your Vercel dashboard:**
1. Go to your project
2. **Settings** → **Environment Variables**
3. Click **Add** for each variable:

```
Name: TELEGRAM_BOT_TOKEN
Value: 1234567890:ABCdef...

Name: TELEGRAM_USER_ID  
Value: 123456789

Name: GOOGLE_API_KEY
Value: AIzaSyD...
```

4. **Redeploy** your site

## 🖥️ Local Development

Create `.env.local` file in your project root:

```bash
# Copy the example file
cp .env.example .env.local

# Edit with your values
TELEGRAM_BOT_TOKEN=your_bot_token_here
TELEGRAM_USER_ID=your_user_id_here
GOOGLE_API_KEY=your_api_key_here
```

**Important:** Never commit `.env.local` to git! (It's already in `.gitignore`)

## ✅ Test Your Setup

### Test Contact Form:
1. Go to `/support` page
2. Fill out contact form  
3. Submit - check your Telegram for message

### Test AI Features:
1. Go to `/ai-text` page
2. Enter a prompt, click generate
3. Go to `/ai-images` page  
4. Enter a prompt, click generate

## 🔒 Security Best Practices

- ✅ Keep your tokens/keys private
- ✅ Never commit them to git
- ✅ Rotate keys if compromised
- ✅ Restrict Google API key to specific APIs (optional)
- ✅ Use environment variables (never hardcode)

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| **Contact form shows "Server error"** | Check `TELEGRAM_BOT_TOKEN` and `TELEGRAM_USER_ID` are set correctly |
| **AI features show "Configuration error"** | Check `GOOGLE_API_KEY` is set and APIs are enabled |
| **Variables not working** | Redeploy after setting environment variables |
| **Bot not sending messages** | Start a conversation with your bot first |

## 🆘 Need Help?

- 📧 **Email**: oladoyeheritage445@gmail.com  
- 🐛 **Issues**: [GitHub Issues](https://github.com/RayBen445/Portfolio/issues)
- 📚 **Docs**: [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)