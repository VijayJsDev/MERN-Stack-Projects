// otpService.js
import twilio from 'twilio';

const accountSid = 'ACd35fdc27eb64824300f2b24a0c96da68'
const authToken = '43541c560f731c00ce716e2e3645e142';
const client = twilio(accountSid, authToken);

async function sendOTP(phoneNumber) {
  const otp = Math.floor(100000 + Math.random() * 900000); // Generate 6-digit OTP
  
  try {
    await client.messages.create({
      body: `Your OTP is: ${otp}`,
      from: '6383213129',
      to: phoneNumber
    });
    return otp;
  } catch (error) {
    console.error('Error sending OTP:', error);
    throw new Error('Failed to send OTP');
  }
}

function verifyOTP(storedOtp, otp) {
  return storedOtp === otp;
}

export { sendOTP, verifyOTP };
