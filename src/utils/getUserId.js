import jwt from "jsonwebtoken";

const getUserId = (req, requireAuth = true) => {
  try {
    const isHttpRequest = !!req.request;
    // in websocket, the authentication token lives in req.connection.context.Authentication
    const header = isHttpRequest
      ? req.request.headers.authentication
      : req.connection.context.Authentication;

    const token = header.replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.userId;
  } catch (error) {
    if (requireAuth) {
      throw new Error("Authentication failed.");
    }
    return null;
  }
};

export default getUserId;
