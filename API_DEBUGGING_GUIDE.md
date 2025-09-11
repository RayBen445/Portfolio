# API Debugging Guide

## Overview
This document outlines the comprehensive console logging added to the serverless API functions to debug silent crashes in Vercel production environment.

## Enhanced Functions

### 1. `/api/send-message.js` - Telegram Message Sending
**Logs Include:**
- Function entry/exit with timestamps and duration
- Request method and headers validation
- Request body parsing and parameter validation
- Environment variable checks (TELEGRAM_BOT_TOKEN, TELEGRAM_USER_ID)
- Telegram message formatting progress
- API request/response details with sanitized tokens
- Detailed error context with stack traces

**Key Log Markers:**
- `=== SEND-MESSAGE FUNCTION START ===`
- `=== SEND-MESSAGE FUNCTION SUCCESS ===`
- `=== SEND-MESSAGE FUNCTION ERROR ===`

### 2. `/api/generate-text.js` - Google AI Text Generation
**Logs Include:**
- Function entry/exit with timestamps and duration
- Request validation and parameter extraction
- Google AI initialization progress
- Model selection and content generation steps
- Response processing and text extraction
- API-specific error handling (quota, auth errors)

**Key Log Markers:**
- `=== GENERATE-TEXT FUNCTION START ===`
- `=== GENERATE-TEXT FUNCTION SUCCESS ===`
- `=== GENERATE-TEXT FUNCTION ERROR ===`

### 3. `/api/generate-images.js` - Google AI Image Generation
**Logs Include:**
- Function entry/exit with timestamps and duration
- Image generation parameter validation  
- Google AI initialization and Imagen model usage
- Image processing pipeline with per-image progress
- Base64 conversion tracking
- Comprehensive error analysis

**Key Log Markers:**
- `=== GENERATE-IMAGES FUNCTION START ===`
- `=== GENERATE-IMAGES FUNCTION SUCCESS ===`
- `=== GENERATE-IMAGES FUNCTION ERROR ===`

## Security Considerations

### Sensitive Data Sanitization
- **API Keys**: Only first 10 characters shown (e.g., `sk-1234567890***`)
- **Bot Tokens**: Sanitized during URL construction
- **Prompts**: Truncated to 100 characters for preview
- **Personal Data**: Email/name presence logged but not content

### Example Sanitized Logs
```javascript
console.log('Using API key prefix:', API_KEY.substring(0, 10) + '***');
console.log('Prompt preview:', prompt.substring(0, 100) + '...');
```

## Monitoring in Vercel

### Accessing Logs
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Navigate to "Functions" tab
4. Click on individual function invocations
5. Check "Logs" section for console output

### What to Look For

#### Successful Request Pattern
```
=== FUNCTION-NAME FUNCTION START ===
Timestamp: 2024-01-01T12:00:00.000Z
Request method: POST
...processing logs...
=== FUNCTION-NAME FUNCTION SUCCESS ===
Total duration (ms): 1250
```

#### Failed Request Pattern
```
=== FUNCTION-NAME FUNCTION START ===
Timestamp: 2024-01-01T12:00:00.000Z
...error occurs...
=== FUNCTION-NAME FUNCTION ERROR ===
Error name: TypeError
Error message: Cannot read property 'x' of undefined
Error stack: [full stack trace]
```

#### Common Failure Points

1. **Environment Variables Missing**
   ```
   Environment variables status:
   - GOOGLE_API_KEY present: false
   ```

2. **Request Body Issues**
   ```
   Request body exists: false
   Request body type: undefined
   ```

3. **API Authentication Failures**
   ```
   API key related error detected
   ```

4. **Network/Timeout Issues**
   ```
   Error name: TypeError
   Error message: fetch failed
   ```

## Debugging Workflow

### Step 1: Identify Function Failure
- Check if function starts (START marker present)
- Note timestamp of failure
- Check if it's a consistent issue or sporadic

### Step 2: Analyze Error Context
- Look for ERROR marker
- Check error name, message, and stack trace
- Identify if it's environment, network, or code issue

### Step 3: Trace Execution Path
- Follow the step-by-step logs to pinpoint exact failure
- Check which validation or processing step failed
- Note duration to understand if it's a timeout issue

### Step 4: Fix Common Issues

#### Environment Variables
```bash
vercel env add GOOGLE_API_KEY
vercel env add TELEGRAM_BOT_TOKEN
vercel env add TELEGRAM_USER_ID
```

#### Request Format Issues
- Ensure Content-Type: application/json
- Validate request body structure
- Check required fields are present

## Log Retention
- Vercel keeps function logs for 7 days on free plan
- Enable external log aggregation (e.g., LogDrain) for longer retention
- Consider implementing custom error reporting (e.g., Sentry) for critical issues

## Performance Impact
- Logging adds minimal overhead (~5-10ms per function)
- Production logging can be toggled with environment variable if needed
- Consider log level controls for future enhancement

## Future Enhancements
- Add request ID tracking for request correlation
- Implement structured logging (JSON format)
- Add performance metrics (response times, success rates)
- Create automated alerting based on error patterns