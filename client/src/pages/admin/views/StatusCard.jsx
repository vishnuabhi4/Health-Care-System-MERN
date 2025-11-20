import React from "react";
import { TrendingUp } from "lucide-react";

const StatsCard = ({ icon, value, label, change, iconBg }) => {
  return (
    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4 hover:shadow-md transition">
      {/* Left icon box */}
      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${iconBg}`}>
        {icon}
      </div>

      {/* Text section */}
      <div className="flex-1">
        <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
        <p className="text-sm text-gray-500">{label}</p>
      </div>

      {/* Growth / Change section */}
      <div className="flex items-center text-green-600 text-sm font-medium">
        <TrendingUp size={16} className="mr-1" />
        +{change}%
      </div>
    </div>
  );
};

export default StatsCard;
