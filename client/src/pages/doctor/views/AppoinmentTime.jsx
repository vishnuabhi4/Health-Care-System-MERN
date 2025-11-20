

const AppointmentTimeline = () => {
  const timeline = [
    { time: '11:30AM', type: 'Clinic Consulting', avatar: '👨‍⚕️' },
    { time: '02:30PM', type: 'Online Consulting', avatar: '👩' },
    { time: '05:30PM', type: 'Meeting - Dr.Sam', avatar: '👨‍💼' },
  ];

  return (
    <div className="bg-white rounded-xl p-6">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Appointment Timeline</h3>
      <div className="space-y-4">
        {timeline.map((item, index) => (
          <div key={index} className="flex items-center gap-4">
            <div className="w-4 h-4 border-4 border-teal-500 rounded-full bg-white"></div>
            <div className="flex-1 flex items-center justify-between">
              <div>
                <p className="font-semibold text-gray-800">{item.time}</p>
                <p className="text-sm text-gray-500">{item.type}</p>
              </div>
              <div className="text-2xl">{item.avatar}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppointmentTimeline