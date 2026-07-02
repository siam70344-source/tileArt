import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import mongoose from "mongoose";

export async function GET(request, { params }) {
  try {
    await connectDB();
    const db = mongoose.connection.db;
    const { ObjectId } = mongoose.Types;
    const tile = await db.collection("tiles").findOne({ 
      _id: new ObjectId(params.id) 
    });
    if (!tile) return NextResponse.json({ error: "Tile not found" }, { status: 404 });
    return NextResponse.json({ ...tile, _id: tile._id.toString() });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch tile" }, { status: 500 });
  }
}