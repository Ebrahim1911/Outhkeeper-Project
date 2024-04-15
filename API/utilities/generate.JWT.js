import JWT from "jsonwebtoken";
const generateJWT = async (payload) => {
  const token = await JWT.sign(payload, process.env.JWT_SECRET_KEY);
  return token;
};
export { generateJWT };
