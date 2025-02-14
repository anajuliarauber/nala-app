import { prisma } from '../../../../prisma/index';
import { NextResponse } from 'next/server';

export async function GET() {
  const divisions = await prisma.division.findMany();
  return NextResponse.json(divisions);
}
