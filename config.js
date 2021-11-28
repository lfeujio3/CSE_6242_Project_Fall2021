const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  api_key: process.env.API_KEY,
  mongo_conn_string: process.env.MONGO_CONN_STRING
};


