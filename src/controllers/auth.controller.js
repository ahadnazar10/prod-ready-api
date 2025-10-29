import prisma from "../config/prisma.js";
import {
  hashPassword,
  comparePassword,
  generateAccessToken,
  generateRefreshToken,
} from "../utils/auth.js";

// ---------- Signup ----------
export async function signup(req, res, next) {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password)
      return res
        .status(400)
        .json({
          success: false,
          message: "Name, email, and password are required",
        });

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing)
      return res
        .status(400)
        .json({ success: false, message: "Email already registered" });

    const hashed = await hashPassword(password);

    const user = await prisma.user.create({
      data: { name, email, password: hashed, role: role || "user" },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    res.status(201).json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
}

// ---------- Login ----------
export async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res
        .status(400)
        .json({ success: false, message: "Email and password required" });

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });

    const match = await comparePassword(password, user.password);
    if (!match)
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });

    const payload = { id: user.id, role: user.role };
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    res.json({
      success: true,
      data: {
        accessToken,
        refreshToken,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
    });
  } catch (err) {
    next(err);
  }
}
