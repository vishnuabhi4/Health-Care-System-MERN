import React from "react";
import {
  Activity,
  Calendar,
  HeartPulse,
  User,
  Bell,
  Settings,
  LogOut,
  BookAIcon
} from "lucide-react";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/features/authSlice";
import { useNavigate } from "react-router-dom";

const PatientSidebar = ({ isOpen, setIsOpen, currentView, setCurrentView }) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

const handleLogout = () => {
   dispatch(logout());
  navigate("/login"); 
};

  const menuItems = [
    { icon: <Activity size={20} />, label: "Dashboard", view: "dashboard" },
    { icon: <HeartPulse size={20} />, label: "My Appointments", view: "MyAppointments" },
    { icon: <BookAIcon size={20} />, label: "Book Appointments", view: "BookAppointment" },
    { icon: <Calendar size={20} />, label: "Medical History", view: "MedicalHistory" },
    { icon: <User size={20} />, label: "Profile", view: "profile" },
    { icon: <Bell size={20} />, label: "Notifications", view: "notifications", badge: 3 },
    
  ];

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      <div
        className={`fixed lg:static w-64 bg-slate-900 text-white flex flex-col h-screen z-50 
        transform transition-transform duration-300 overflow-y-auto 
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
            <span className="text-2xl">💊</span>
          </div>
          <span className="text-xl font-bold">Patient Panel</span>
        </div>

        <nav className="px-4 py-4 flex-1 overflow-y-auto">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentView(item.view);
                setIsOpen(false);
              }}
              className={`flex items-center gap-3 px-4 py-2.5 mb-2 rounded-lg transition w-full text-left 
                ${currentView === item.view ? "bg-green-500" : "text-gray-400 hover:bg-slate-800"}`}
            >
              {item.icon}
              <span className="font-medium text-sm">{item.label}</span>
              {item.badge && (
                <span className="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800 mt-auto">
          <button className="flex items-center gap-3 px-4 py-2.5 w-full text-gray-400 hover:bg-slate-800 rounded-lg transition"
          onClick={handleLogout}>
            <LogOut size={20} />
            <span className="font-medium text-sm">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default PatientSidebar;
