import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || "supersecretkey"; // Must match your authController secret

export interface AuthRequest extends Request {
  user?: { id: string; role: string };
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Get "TOKEN" from "Bearer TOKEN"

  if (!token) {
    return res.status(401).json({ error: "Access denied. Token missing." });
  }

  try {
    const verified = jwt.verify(token, SECRET_KEY) as { id: string; role: string };
    (req as AuthRequest).user = verified;
    next();
  } catch (error) {
    res.status(403).json({ error: "Invalid token" });
  }
};