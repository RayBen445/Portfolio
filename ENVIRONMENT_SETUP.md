# Environment Variables Configuration

This document explains how to set up environment variables for the portfolio's support form Telegram integration.

## Required Environment Variables

### For Vercel Deployment

You need to set these environment variables in your Vercel dashboard:

1. **TELEGRAM_BOT_TOKEN**
   - Your Telegram bot token from @BotFather
   - Example: `1234567890:ABCdefGHIjklMNOpqrsTUVwxYZ123456789`

2. **TELEGRAM_USER_ID**
   - Your personal Telegram user ID (where messages will be sent)
   - Example: `123456789`

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

### Step 3: Configure Vercel Environment Variables

#### Option A: Via Vercel Dashboard
1. Go to your project in Vercel dashboard
2. Click on "Settings"
3. Click on "Environment Variables"
4. Add both variables:
   - Name: `TELEGRAM_BOT_TOKEN`, Value: Your bot token
   - Name: `TELEGRAM_USER_ID`, Value: Your user ID

#### Option B: Via Vercel CLI
```bash
vercel env add TELEGRAM_BOT_TOKEN
# Enter your bot token when prompted

vercel env add TELEGRAM_USER_ID
# Enter your user ID when prompted
```

### Step 4: Test the Integration

1. Deploy your site to Vercel
2. Go to the Support page
3. Fill out and submit the form
4. Check your Telegram for the message

## Security Notes

- Never commit these tokens to your repository
- Keep your bot token secret
- Only share your user ID if necessary
- Regularly rotate your bot token if compromised

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
```

**Note:** Never commit .env files to your repository. Add them to .gitignore.