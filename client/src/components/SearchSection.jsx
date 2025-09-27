import React, { useState } from 'react';
import { Search, MapPin } from 'lucide-react';

const SearchSection = () => {
  const [searchData, setSearchData] = useState({
    service: '',
    location: '',
    date: ''
  });

  const handleSearch = () => {
    console.log('Searching with:', searchData);
    // Add search logic here
  };

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Find Healthcare Services Near You
          </h2>
          <p className="text-gray-600">
            Search for doctors, hospitals, and healthcare services in your area
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-8 border">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Service</label>
              <select 
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                value={searchData.service}
                onChange={(e) => setSearchData({...searchData, service: e.target.value})}
              >
                <option value="">Select Service</option>
                <option value="consultation">Online Consultation</option>
                <option value="hospital">Hospital Visit</option>
                <option value="lab">Lab Tests</option>
                <option value="medicine">Medicine</option>
                <option value="emergency">Emergency Care</option>
                <option value="specialist">Specialist Visit</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Enter your location"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  value={searchData.location}
                  onChange={(e) => setSearchData({...searchData, location: e.target.value})}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
              <input
                type="date"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                value={searchData.date}
                onChange={(e) => setSearchData({...searchData, date: e.target.value})}
              />
            </div>
            <div className="flex items-end">
              <button 
                onClick={handleSearch}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-semibold flex items-center justify-center transition-colors shadow-lg hover:shadow-xl"
              >
                <Search className="h-4 w-4 mr-2" />
                Search
              </button>
            </div>
          </div>
          
          {/* Quick Search Options */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600 mb-3">Popular searches:</p>
            <div className="flex flex-wrap gap-2">
              {['General Physician', 'Dentist', 'Cardiologist', 'Dermatologist', 'Pediatrician'].map((specialty, index) => (
                <button 
                  key={index}
                  onClick={() => setSearchData({...searchData, service: specialty.toLowerCase()})}
                  className="px-3 py-1 text-sm border border-gray-300 rounded-full hover:border-blue-500 hover:text-blue-600 transition-colors"
                >
                  {specialty}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchSection;