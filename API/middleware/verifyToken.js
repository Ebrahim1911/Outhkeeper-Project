import JWT from "jsonwebtoken";
const verifyToken = (req, res, next) => {
  const authorizationHeader =
    req.headers["Authorization"] || req.headers["authorization"];
  const token = authorizationHeader.split(" ")[1];
  const decodedToken = JWT.verify(token, process.env.JWT_SECRET_KEY);
  console.log("from verify", decodedToken);
  req.currentUser = decodedToken;
  next();
};
export { verifyToken };
