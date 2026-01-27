import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

interface RouteParams {
  params: { id: string };
}

export async function GET(req: Request, { params }: RouteParams) {
  try {
    const id = Number(params.id);
    
    const user = await prisma.user.findUnique({
      where: { id: id },
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
    const id = Number(params.id);
    const body = await req.json();

    const updatedUser = await prisma.user.update({
      where: { id: id },
      data: { name: body.name, email: body.email },
    });

    return NextResponse.json({ message: 'User updated', data: updatedUser });
  } catch (error) {
    return NextResponse.json({ error: 'Error updating user' }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: RouteParams) {
  try {
    const id = Number(params.id);
    await prisma.user.delete({ where: { id: id } });
    return NextResponse.json({ message: 'User deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Error deleting user' }, { status: 500 });
  }
}