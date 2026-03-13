import { NextResponse } from 'next/server';
import { getDataSource } from '@/lib/database';
import { User } from '@/entities/User';
import { Activity } from '@/entities/Activity';

export async function GET() {
  try {
    const dataSource = await getDataSource();
    const userRepo = dataSource.getRepository(User);
    const activityRepo = dataSource.getRepository(Activity);

    const totalUsers = await userRepo.count();
    const activeUsers = await userRepo.count({ where: { status: 'active' } });
    const totalActivities = await activityRepo.count();
    const growth = totalUsers > 0 ? Math.round((activeUsers / totalUsers) * 100) : 0;

    return NextResponse.json({
      totalUsers,
      activeUsers,
      totalActivities,
      growth,
    });
  } catch (error) {
    console.error('Stats API error:', error);
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }
}
