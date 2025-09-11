// Simple test function to verify Vercel serverless setup
module.exports = async function handler(req, res) {
  console.log('=== TEST FUNCTION START ===');
  console.log('Method:', req.method);
  console.log('Timestamp:', new Date().toISOString());
  
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    console.log('OPTIONS request handled');
    return res.status(200).end();
  }
  
  console.log('Returning test response');
  return res.status(200).json({
    success: true,
    message: 'Test function working',
    timestamp: new Date().toISOString(),
    method: req.method,
    node_version: process.version
  });
};