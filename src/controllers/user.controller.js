import prisma from "../config/prisma.js";

export async function getAllUsers(req, res, next) {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });
    res.json({ success: true, data: users });
  } catch (err) {
    next(err);
  }
}
