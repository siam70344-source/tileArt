import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import mongoose from "mongoose";

export async function GET(request, { params }) {
  try {
    await connectDB();
    
    // Wait for connection to be ready
    const db = mongoose.connection.db;
    if (!db) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    const database = mongoose.connection.db;
    const id = params.id;

    const tiles = await database.collection("tiles").find({}).toArray();
    const tile = tiles.find(t => t._id.toString() === id);

    if (!tile) {
      return NextResponse.json({ error: "Tile not found", id }, { status: 404 });
    }

    return NextResponse.json({ ...tile, _id: tile._id.toString() });
  } catch (error) {
    console.error("Tile fetch error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}