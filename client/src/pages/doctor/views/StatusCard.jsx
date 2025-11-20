const StatsCard = ({ icon, value, label, bgColor, iconBg }) => {
  return (
    <div className={`${bgColor} rounded-xl p-4 lg:p-6 flex items-center gap-3 lg:gap-4`}>
      <div className={`${iconBg} w-12 h-12 lg:w-14 lg:h-14 rounded-full flex items-center justify-center flex-shrink-0`}>
        {icon}
      </div>
      <div>
        <h3 className="text-2xl lg:text-3xl font-bold text-white">{value}</h3>
        <p className="text-sm lg:text-base text-white text-opacity-90">{label}</p>
      </div>
    </div>
  );
};

export default StatsCard