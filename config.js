const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  privateKey: process.env.PRIVATE_KEY,
  client_id: process.env.CLIENT_ID,
  client_secret: process.env.CLIENT_SECRET,
  organization_id: process.env.ORGANIZATION_ID ,
  email: process.env.EMAIL,
  password: process.env.PASSWORD
};


