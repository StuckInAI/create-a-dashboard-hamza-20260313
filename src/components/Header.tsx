'use client';

import { useState, useEffect } from 'react';

export default function Header() {
  const [dateTime, setDateTime] = useState('');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setDateTime(
        now.toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }) +
          ' — ' +
          now.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          })
      );
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="bg-slate-800 border-b border-slate-700 px-6 py-4 flex items-center justify-between shrink-0">
      <div>
        <h1 className="text-xl font-bold text-slate-100">Analytics Dashboard</h1>
        <p className="text-sm text-slate-400 mt-0.5">Monitor your application metrics</p>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-slate-400">{dateTime}</span>
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        <span className="text-xs text-green-400 font-medium">Live</span>
      </div>
    </header>
  );
}
