require('dotenv').config();
const { emailService } = require('../lib/email/email-service');

async function testEmailSystem() {
  console.log('Testing email system...');
  
  try {
    const result = await emailService.testConnection();
    
    console.log('\nTest Results:');
    console.log('-------------');
    console.log('Success:', result.success);
    console.log('Message:', result.message);
    
    if (!result.success) {
      process.exit(1);
    }
  } catch (error) {
    console.error('\nTest failed:', error);
    process.exit(1);
  }
}

testEmailSystem();