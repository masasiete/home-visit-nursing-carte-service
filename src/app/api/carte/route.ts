// import { PrismaClient } from "@prisma/client";
import { PrismaClient } from "generated/prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const cartes = await prisma.carte.findMany({
      orderBy: {
        visitedAt: 'desc'
      }
    });
    return NextResponse.json(cartes);
  } catch (error) {
    console.error("Error fetching cartes:", error);
    return NextResponse.json({ error: "エラーが発生しました" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const body = await req.json();

  try {
    const newCarte = await prisma.carte.create({
      data: {
        patient: body.patient,
        visitedAt: new Date(body.visitedAt),
        nextVisitAt: body.nextVisitAt ? new Date(body.nextVisitAt) : null,
        notes: body.notes,
      },
    });
    return NextResponse.json(newCarte);
  } catch (error) {
    console.error("Error creating carte:", error);
    return NextResponse.json({ error: "エラーが発生しました" }, { status: 500 });
  }
}
