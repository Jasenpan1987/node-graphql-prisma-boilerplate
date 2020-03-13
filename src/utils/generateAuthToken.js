import jwt from "jsonwebtoken";

const generateAuthToken = userId =>
  jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7 days"
  });

export default generateAuthToken;
