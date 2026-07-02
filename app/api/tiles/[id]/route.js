import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import mongoose from "mongoose";

export async function GET(request, { params }) {
  try {
    await connectDB();
    const db = mongoose.connection.db;
    const id = params.id;

    // Get all tiles and find by string match
    const tiles = await db.collection("tiles").find({}).toArray();
    const tile = tiles.find(t => t._id.toString() === id);

    if (!tile) {
      return NextResponse.json({ error: "Tile not found" }, { status: 404 });
    }

    return NextResponse.json({ ...tile, _id: tile._id.toString() });
  } catch (error) {
    console.error("Tile fetch error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}