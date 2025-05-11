import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const body = await req.json();
  const record = await prisma.carte.create({
    data: {
      patient: body.patient,
      visitedAt: new Date(body.visitedAt),
      nextVisitAt: body.nextVisitAt ? new Date(body.nextVisitAt) : null,
      notes: body.notes,
    },
  });
  return NextResponse.json(record);
}
