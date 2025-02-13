import { NextApiRequest } from 'next';
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
  const positions = await prisma.position.findMany({ include: { division: true } });
  return NextResponse.json(positions);
}

export async function POST(req: NextApiRequest) {
  const { title, tier, divisionId } = req.body;
  const newPosition = await prisma.position.create({
    data: { title, tier, divisionId },
  });
  return NextResponse.json(newPosition);
}
