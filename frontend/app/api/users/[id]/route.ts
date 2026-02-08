import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// ✅ FIX 1: params is now a Promise
interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(req: Request, { params }: RouteParams) {
  try {
    // ✅ FIX 2: Await the params before using them
    const { id } = await params;
    const userId = Number(id);
    
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { bookings: true } 
    });

    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching user' }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: RouteParams) {
  try {
    // ✅ FIX 2: Await params here too
    const { id } = await params;
    const userId = Number(id);

    const body = await req.json();

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { name: body.name, email: body.email },
    });

    return NextResponse.json({ message: 'User updated', data: updatedUser });
  } catch (error) {
    return NextResponse.json({ error: 'Error updating user' }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: RouteParams) {
  try {
    // ✅ FIX 2: And await params here
    const { id } = await params;
    const userId = Number(id);

    await prisma.user.delete({ where: { id: userId } });
    return NextResponse.json({ message: 'User deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Error deleting user' }, { status: 500 });
  }
}