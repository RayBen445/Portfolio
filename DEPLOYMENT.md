# RayBen445 Portfolio - Deployment Guide

## 🚀 Quick Deploy to Vercel

### One-Click Deploy
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/RayBen445/Portfolio)

### Method 1: GitHub Integration (Recommended)
1. **Fork or clone** this repository to your GitHub account
2. Go to [vercel.com](https://vercel.com) and log in
3. Click **"New Project"**
4. **Import** your GitHub repository  
5. Click **"Deploy"** (no configuration needed!)
6. **🔑 IMPORTANT**: Set up environment variables after deployment ([See guide below](#-environment-variables-setup))

### Method 2: Vercel CLI
```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to your Vercel account
vercel login

# Deploy from project root
vercel --prod
```

### Method 3: Direct Upload
1. Download/clone this repository
2. Go to [vercel.com](https://vercel.com)
3. Drag and drop the project folder
4. Deploy instantly

## 🔑 Environment Variables Setup

**⚠️ The portfolio will work without these, but some features require environment variables:**

| Variable | Required For | How to Get |
|----------|-------------|------------|
| `TELEGRAM_BOT_TOKEN` | Contact form | Message @BotFather on Telegram |
| `TELEGRAM_USER_ID` | Contact form | Message @userinfobot on Telegram |
| `GOOGLE_API_KEY` | AI features | [Google Cloud Console](https://console.cloud.google.com/apis/credentials) |

### Quick Setup:
1. **In Vercel Dashboard** → Your Project → Settings → Environment Variables
2. **Add each variable** with the values from the table above
3. **Redeploy** your site for changes to take effect

📋 **[Complete Step-by-Step Guide](ENVIRONMENT_SETUP.md)** for detailed instructions.

## 🛠️ Local Development

### Prerequisites
- Node.js 18+ (recommended)
- Git

### Setup
```bash
# Clone the repository
git clone https://github.com/RayBen445/Portfolio.git
cd Portfolio

# Install dependencies
npm install

# Copy environment variables (optional)
cp .env.example .env.local
# Edit .env.local with your actual values

# Start development server
npm run dev
```

Visit `http://localhost:3000`

## 📁 Project Structure
```
Portfolio/
├── index.html              # Homepage
├── projects.html           # Projects showcase
├── skills.html            # Skills & technologies
├── ai-images.html         # AI image generation
├── ai-text.html           # AI text generation  
├── support.html           # Support page
├── contact.html           # Contact form
├── styles.css             # Main stylesheet
├── script.js              # Client-side JavaScript
├── shared.js              # Shared utilities
├── api/                   # Serverless functions
│   ├── generate-images.js # AI image generation
│   ├── generate-text.js   # AI text generation
│   └── send-message.js    # Contact form handler
├── vercel.json           # Vercel configuration
├── package.json          # Dependencies & scripts
├── .env.example          # Environment variables template
└── README.md             # Project documentation
```

## 🔧 Troubleshooting

### Deployment Issues
| Problem | Solution |
|---------|----------|
| **Build failed** | Check vercel.json syntax with `node -e "JSON.parse(require('fs').readFileSync('vercel.json', 'utf8'))"` |
| **404 errors** | Ensure all HTML files exist and rewrites in vercel.json are correct |
| **API not working** | Check Node.js runtime is set to 18.x in vercel.json functions config |

### Feature Issues
| Problem | Solution |
|---------|----------|
| **Contact form fails** | Set `TELEGRAM_BOT_TOKEN` and `TELEGRAM_USER_ID` in Vercel env vars |
| **AI features not working** | Set `GOOGLE_API_KEY` in Vercel env vars and enable required APIs |
| **"Server configuration error"** | Environment variables missing - redeploy after setting them |

### Performance Tips
- All static assets are cached automatically by Vercel
- API functions are serverless and scale automatically
- GitHub API has rate limits - consider adding loading states

## 🌐 Custom Domain Setup
1. **In Vercel Dashboard** → Your Project → Settings → Domains
2. **Add your domain** (e.g., yourname.com)
3. **Update DNS** records as instructed by Vercel
4. **HTTPS** is automatic ✅

## 📊 Monitoring & Analytics
Consider adding:
- [Vercel Analytics](https://vercel.com/docs/analytics) (built-in)
- [Google Analytics](https://analytics.google.com)
- [Vercel Web Vitals](https://vercel.com/docs/analytics/web-vitals)

## 🔒 Security Features
- ✅ Security headers (XSS protection, content sniffing prevention)
- ✅ CORS properly configured for API endpoints
- ✅ Environment variables secured in Vercel
- ✅ No sensitive data in client-side code

## 📱 Browser Support
- ✅ Chrome 90+
- ✅ Firefox 90+
- ✅ Safari 14+
- ✅ Edge 90+

## 📞 Support
**Issues or questions?**
- 📧 Email: oladoyeheritage445@gmail.com
- 🐛 GitHub Issues: [Create an issue](https://github.com/RayBen445/Portfolio/issues)
- 📚 Vercel Docs: [vercel.com/docs](https://vercel.com/docs)

---

**Happy Deploying! 🚀**