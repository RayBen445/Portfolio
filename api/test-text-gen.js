// Simple test script for api/generate-text.js
// To run:
// 1. Make sure you have node installed.
// 2. Create a .env file in the root directory with your GOOGLE_API_KEY.
//    Example .env file:
//    GOOGLE_API_KEY=your_google_api_key_here
// 3. Run `npm install` to get dependencies.
// 4. Run this script from the root directory: `node -r dotenv/config api/test-text-gen.js`

const handler = require('./generate-text.js');

async function runTest() {
  console.log('--- Running Text Generation Test ---');

  // Mock request and response objects
  const req = {
    method: 'POST',
    body: {
      prompt: 'What is the capital of France?',
      model: 'gemini-1.5-flash-latest'
    }
  };

  const res = {
    statusCode: null,
    body: null,
    headers: {},
    setHeader(key, value) {
      this.headers[key] = value;
    },
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(data) {
      this.body = JSON.stringify(data, null, 2);
      this.headers['Content-Type'] = 'application/json';
      this.end();
    },
    end() {
      console.log(`\n--- Test Complete ---`);
      console.log(`Status Code: ${this.statusCode}`);
      console.log(`Response Body:`);
      console.log(this.body);

      if (this.statusCode === 200) {
        console.log('\n✅ Test Passed: Successfully generated text.');
      } else {
        console.log('\n❌ Test Failed: Did not receive a 200 OK response.');
      }
    }
  };

  try {
    await handler(req, res);
  } catch (error) {
    console.error('An unexpected error occurred during the test:', error);
  }
}

runTest();
