import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
  try {
    // Verify Middleware worked
    const userRole = req.headers.get("x-user-role");

    // Pagination logic
    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get('page')) || 1;
    const limit = Number(searchParams.get('limit')) || 10;
    const skip = (page - 1) * limit;

    const data = await prisma.user.findMany({
      skip: skip,
      take: limit,
      select: {
        id: true,
        name: true,
        email: true,
        role: true, 
        createdAt: true,
        // PASSWORD IS EXCLUDED FOR SAFETY
      }
    });

    const total = await prisma.user.count();

    return NextResponse.json({
      success: true,
      currentUserRole: userRole,
      pagination: { page, limit, total },
      data: data
    });

  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}

// Admin-only User Creation
export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body) return NextResponse.json({ error: 'Missing body' }, { status: 400 });

    const newData = await prisma.user.create({
      data: body,
    });
    return NextResponse.json({ message: 'Created successfully', data: newData }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Error creating user' }, { status: 500 });
  }
}