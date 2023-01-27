require("dotenv").config();
export default {
  port: 3333,
  accessTokenExpiresIn: 15,
  refreshTokenExpiresIn: 60,
  accessTokenPrivateKey: process.env.REFRESH_TOKEN_PRIVATE_KEY,
  refreshTokenPrivateKey: process.env.REFRESH_TOKEN_PRIVATE_KEY,
};
