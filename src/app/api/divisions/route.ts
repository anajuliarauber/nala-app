
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
  const divisions = await prisma.division.findMany();
  return NextResponse.json(divisions);
}
