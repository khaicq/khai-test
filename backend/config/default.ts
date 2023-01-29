require("dotenv").config();
export default {
  port: 3333,
  accessTokenExpiresIn: 15,
  refreshTokenExpiresIn: 60,
  accessTokenPrivateKey: process.env.ACCESS_TOKEN_PRIVATE_KEY,
  accessTokenPublicKey: process.env.ACCESS_TOKEN_PUBLIC_KEY,
  refreshTokenPrivateKey: process.env.REFRESH_TOKEN_PRIVATE_KEY,
  refreshTokenPublicKey: process.env.REFRESH_TOKEN_PUBLIC_KEY,
};
