import { generateGeminiText } from "@/utils/GeminiAIModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const PROMPT = await req.json();
    const text = await generateGeminiText(PROMPT);
    if (text) {
        return NextResponse.json(text, { status: 200 });
    } else {
        return NextResponse.json({message: "Failed to generate text"}, { status: 422 });
    }
}