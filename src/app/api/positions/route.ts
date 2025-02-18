import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../prisma/index';

export async function GET() {
  const positions = await prisma.position.findMany({ include: { division: true } });
  return NextResponse.json(positions);
}

export async function POST(req: NextRequest) {
  const { title, divisionId, x, y } = await req.json();
  const newPosition = await prisma.position.create({
    data: { title, divisionId, x, y },
  });
  return NextResponse.json(newPosition);
}

export async function PUT(req: NextRequest) {
  try {
    const { id, title, divisionId, x, y } = await req.json();

    const updatedPosition = await prisma.position.update({
      where: { id },
      data: {
        ...(title !== undefined && { title }),
        ...(divisionId !== undefined && { divisionId }),
        ...(x !== undefined && { x }),
        ...(y !== undefined && { y }),
      },
    });

    return NextResponse.json(updatedPosition);
  } catch {
    return NextResponse.json({ error: 'Failed to update position' }, { status: 400 });
  }
}
