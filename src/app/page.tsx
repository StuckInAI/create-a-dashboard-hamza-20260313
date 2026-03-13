'use client';

import { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import StatsCard from '@/components/StatsCard';
import RecentActivity from '@/components/RecentActivity';
import UsersTable from '@/components/UsersTable';
import Chart from '@/components/Chart';

type Stats = {
  totalUsers: number;
  activeUsers: number;
  totalActivities: number;
  growth: number;
};

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  createdAt: string;
};

type Activity = {
  id: number;
  description: string;
  type: string;
  userId: number | null;
  createdAt: string;
};

export default function Home() {
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState<Stats | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [statsRes, usersRes, activitiesRes] = await Promise.all([
          fetch('/api/stats'),
          fetch('/api/users'),
          fetch('/api/activities'),
        ]);
        const statsData = await statsRes.json();
        const usersData = await usersRes.json();
        const activitiesData = await activitiesRes.json();
        setStats(statsData);
        setUsers(usersData);
        setActivities(activitiesData);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex h-screen bg-slate-900 overflow-hidden">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
            </div>
          ) : (
            <>
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                    <StatsCard
                      title="Total Users"
                      value={stats?.totalUsers ?? 0}
                      icon="👥"
                      color="indigo"
                      change="+12%"
                    />
                    <StatsCard
                      title="Active Users"
                      value={stats?.activeUsers ?? 0}
                      icon="✅"
                      color="green"
                      change="+5%"
                    />
                    <StatsCard
                      title="Total Activities"
                      value={stats?.totalActivities ?? 0}
                      icon="📊"
                      color="blue"
                      change="+18%"
                    />
                    <StatsCard
                      title="Growth"
                      value={`${stats?.growth ?? 0}%`}
                      icon="📈"
                      color="purple"
                      change="+3%"
                    />
                  </div>
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    <Chart />
                    <RecentActivity activities={activities} />
                  </div>
                </div>
              )}
              {activeTab === 'users' && (
                <UsersTable users={users} />
              )}
              {activeTab === 'activity' && (
                <RecentActivity activities={activities} full />
              )}
              {activeTab === 'settings' && (
                <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                  <h2 className="text-xl font-semibold text-slate-100 mb-4">Settings</h2>
                  <p className="text-slate-400">Application settings will appear here.</p>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}
