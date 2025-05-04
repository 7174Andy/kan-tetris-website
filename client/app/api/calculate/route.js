import { NextRequest, NextResponse } from "next/server";
import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  const formData = await req.formData();
  const image = formData.get("image");

  if (!image) {
    return NextResponse.json(
      { success: false, message: "Image is required" },
      { status: 400 }
    );
  }

  const imageBuffer = await image.arrayBuffer();
  const buffer = Buffer.from(imageBuffer);
  const base64Image = buffer.toString("base64");

  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: "This is the result of a Tetris game. Based on the image, provide the ranking of the game ONLY in a valid JSON format with integer keys 'ranking' and 'nickname' to display rankings for all players. No other explanation is needed.",
          },
          {
            type: "image_url",
            image_url: {
              url: `data:image/png;base64,${base64Image}`,
            },
          },
        ],
      },
    ],
    tools: [
      {
        type: "function",
        function: {
          name: "analyze_image",
          description: "Analyze the image and provide ranking.",
          parameters: {
            type: "object",
            properties: {
              players: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    nickname: {
                      type: "string",
                      description: "Nickname of the player",
                    },
                    ranking: {
                      type: "integer",
                      description: "Ranking of the player",
                    },
                  },
                  required: ["nickname", "ranking"],
                },
              },
            },
          },
          required: ["players"],
        },
      },
    ],
    tool_choice: { type: "function", function: { name: "analyze_image" } },
  });

  const result =
    response.choices[0]?.message?.tool_calls?.[0]?.function?.arguments;

  let jsonResult;
  try {
    jsonResult = JSON.parse(result);
  } catch (err) {
    console.error("Failed to parse JSON:", err);
    jsonResult = { error: "Invalid JSON returned from model." };
  }

  return NextResponse.json({ result: jsonResult }, { status: 200 });
}
