import React from 'react';

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-r from-blue-50 to-indigo-100 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Your Health, Our Priority
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Connect with qualified doctors. Book online consultations, find the best care, and manage your health journey efficiently.
            </p>
            <div className="flex space-x-4 mb-12">
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-semibold transition-colors shadow-lg hover:shadow-xl">
                Book Appointment
              </button>
              <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 font-semibold transition-colors">
                Find Doctors
              </button>
            </div>
            <div className="grid grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">500+</div>
                <div className="text-sm text-gray-600">Doctors</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">50+</div>
                <div className="text-sm text-gray-600">Hospitals</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">24/7</div>
                <div className="text-sm text-gray-600">Support</div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="bg-white rounded-2xl p-8 shadow-2xl">
              <div className="w-full h-64 bg-gradient-to-br from-blue-100 to-indigo-200 rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <div className="w-8 h-8 bg-white rounded-full"></div>
                  </div>
                  <p className="text-gray-700 font-medium">Professional Healthcare</p>
                </div>
              </div>
              <div className="absolute top-4 right-4 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold animate-pulse">
                Online Consultation Available
              </div>
              <div className="absolute bottom-5 bg-blue-500 text-white p-1 px-12 rounded-3xl shadow-lg animate-pulse">
                <div className="text-sm font-semibold">Sample data</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;