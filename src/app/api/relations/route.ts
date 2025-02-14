import { NextResponse } from 'next/server';
import { prisma } from '../../../../prisma/index';

export async function POST(req: Request) {
  const { sourceId, targetId } = await req.json();

  try {
    const relation = await prisma.relation.create({
      data: { sourceId, targetId },
    });
    return new Response(JSON.stringify(relation), { status: 201 });
  } catch (error) {
    console.error('Error creating relation:', error);
    return new Response(JSON.stringify({ error: 'Failed to create relation' }), { status: 500 });
  }
}

export async function GET() {
  const relations = await prisma.relation.findMany();
  return NextResponse.json(relations);
}
