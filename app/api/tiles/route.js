import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import mongoose from "mongoose";

export async function GET() {
  try {
    await connectDB();

    const db = mongoose.connection.db;
    const tiles = await db.collection("tiles").find({}).toArray();

    const result = tiles.map((tile) => ({
      ...tile,
      _id: tile._id.toString(),
    }));

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to fetch tiles" },
      { status: 500 }
    );
  }
}