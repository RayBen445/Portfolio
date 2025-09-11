# Google GenAI API Setup Guide

This guide will help you set up Google GenAI API integration for the AI Image and Text generation features in your portfolio.

## 🔑 Getting Your Google API Key

### Step 1: Create a Google Cloud Project
1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Make sure billing is enabled for your project

### Step 2: Enable the Generative AI API
1. In the Google Cloud Console, go to **APIs & Services** > **Library**
2. Search for "Generative Language API" and enable it
3. Search for "Vertex AI API" and enable it (for Imagen)

### Step 3: Create API Credentials
1. Go to **APIs & Services** > **Credentials**
2. Click **Create Credentials** > **API Key**
3. Copy the generated API key
4. (Optional) Restrict the API key to only the APIs you need

### Step 4: Get AI Studio API Key (Alternative)
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click **Create API Key**
4. Copy the generated key

## 🚀 Setting Up in Vercel

### Environment Variables
Add the following environment variable in your Vercel dashboard:

```bash
GOOGLE_API_KEY=your_actual_api_key_here
```

### Vercel Dashboard Setup
1. Go to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your portfolio project
3. Go to **Settings** > **Environment Variables**
4. Add new variable:
   - **Name**: `GOOGLE_API_KEY`
   - **Value**: Your Google API key
   - **Environments**: Production, Preview, Development
5. Click **Save**

### Local Development Setup
Create a `.env.local` file in your project root:

```bash
GOOGLE_API_KEY=your_actual_api_key_here
```

**⚠️ Important**: Add `.env.local` to your `.gitignore` file to keep your API key secure.

## 🧪 Testing Your Setup

### Test the API Key
You can test your API key by running this command in your terminal:

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"contents":[{"parts":[{"text":"Hello, world!"}]}]}' \
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=YOUR_API_KEY"
```

Replace `YOUR_API_KEY` with your actual API key.

### Verify in Portfolio
1. Deploy your portfolio to Vercel
2. Navigate to the AI Text or AI Images pages
3. Try generating content
4. Check the browser console for any errors

## 🔒 Security Best Practices

### API Key Security
- **Never** commit API keys to your repository
- Use environment variables for all sensitive data
- Restrict your API key to specific APIs if possible
- Monitor your API usage in Google Cloud Console

### Rate Limiting
- Be aware of Google's API rate limits
- Implement proper error handling for quota exceeded errors
- Consider implementing client-side rate limiting

### Cost Management
- Monitor your API usage to avoid unexpected charges
- Set up billing alerts in Google Cloud Console
- Consider implementing usage limits in your application

## 📊 Supported Models

### Text Generation (Gemini)
- `gemini-1.5-flash-latest` - Fast and efficient
- `gemini-1.5-pro-latest` - Advanced reasoning
- `gemini-1.0-pro-latest` - Stable version

### Image Generation (Imagen)
- `imagen-3.0-generate-001` - Latest image generation model
- Supports 1-8 images per request
- High-quality image output

## 🛠️ Troubleshooting

### Common Issues

**API Key Invalid**
- Verify the API key is correct
- Check that the required APIs are enabled
- Ensure billing is enabled on your Google Cloud project

**Quota Exceeded**
- Check your API usage in Google Cloud Console
- Wait for quota reset or request quota increase
- Implement rate limiting in your application

**CORS Errors**
- The serverless functions handle CORS automatically
- If issues persist, check Vercel function logs

**Function Timeout**
- Image generation may take longer than text generation
- Vercel functions have a 10-second timeout on free tier
- Consider upgrading to Pro for longer timeouts

### Getting Help
- Check [Google AI documentation](https://ai.google.dev/docs)
- Review [Vercel function documentation](https://vercel.com/docs/functions)
- Monitor function logs in Vercel dashboard

## 📝 API Usage Examples

### Text Generation Request
```javascript
const response = await fetch('/api/generate-text', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    prompt: "Write a short story about...",
    model: "gemini-1.5-flash-latest"
  })
});
```

### Image Generation Request
```javascript
const response = await fetch('/api/generate-images', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    prompt: "A robot holding a red skateboard",
    numberOfImages: 4
  })
});
```

---

Your portfolio now has powerful AI capabilities! Make sure to test thoroughly and monitor your API usage to stay within your desired limits.