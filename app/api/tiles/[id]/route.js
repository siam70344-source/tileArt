import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import mongoose from "mongoose";

export async function GET(request, { params }) {
  try {
    await connectDB();
    const id = params.id;
    const db = mongoose.connection.db;

    const tiles = await db.collection("tiles").find({}).toArray();
    
    // Debug first tile
    const first = tiles[0];
    const firstIdRaw = first?._id;
    const firstIdStr = String(firstIdRaw);
    const firstIdJSON = JSON.stringify(firstIdRaw);

    const tile = tiles.find(t => String(t._id) === id || JSON.stringify(t._id) === `"${id}"`);

    if (!tile) {
      return NextResponse.json({ 
        error: "Tile not found",
        id,
        firstIdRaw: firstIdJSON,
        firstIdStr,
        match: firstIdStr === id,
      }, { status: 404 });
    }

    return NextResponse.json({ ...tile, _id: String(tile._id) });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}