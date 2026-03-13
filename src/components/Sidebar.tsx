'use client';

type SidebarProps = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

const navItems = [
  { id: 'overview', label: 'Overview', icon: '🏠' },
  { id: 'users', label: 'Users', icon: '👥' },
  { id: 'activity', label: 'Activity', icon: '📋' },
  { id: 'settings', label: 'Settings', icon: '⚙️' },
];

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  return (
    <aside className="w-64 bg-slate-800 border-r border-slate-700 flex flex-col shrink-0">
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
            D
          </div>
          <span className="text-lg font-bold text-slate-100">Dashboard</span>
        </div>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
              activeTab === item.id
                ? 'bg-indigo-600 text-white'
                : 'text-slate-400 hover:bg-slate-700 hover:text-slate-100'
            }`}
          >
            <span className="text-base">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>
      <div className="p-4 border-t border-slate-700">
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
            A
          </div>
          <div>
            <p className="text-sm font-medium text-slate-100">Admin User</p>
            <p className="text-xs text-slate-400">admin@example.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
