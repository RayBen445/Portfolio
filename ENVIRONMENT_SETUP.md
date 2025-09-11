# Environment Variables Configuration

This document explains how to set up environment variables for the portfolio's features including Telegram integration and Google AI services.

## Required Environment Variables

### For Vercel Deployment

You need to set these environment variables in your Vercel dashboard:

1. **TELEGRAM_BOT_TOKEN**
   - Your Telegram bot token from @BotFather
   - Required for: Contact form submissions via Telegram
   - Example: `1234567890:ABCdefGHIjklMNOpqrsTUVwxYZ123456789`

2. **TELEGRAM_USER_ID**
   - Your personal Telegram user ID (where messages will be sent)
   - Required for: Contact form submissions via Telegram
   - Example: `123456789`

3. **GOOGLE_API_KEY**
   - Your Google API key with GenAI permissions
   - Required for: AI text generation and AI image generation features
   - Example: `AIzaSyDxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

## How to Set Up

### Step 1: Create a Telegram Bot

1. Message @BotFather on Telegram
2. Send `/newbot`
3. Choose a name for your bot
4. Choose a username for your bot (must end with 'bot')
5. Copy the bot token provided

### Step 2: Get Your User ID

1. Message @userinfobot on Telegram
2. It will reply with your user ID
3. Copy the numeric user ID

### Step 3: Set Up Google API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the following APIs:
   - Generative Language API (for text generation)
   - Vertex AI API (for image generation)
4. Go to "Credentials" section
5. Click "Create Credentials" → "API Key"
6. Copy the generated API key
7. (Optional) Restrict the API key to specific APIs for security

### Step 4: Configure Vercel Environment Variables

#### Option A: Via Vercel Dashboard
1. Go to your project in Vercel dashboard
2. Click on "Settings"
3. Click on "Environment Variables"
4. Add all three variables:
   - Name: `TELEGRAM_BOT_TOKEN`, Value: Your bot token
   - Name: `TELEGRAM_USER_ID`, Value: Your user ID
   - Name: `GOOGLE_API_KEY`, Value: Your Google API key

#### Option B: Via Vercel CLI
```bash
vercel env add TELEGRAM_BOT_TOKEN
# Enter your bot token when prompted

vercel env add TELEGRAM_USER_ID
# Enter your user ID when prompted

vercel env add GOOGLE_API_KEY
# Enter your Google API key when prompted
```

### Step 5: Test the Integration

1. Deploy your site to Vercel
2. Test the features:
   - **Contact Form**: Go to Support page, submit form, check Telegram
   - **AI Text**: Go to AI Text page, enter prompt, verify text generation
   - **AI Images**: Go to AI Images page, enter prompt, verify image generation

## Security Notes

- Never commit these tokens/keys to your repository
- Keep your bot token and API keys secret
- Only share your user ID if necessary
- Regularly rotate your tokens/keys if compromised
- Consider restricting Google API key to specific APIs and referrers

## Troubleshooting

### Bot Not Sending Messages
- Verify bot token is correct
- Check that user ID is numeric only
- Ensure you've started a conversation with your bot
- Check Vercel function logs for errors

### Environment Variables Not Working
- Redeploy after setting environment variables
- Check variable names match exactly (case-sensitive)
- Verify variables are set for the correct environment (production)

## Example .env.local (for local development)

```env
TELEGRAM_BOT_TOKEN=1234567890:ABCdefGHIjklMNOpqrsTUVwxYZ123456789
TELEGRAM_USER_ID=123456789
GOOGLE_API_KEY=AIzaSyDxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

**Note:** Never commit .env files to your repository. Add them to .gitignore.