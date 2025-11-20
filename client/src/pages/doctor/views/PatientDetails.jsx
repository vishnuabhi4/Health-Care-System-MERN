const PatientDetails = () => {
  return (
    <div className="bg-white rounded-xl p-6">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Patient Details</h3>
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-2xl">
            👨
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-gray-800">MJ Kumar</h4>
            <p className="text-sm text-gray-500">Heavy Cold</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Sex: M</p>
            <p className="text-sm text-gray-500">Age: 32</p>
          </div>
        </div>
        <div className="flex gap-2">
          <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs">Running Nose</span>
          <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs">Cough</span>
        </div>
        <div className="pt-2">
          <p className="font-semibold text-gray-700 mb-1">Last Prescription</p>
          <a href="#" className="text-teal-500 text-sm">See more</a>
        </div>
      </div>
    </div>
  );
};
export default PatientDetails