type Activity = {
  id: number;
  description: string;
  type: string;
  userId: number | null;
  createdAt: string;
};

type RecentActivityProps = {
  activities: Activity[];
  full?: boolean;
};

const typeColorMap: Record<string, string> = {
  login: 'bg-green-500/20 text-green-400',
  logout: 'bg-slate-500/20 text-slate-400',
  create: 'bg-blue-500/20 text-blue-400',
  update: 'bg-yellow-500/20 text-yellow-400',
  delete: 'bg-red-500/20 text-red-400',
  view: 'bg-indigo-500/20 text-indigo-400',
  export: 'bg-purple-500/20 text-purple-400',
};

export default function RecentActivity({ activities, full = false }: RecentActivityProps) {
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-5">
      <h2 className="text-base font-semibold text-slate-100 mb-4">Recent Activity</h2>
      <div className={`space-y-3 ${full ? '' : 'max-h-72 overflow-y-auto scrollbar-thin'}`}>
        {activities.length === 0 ? (
          <p className="text-slate-400 text-sm">No activities found.</p>
        ) : (
          activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start gap-3 p-3 bg-slate-900/50 rounded-lg border border-slate-700/50 hover:border-slate-600 transition-colors"
            >
              <span
                className={`text-xs font-medium px-2 py-0.5 rounded-full shrink-0 mt-0.5 ${
                  typeColorMap[activity.type] || 'bg-slate-500/20 text-slate-400'
                }`}
              >
                {activity.type}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-slate-300 truncate">{activity.description}</p>
                <p className="text-xs text-slate-500 mt-0.5">
                  {new Date(activity.createdAt).toLocaleString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
              {activity.userId && (
                <span className="text-xs text-slate-500 shrink-0">User #{activity.userId}</span>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
