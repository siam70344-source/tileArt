import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import mongoose from "mongoose";

export async function GET(request, { params }) {
  try {
    await connectDB();
    const id = params.id;
    const readyState = mongoose.connection.readyState;
    const db = mongoose.connection.db;
    
    if (!db) {
      return NextResponse.json({ error: "DB not connected", readyState }, { status: 500 });
    }

    const tiles = await db.collection("tiles").find({}).toArray();
    const firstId = tiles[0]?._id?.toString();
    const tile = tiles.find(t => t._id.toString() === id);

    if (!tile) {
      return NextResponse.json({ 
        error: "Tile not found", 
        searched: id,
        total: tiles.length,
        firstId: firstId,
        match: firstId === id
      }, { status: 404 });
    }

    return NextResponse.json({ ...tile, _id: tile._id.toString() });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}