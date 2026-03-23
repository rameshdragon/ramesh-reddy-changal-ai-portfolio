import { NextRequest, NextResponse } from "next/server";
import { answerResumeQuestion } from "@/lib/resume-assistant";

export async function POST(request: NextRequest) {
  const body = (await request.json()) as { question?: string; history?: string[] };
  const question = body.question?.trim();
  const history = Array.isArray(body.history) ? body.history.filter((item): item is string => typeof item === "string") : [];

  if (!question) {
    return NextResponse.json({ error: "Question is required." }, { status: 400 });
  }

  const result = await answerResumeQuestion(question, history);
  return NextResponse.json(result);
}
