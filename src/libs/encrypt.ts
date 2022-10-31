import { createHmac } from "node:crypto";

const encode = (str: string, key: string) => {
  const hmac = createHmac("sha256", key);
  hmac.update(str);
  return hmac.digest("hex");
};

export { encode };
