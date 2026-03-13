'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
} from 'recharts';

const weeklyData = [
  { day: 'Mon', logins: 24, activities: 40 },
  { day: 'Tue', logins: 18, activities: 35 },
  { day: 'Wed', logins: 32, activities: 55 },
  { day: 'Thu', logins: 27, activities: 48 },
  { day: 'Fri', logins: 41, activities: 62 },
  { day: 'Sat', logins: 15, activities: 22 },
  { day: 'Sun', logins: 11, activities: 18 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-800 border border-slate-600 rounded-lg p-3 shadow-xl">
        <p className="text-slate-300 text-sm font-medium mb-1">{label}</p>
        {payload.map((entry: any) => (
          <p key={entry.name} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: <span className="font-semibold">{entry.value}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function Chart() {
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-5">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-base font-semibold text-slate-100">Weekly Activity</h2>
        <span className="text-xs text-slate-400 bg-slate-700 px-2 py-1 rounded-full">Last 7 days</span>
      </div>
      <div className="mb-6">
        <p className="text-xs text-slate-400 mb-3 uppercase tracking-wider font-medium">Logins & Activities</p>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={weeklyData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="day" tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="logins" fill="#6366f1" radius={[4, 4, 0, 0]} name="Logins" />
            <Bar dataKey="activities" fill="#22d3ee" radius={[4, 4, 0, 0]} name="Activities" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div>
        <p className="text-xs text-slate-400 mb-3 uppercase tracking-wider font-medium">Trend</p>
        <ResponsiveContainer width="100%" height={120}>
          <LineChart data={weeklyData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="day" tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: '12px', color: '#94a3b8' }} />
            <Line type="monotone" dataKey="logins" stroke="#6366f1" strokeWidth={2} dot={{ fill: '#6366f1', r: 3 }} name="Logins" />
            <Line type="monotone" dataKey="activities" stroke="#22d3ee" strokeWidth={2} dot={{ fill: '#22d3ee', r: 3 }} name="Activities" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
