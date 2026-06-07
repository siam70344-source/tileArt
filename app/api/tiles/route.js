import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import mongoose from "mongoose";

export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get("limit") ? parseInt(searchParams.get("limit")) : 0;
    const db = mongoose.connection.db;
    const tiles = await db.collection("tiles").find({}).limit(limit).toArray();
    const formatted = tiles.map((tile) => ({
      ...tile,
      _id: tile._id.toString(),
    }));
    return NextResponse.json(formatted);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch tiles" }, { status: 500 });
  }
}