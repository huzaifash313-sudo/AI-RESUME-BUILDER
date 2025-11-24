import jwt from "jsonwebtoken";

export class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}
const protect = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    throw new ApiError(401, "Unauthorized");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    throw new ApiError(401, "Unauthorized");
  }
};

export default protect;