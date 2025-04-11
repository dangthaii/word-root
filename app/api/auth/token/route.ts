import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { v4 as uuidv4 } from "uuid";
import { db } from "@/lib/db";
import { authOptions } from "@/lib/auth";

// Create refresh token
export async function POST() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + 30); // 30 days

  const token = await db.token.create({
    data: {
      token: uuidv4(),
      userId: session.user.id,
      expiresAt: expiryDate,
    },
  });

  return NextResponse.json({ refreshToken: token.token });
}

// Refresh access token
export async function PUT(req: Request) {
  try {
    const { refreshToken } = await req.json();

    const storedToken = await db.token.findUnique({
      where: { token: refreshToken },
      include: { user: true },
    });

    if (!storedToken || new Date() > storedToken.expiresAt) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }

    // Here you would normally generate a new JWT token
    // For now just return the user info
    return NextResponse.json({
      user: {
        id: storedToken.user.id,
        name: storedToken.user.name,
        email: storedToken.user.email,
      },
    });
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
