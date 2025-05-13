import dbConnect from "@/lib/mongodb";
import Game from "@/models/Game";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await dbConnect();
    const formData = await req.formData();
    const image = formData.get("image");
    const ranking = formData.get("ranking");

    if (!image || !ranking || !(image instanceof Blob)) {
      return NextResponse.json(
        { success: false, message: "Image and ranking are required" },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await image.arrayBuffer());
    const base64Image = buffer.toString("base64");

    const game = new Game({
      ranking: JSON.parse(ranking),
      image: base64Image,
    });

    await game.save();

    return NextResponse.json(
      { success: true, message: "Game saved successfully" },
      { status: 200 }
    );
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { success: false, message: "Failed to save game" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await dbConnect();
    const games = await Game.find({}).sort({ createdAt: -1 });
    return NextResponse.json(games, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { success: false, message: "Failed to fetch games" },
      { status: 500 }
    );
  }
}
