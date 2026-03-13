type StatsCardProps = {
  title: string;
  value: number | string;
  icon: string;
  color: 'indigo' | 'green' | 'blue' | 'purple';
  change: string;
};

const colorMap = {
  indigo: 'bg-indigo-500/20 text-indigo-400',
  green: 'bg-green-500/20 text-green-400',
  blue: 'bg-blue-500/20 text-blue-400',
  purple: 'bg-purple-500/20 text-purple-400',
};

export default function StatsCard({ title, value, icon, color, change }: StatsCardProps) {
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 hover:border-slate-600 transition-colors">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-400">{title}</p>
          <p className="text-2xl font-bold text-slate-100 mt-1">{value}</p>
        </div>
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl ${colorMap[color]}`}>
          {icon}
        </div>
      </div>
      <div className="mt-4 flex items-center gap-1">
        <span className="text-xs font-semibold text-green-400">{change}</span>
        <span className="text-xs text-slate-500">vs last month</span>
      </div>
    </div>
  );
}
