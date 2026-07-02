import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import mongoose from "mongoose";

export async function GET(request, { params }) {
  try {
    await connectDB();

    const { id } = await params; // ✅ required in Next.js 16

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid tile ID" }, { status: 400 });
    }

    const db = mongoose.connection.db;
    const tile = await db.collection("tiles").findOne({
      _id: new mongoose.Types.ObjectId(id),
    });

    if (!tile) {
      return NextResponse.json({ message: "Tile not found" }, { status: 404 });
    }

    tile._id = tile._id.toString();
    return NextResponse.json(tile);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to fetch tile" }, { status: 500 });
  }
}