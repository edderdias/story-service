import React from 'react';

export const SkeletonProductCard: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm animate-pulse">
      <div className="w-full h-48 bg-slate-200" />
      <div className="p-4 space-y-3">
        <div className="flex justify-between items-center">
          <div className="w-16 h-4 bg-slate-200 rounded" />
          <div className="w-20 h-4 bg-slate-200 rounded-full" />
        </div>
        <div className="w-full h-5 bg-slate-200 rounded" />
        <div className="w-3/4 h-4 bg-slate-200 rounded" />
        <div className="pt-2 flex justify-between items-center">
          <div className="w-24 h-6 bg-slate-200 rounded" />
          <div className="w-28 h-9 bg-slate-200 rounded-xl" />
        </div>
      </div>
    </div>
  );
};

export const SkeletonTable: React.FC<{ rows?: number }> = ({ rows尽快 = 4 }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3 animate-pulse">
      <div className="w-1/3 h-6 bg-slate-200 rounded mb-4" />
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex gap-4 items-center py-2.5 border-b border-slate-100 last:border-none">
          <div className="w-20 h-4 bg-slate-200 rounded" />
          <div className="w-1/4 h-4 bg-slate-200 rounded" />
          <div className="w-1/4 h-4 bg-slate-200 rounded" />
          <div className="w-16 h-5 bg-slate-200 rounded-full" />
          <div className="w-16 h-4 bg-slate-200 rounded ml-auto" />
        </div>
      ))}
    </div>
  );
};
