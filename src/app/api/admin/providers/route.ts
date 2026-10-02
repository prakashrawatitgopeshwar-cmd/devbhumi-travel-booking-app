import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@/lib/auth";
import { readDB, mutateDB, audit } from "@/lib/store";
export async function GET() {
  const u = await currentUser();
  if (!u || u.role !== "admin")
    return NextResponse.json(
      { error: "Admin access required" },
      { status: 403 },
    );
  const db = await readDB();
  return NextResponse.json({
    providers: db.providers.map((p) => ({
      ...p,
      owner: db.users.find((x) => x.id === p.userId)?.email || "unknown",
    })),
    bookings: db.bookings,
    audit: db.audit,
    users: db.users.map((x) => ({
      id: x.id,
      name: x.name,
      email: x.email,
      role: x.role,
      createdAt: x.createdAt,
    })),
  });
}
export async function PATCH(req: NextRequest) {
  const u = await currentUser();
  if (!u || u.role !== "admin")
    return NextResponse.json(
      { error: "Admin access required" },
      { status: 403 },
    );
  const b = await req.json().catch(() => ({}));
  if (
    !["approved", "rejected", "changes_requested"].includes(b.status) ||
    !b.id
  )
    return NextResponse.json(
      { error: "Valid provider id and status required" },
      { status: 400 },
    );
  try {
    const p = await mutateDB((db) => {
      const item = db.providers.find((x) => x.id === b.id);
      if (!item) throw new Error("Provider application not found");
      item.status = b.status;
      item.adminNote = String(b.note || "").slice(0, 500);
      audit(
        db,
        u.id,
        "provider_status",
        `${item.businessName}: ${item.status}`,
      );
      return item;
    });
    return NextResponse.json({ provider: p });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Update failed" },
      { status: 404 },
    );
  }
}
