import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
  const positions = await prisma.position.findMany({ include: { division: true } });
  return NextResponse.json(positions);
}

export async function POST(req: NextRequest) {
  const { title, tier, divisionId } = await req.json();
  const newPosition = await prisma.position.create({
    data: { title, tier, divisionId },
  });
  return NextResponse.json(newPosition);
}
