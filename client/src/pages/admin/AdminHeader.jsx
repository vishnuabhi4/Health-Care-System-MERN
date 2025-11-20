import React from "react";
import { Bell, Mail, Search } from "lucide-react";

const Header = ({ toggleSidebar, currentView }) => {
  const viewTitles = {
    dashboard: "Dashboard Overview",
    doctors: "Doctors Management",
    addDoctor: "Register New Doctor",
    appointments: "Appointments",
    notifications: "Notifications",
    settings: "Settings",
  };

  return (
    <div className="bg-white border-b border-gray-200 px-4 lg:px-8 py-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <h1 className="text-xl lg:text-2xl font-bold text-gray-800">
          {viewTitles[currentView]}
        </h1>
      </div>

      <div className="flex items-center gap-2 lg:gap-4">
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search doctors, appointments..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-60 lg:w-80 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <button className="p-2 hover:bg-gray-100 rounded-lg relative">
          <Bell size={20} className="text-gray-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-lg">
          <Mail size={20} className="text-gray-600" />
        </button>
      </div>
    </div>
  );
};

export default Header;
