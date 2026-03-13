import { NextResponse } from 'next/server';
import { getDataSource } from '@/lib/database';
import { Activity } from '@/entities/Activity';

export async function GET() {
  try {
    const dataSource = await getDataSource();
    const activityRepo = dataSource.getRepository(Activity);
    const activities = await activityRepo.find({
      order: { createdAt: 'DESC' },
      take: 10,
    });
    return NextResponse.json(activities);
  } catch (error) {
    console.error('Activities API error:', error);
    return NextResponse.json({ error: 'Failed to fetch activities' }, { status: 500 });
  }
}
