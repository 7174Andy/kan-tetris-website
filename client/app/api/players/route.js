import dbConnect from "@/lib/mongodb";
import Player from "@/models/Player";
import { NextResponse } from "next/server";

export async function GET(req, res) {
  try {
    await dbConnect();
    const players = await Player.find();
    return NextResponse.json(players, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { success: false, message: "Failed to fetch players" },
      { status: 500 }
    );
  }
}
