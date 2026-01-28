import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../lib/prisma"; // Adjust path if needed

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

// --- SIGNUP ---
export const signup = async (req: Request, res: Response): Promise<any> => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "Missing fields" });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: { 
        name, 
        email, 
        password: hashedPassword,
        role: "user" // Default role
      },
    });

    // Exclude password from response
    const { password: _, ...userWithoutPassword } = newUser;

    return res.status(201).json({ 
      success: true, 
      message: "Signup successful", 
      user: userWithoutPassword 
    });

  } catch (error) {
    return res.status(500).json({ success: false, message: "Signup failed", error });
  }
};

// --- LOGIN ---
export const login = async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    // 👇 UPDATED: Include Name and Role in the Token
    const token = jwt.sign(
      { 
        id: user.id, 
        email: user.email, 
        role: user.role,           // Needed for permissions
        name: user.name || "User"  // Needed for Frontend UI
      }, 
      JWT_SECRET, 
      { expiresIn: "7d" } // Increased to 7 days for better UX
    );

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
    });

  } catch (error) {
    return res.status(500).json({ success: false, message: "Login failed", error });
  }
};