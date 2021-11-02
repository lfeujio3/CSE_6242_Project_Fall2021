const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  privateKey: process.env.PRIVATE_KEY,
  client_id: process.env.CLIENT_ID,
  client_secret: process.env.CLIENT_SECRET,
  organization_id: process.env.ORGANIZATION_ID,
  technical_account_id: process.env.TECHNICAL_ACCOUNT_ID,
  technical_account_email: process.env.TECHNICAL_ACCOUNT_EMAIL,
  email: process.env.EMAIL,
  password: process.env.PASSWORD
};
