import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import mongoose from "mongoose";

export async function GET(request, { params }) {
  try {
    await connectDB();
    const db = mongoose.connection.db;
    const id = params.id;

    // Search by string _id directly (since your IDs were inserted as strings)
    const tile = await db.collection("tiles").findOne({ 
      _id: id 
    });

    if (!tile) {
      // Try to find any tile to debug
      const anyTile = await db.collection("tiles").findOne({});
      console.log("Sample tile _id type:", typeof anyTile?._id, "value:", anyTile?._id);
      return NextResponse.json({ error: "Tile not found", searched_id: id }, { status: 404 });
    }
    
    return NextResponse.json({ ...tile, _id: tile._id.toString() });
  } catch (error) {
    console.error("Tile fetch error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}