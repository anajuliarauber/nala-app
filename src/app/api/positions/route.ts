import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../prisma/index';

export async function GET() {
  const positions = await prisma.position.findMany({ include: { division: true } });
  return NextResponse.json(positions);
}

export async function POST(req: NextRequest) {
  const { title, tier, divisionId, x, y } = await req.json();
  const newPosition = await prisma.position.create({
    data: { title, tier, divisionId, x, y },
  });
  return NextResponse.json(newPosition);
}
