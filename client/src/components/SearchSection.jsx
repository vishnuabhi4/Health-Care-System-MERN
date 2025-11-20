import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { healthcareData } from "../data/healthcareData.js";

const SearchSection = () => {
  const [searchData, setSearchData] = useState({
    service: "",
    location: "",
    date: "",
  });

  const [results, setResults] = useState([]);
  const [serviceOptions, setServiceOptions] = useState([]);
  const [locationOptions, setLocationOptions] = useState([]);
  const [dateOptions, setDateOptions] = useState([]);

  // Initialize dropdown options
  useEffect(() => {
    setServiceOptions([...new Set(healthcareData.map((d) => d.serviceType))]);
    setLocationOptions([...new Set(healthcareData.map((d) => d.location))]);
    setDateOptions([
      ...new Set(healthcareData.flatMap((d) => d.availableDates)),
    ]);
  }, []);

  // Update dependent dropdowns when a value is selected
  useEffect(() => {
    let filtered = healthcareData;

    if (searchData.service) {
      filtered = filtered.filter((d) => d.serviceType === searchData.service);
      setLocationOptions([...new Set(filtered.map((d) => d.location))]);
      setDateOptions([...new Set(filtered.flatMap((d) => d.availableDates))]);
    } else if (searchData.location) {
      filtered = filtered.filter((d) => d.location === searchData.location);
      setServiceOptions([...new Set(filtered.map((d) => d.serviceType))]);
      setDateOptions([...new Set(filtered.flatMap((d) => d.availableDates))]);
    } else if (searchData.date) {
      filtered = filtered.filter((d) => d.availableDates.includes(searchData.date));
      setServiceOptions([...new Set(filtered.map((d) => d.serviceType))]);
      setLocationOptions([...new Set(filtered.map((d) => d.location))]);
    } else {
      // Reset options if no selection
      setServiceOptions([...new Set(healthcareData.map((d) => d.serviceType))]);
      setLocationOptions([...new Set(healthcareData.map((d) => d.location))]);
      setDateOptions([
        ...new Set(healthcareData.flatMap((d) => d.availableDates)),
      ]);
    }
  }, [searchData.service, searchData.location, searchData.date]);

  const handleSearch = () => {
    const filtered = healthcareData.filter((item) => {
      const matchService = searchData.service
        ? item.serviceType === searchData.service
        : true;
      const matchLocation = searchData.location
        ? item.location === searchData.location
        : true;
      const matchDate = searchData.date
        ? item.availableDates.includes(searchData.date)
        : true;
      return matchService && matchLocation && matchDate;
    });
    setResults(filtered);
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
            {/* Service */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Service
              </label>
              <select
                className="w-full p-3 border rounded-lg"
                value={searchData.service}
                onChange={(e) =>
                  setSearchData({ ...searchData, service: e.target.value })
                }
              >
                <option value="">Select Service</option>
                {serviceOptions.map((service, idx) => (
                  <option key={idx} value={service}>
                    {service.charAt(0).toUpperCase() + service.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <select
                className="w-full p-3 border rounded-lg"
                value={searchData.location}
                onChange={(e) =>
                  setSearchData({ ...searchData, location: e.target.value })
                }
              >
                <option value="">Select Location</option>
                {locationOptions.map((loc, idx) => (
                  <option key={idx} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Available Date
              </label>
              <select
                className="w-full p-3 border rounded-lg"
                value={searchData.date}
                onChange={(e) =>
                  setSearchData({ ...searchData, date: e.target.value })
                }
              >
                <option value="">Select Date</option>
                {dateOptions.map((date, idx) => (
                  <option key={idx} value={date}>
                    {date}
                  </option>
                ))}
              </select>
            </div>

            {/* Search Button */}
            <div className="flex items-end">
              <button
                onClick={handleSearch}
                className="w-full bg-blue-600 text-white py-3 rounded-lg flex items-center justify-center font-semibold shadow hover:bg-blue-700"
              >
                <Search className="h-4 w-4 mr-2" />
                Search
              </button>
            </div>
          </div>
        </div>

        {/* Results */}
        {results.length > 0 && (
          <div className="mt-10">
            <h3 className="text-xl font-semibold mb-4">Search Results</h3>
            <div className="grid gap-4">
              {results.map((item) => (
                <div
                  key={item.id}
                  className="p-5 border rounded-xl shadow bg-white"
                >
                  <h4 className="text-lg font-bold">{item.name}</h4>
                  <p className="text-gray-600 capitalize">{item.specialty}</p>
                  <p>📍 {item.location}</p>
                  <p className="text-gray-500 text-sm mt-2">
                    Available: {item.availableDates.join(", ")}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {results.length === 0 && (
          <p className="text-gray-500 text-center mt-6">
            No results yet. Please select search filters.
          </p>
        )}
      </div>
    </section>
  );
};

export default SearchSection;
