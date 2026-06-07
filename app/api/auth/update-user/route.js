import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import mongoose from "mongoose";

export async function POST(request) {
  try {
    await connectDB();
    const { name, image } = await request.json();
    const cookie = request.headers.get("cookie");

    // Get session from better-auth
    const sessionRes = await fetch(`${process.env.BETTER_AUTH_URL}/api/auth/get-session`, {
      headers: { cookie: cookie || "" },
    });
    const session = await sessionRes.json();
    if (!session?.user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const db = mongoose.connection.db;
    await db.collection("user").updateOne(
      { email: session.user.email },
      { $set: { name, image: image || null } }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ message: "Update failed" }, { status: 500 });
  }
}