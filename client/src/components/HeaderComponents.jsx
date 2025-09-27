import React, { useState } from "react";
import { Phone, Menu, X } from "lucide-react";

const HeaderNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="bg-blue-600 text-white px-3 py-1 rounded-lg font-bold text-xl">
              HealthCare+
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-gray-900 hover:text-blue-600 transition-colors">Home</a>
            <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Find Doctor</a>
            <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Hospitals</a>
            <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Lab</a>
            <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Medicines</a>
            <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Contact</a>
          </nav>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            <Phone className="h-5 w-5 text-gray-600" />
            <span className="text-sm text-gray-600 hidden sm:inline">Emergency</span>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Login/Register
            </button>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white border-t shadow-sm">
          <nav className="flex flex-col space-y-2 p-4">
            <a href="#" className="text-gray-900 hover:text-blue-600 transition-colors">Home</a>
            <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Find Doctor</a>
            <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Hospitals</a>
            <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Lab</a>
            <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Medicines</a>
            <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Contact</a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default HeaderNav;
