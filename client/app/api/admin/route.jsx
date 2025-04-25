import { NextResponse } from "next/server";

const PASSWORD = process.env.PASSWORD;

export async function POST(req) {
  const { password } = await req.json();

  if (!password) {
    return NextResponse.json(
      { success: false, message: "Password required" },
      { status: 400 }
    );
  }

  if (password === PASSWORD) {
    return NextResponse.json({ success: true });
  } else {
    return NextResponse.json(
      { success: false, message: "Incorrect password" },
      { status: 401 }
    );
  }
}
