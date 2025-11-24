import React, { useState } from "react";
import { Phone, Menu, X } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LogoutButton from "./Buttons/LoggoutButton";
import ButtonDashboard from "./Buttons/ButtonDashboard";

const HeaderNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  return (
    <header className="bg-white shadow-sm border-slate-950 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <div className="flex items-center">
            <div
              onClick={() => navigate("/")}
              className="bg-blue-600 text-white px-3 py-1 rounded-lg font-bold text-xl cursor-pointer"
            >
              HealthCare+
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <button
              className="text-gray-900 hover:text-blue-600 transition-colors"
              onClick={() => navigate("/")}
            >
              Home
            </button>
            <button
              className="text-gray-700 hover:text-blue-600 transition-colors"
              onClick={() => navigate("/find-doctor")}
            >
              Find Doctor
            </button>
            <button
              className="text-gray-700 hover:text-blue-600 transition-colors"
              onClick={() => navigate("/hospitals")}
            >
              Hospitals
            </button>
            <button
              className="text-gray-700 hover:text-blue-600 transition-colors"
              onClick={() => navigate("/lab")}
            >
              Lab
            </button>

            <button
              className="text-gray-700 hover:text-blue-600 transition-colors"
              onClick={() => navigate("/contact")}
            >
              Contact
            </button>
          </nav>

          {/* Desktop Right Section */}
          <div className="hidden md:flex items-center space-x-4">
            <Phone className="h-5 w-5 text-gray-600" />
            <span className="text-sm text-gray-600">Emergency</span>

            {!user ? (
              <>
                <button
                  onClick={() => navigate("/login")}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate("/register")}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Register
                </button>
              </>
            ) : (
              <>
                <LogoutButton />
                <ButtonDashboard />
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white border-t shadow-sm">
          <nav className="flex flex-col space-y-4 p-4">

            {/* Pages */}
            <button onClick={() => navigate("/")} className="text-left text-gray-900 hover:text-blue-600">Home</button>
            <button onClick={() => navigate("/find-doctor")} className="text-left text-gray-700 hover:text-blue-600">Find Doctor</button>
            <button onClick={() => navigate("/hospitals")} className="text-left text-gray-700 hover:text-blue-600">Hospitals</button>
            <button onClick={() => navigate("/lab")} className="text-left text-gray-700 hover:text-blue-600">Lab</button>
            <button onClick={() => navigate("/contact")} className="text-left text-gray-700 hover:text-blue-600">Contact</button>

            {/* Emergency */}
            <div className="flex items-center space-x-2 pt-2">
              <Phone className="h-5 w-5 text-gray-600" />
              <span className="text-sm text-gray-600">Emergency</span>
            </div>

            {/* Auth Buttons */}
            {!user ? (
              <>
                <button
                  onClick={() => navigate("/login")}
                  className="bg-blue-600 text-white w-full py-2 rounded-lg hover:bg-blue-700"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate("/register")}
                  className="bg-blue-600 text-white w-full py-2 rounded-lg hover:bg-blue-700"
                >
                  Register
                </button>
              </>
            ) : (
              <>
                <LogoutButton />
                <ButtonDashboard />
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default HeaderNav;
