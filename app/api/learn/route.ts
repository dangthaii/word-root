import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const wordRoots = await db.wordRoot.findMany({
      include: {
        words: true,
      },
    });

    return NextResponse.json({ wordRoots });
  } catch (error) {
    console.error("Error fetching word roots:", error);
    return NextResponse.json(
      { error: "Failed to fetch word roots" },
      { status: 500 }
    );
  }
}
