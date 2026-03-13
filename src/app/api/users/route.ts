import { NextResponse } from 'next/server';
import { getDataSource } from '@/lib/database';
import { User } from '@/entities/User';

export async function GET() {
  try {
    const dataSource = await getDataSource();
    const userRepo = dataSource.getRepository(User);
    const users = await userRepo.find({ order: { createdAt: 'DESC' } });
    return NextResponse.json(users);
  } catch (error) {
    console.error('Users API error:', error);
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}
