import { NextRequest, NextResponse } from "next/server";
import { readDB, audit, mutateDB } from "@/lib/store";
import { newSession, safeUser, verifyPassword } from "@/lib/auth";
export async function POST(req: NextRequest) {
  const b = await req.json().catch(() => ({}));
  const email = String(b.email || "")
      .trim()
      .toLowerCase(),
    password = String(b.password || "");
  const user = (await readDB()).users.find((u) => u.email === email);
  if (!user || !verifyPassword(password, user.passwordHash))
    return NextResponse.json(
      { error: "Invalid email or password." },
      { status: 401 },
    );
  if (b.adminOnly === true && user.role !== "admin")
    return NextResponse.json(
      { error: "This account does not have administrator access." },
      { status: 403 },
    );
  await mutateDB((db) => audit(db, user.id, "login", "Successful login"));
  const res = NextResponse.json({ user: safeUser(user) });
  res.cookies.set("dbh_session", newSession(user.id), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}
