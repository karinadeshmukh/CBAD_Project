import Jwt from "jsonwebtoken";
import dotenv from "dotenv"
dotenv.config()

function authenticateJWT(req, res, next) {
  const authHeader = req.headers['authorization'];

  if (authHeader && authHeader.startsWith(`Bearer `)) {
    const token = authHeader.split(" ")[1];

    Jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
      if (err) {
        return res.status(403).json({ msg: "Invalid or expired token" });
      }
      req.user = decoded;
      next();
    });
  } else {
    return res
      .status(401)
      .json({ msg: "Authorization header missing or malformed" });
  }
}

export default authenticateJWT