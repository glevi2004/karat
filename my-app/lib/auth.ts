import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "karat-dev-secret";

export function signToken(userId: string): string {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string): { userId: string } | null {
  try {
    return jwt.verify(token, JWT_SECRET) as { userId: string };
  } catch {
    return null;
  }
}

export function getUserIdFromRequest(req: Request): string | null {
  const authHeader = req.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) return null;
  const decoded = verifyToken(authHeader.slice(7));
  return decoded?.userId ?? null;
}
