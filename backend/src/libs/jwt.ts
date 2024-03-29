import jwt, { SignOptions } from "jsonwebtoken";
import config from "config";

export const signJwt = (
  payload,
  key: "accessTokenPrivateKey" | "refreshTokenPrivateKey",
  options: SignOptions
) => {
  const privateKey = Buffer.from(config.get<string>(key), "base64").toString(
    "ascii"
  );
  return jwt.sign(payload, privateKey, {
    ...(options && options),
    algorithm: "RS256",
  });
};

export const verifyJwt = <T>(
  token,
  key: "accessTokenPublicKey" | "refreshTokenPublicKey"
): T | null => {
  try {
    const publicKey = Buffer.from(config.get<string>(key), "base64").toString(
      "ascii"
    );
    return jwt.verify(token, publicKey, { algorithms: ["RS256"] }) as T;
  } catch (err: any) {
    console.log(err.message);
    throw err;
  }
};
