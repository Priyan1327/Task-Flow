import jwt from "jsonwebtoken";

export function verifyToken(req, res, next) {
  // ✅ Extract JWT from cookies
  const token = req.cookies?.token;

  if (!token) {
    console.log("❌ No token in cookies");
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    // ✅ Verify token with your secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // ✅ Attach user to request object
    req.user = {
      userId: decoded.userId,
      username: decoded.username,
      role: decoded.role,
    };

    console.log("✅ Token Verified:", decoded);
    next();
  } catch (error) {
    console.error("❌ Token Verification Failed:", error.message);
    return res.status(401).json({ error: "Invalid token" });
  }
}

// ✅ Role-based middleware using cookie JWT
export const checkRole = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: "Access denied" });
    }
    next();
  };
};
