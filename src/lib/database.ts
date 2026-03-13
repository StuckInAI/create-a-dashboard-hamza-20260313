import 'reflect-metadata';
import { DataSource } from 'typeorm';
import path from 'path';
import fs from 'fs';
import { User } from '@/entities/User';
import { Activity } from '@/entities/Activity';

let dataSource: DataSource | null = null;

export async function getDataSource(): Promise<DataSource> {
  if (dataSource && dataSource.isInitialized) {
    return dataSource;
  }

  const dbPath = process.env.DATABASE_PATH || './data/dashboard.sqlite';
  const resolvedPath = path.resolve(process.cwd(), dbPath);
  const dir = path.dirname(resolvedPath);

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  dataSource = new DataSource({
    type: 'better-sqlite3',
    database: resolvedPath,
    entities: [User, Activity],
    synchronize: true,
    logging: false,
  });

  await dataSource.initialize();
  await seedDatabase(dataSource);

  return dataSource;
}

async function seedDatabase(ds: DataSource): Promise<void> {
  const userRepo = ds.getRepository(User);
  const activityRepo = ds.getRepository(Activity);

  const userCount = await userRepo.count();
  if (userCount > 0) return;

  const roles = ['Admin', 'Developer', 'Designer', 'Manager', 'Analyst', 'Support'];
  const statuses: Array<'active' | 'inactive'> = ['active', 'inactive'];
  const names = [
    'Alice Johnson', 'Bob Smith', 'Carol White', 'David Brown',
    'Emma Davis', 'Frank Miller', 'Grace Wilson', 'Henry Moore',
    'Isabella Taylor', 'James Anderson',
  ];

  const users: User[] = [];
  for (let i = 0; i < 10; i++) {
    const user = new User();
    user.name = names[i];
    user.email = `${names[i].toLowerCase().replace(' ', '.')}@example.com`;
    user.role = roles[i % roles.length];
    user.status = statuses[i % 2];
    const saved = await userRepo.save(user);
    users.push(saved);
  }

  const activityTypes = ['login', 'logout', 'create', 'update', 'delete', 'view', 'export'];
  const activityDescriptions = [
    'User logged into the system',
    'User logged out of the system',
    'New record created successfully',
    'Record updated with new information',
    'Record deleted from database',
    'Dashboard viewed',
    'Report exported to CSV',
    'Settings updated',
    'Password changed',
    'New user invited',
    'File uploaded successfully',
    'Notification sent to team',
    'API key generated',
    'Backup completed',
    'System health check passed',
    'Integration connected',
    'Workflow automated',
    'Alert triggered',
    'Data imported successfully',
    'Cache cleared',
  ];

  for (let i = 0; i < 20; i++) {
    const activity = new Activity();
    activity.description = activityDescriptions[i];
    activity.type = activityTypes[i % activityTypes.length];
    activity.userId = users[i % users.length].id;
    await activityRepo.save(activity);
  }
}
