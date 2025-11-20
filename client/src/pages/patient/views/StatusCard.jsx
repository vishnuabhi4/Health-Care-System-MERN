import React from "react";

const StatsCard = ({ icon, value, label, change, iconBg }) => {
  return (
    <div className="bg-white rounded-xl p-5 border border-gray-200 flex items-center gap-4 shadow-sm">
      <div className={`w-12 h-12 flex items-center justify-center rounded-lg ${iconBg}`}>
        {icon}
      </div>
      <div>
        <h3 className="text-xl font-bold text-gray-800">{value}</h3>
        <p className="text-sm text-gray-500">{label}</p>
        {change !== undefined && (
          <p className="text-xs text-green-600 mt-1">+{change}% from last week</p>
        )}
      </div>
    </div>
  );
};

export default StatsCard;
