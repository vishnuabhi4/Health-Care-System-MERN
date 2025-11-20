import React from "react";
import { Activity, Users, UserPlus, Calendar, Bell, Settings, LogOut } from "lucide-react";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/features/authSlice";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axios";


const Sidebar = ({ isOpen, setIsOpen, currentView, setCurrentView }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await axiosInstance.post('/auth/logout');
      dispatch(logout());

      localStorage.removeItem('token');
      localStorage.removeItem('user');

      navigate("/login");
    } catch (error) {
      alert("Something went wrong while logging out!");
    }
  }
  const menuItems = [
    { icon: <Activity size={20} />, label: "Dashboard", view: "dashboard" },
    { icon: <Users size={20} />, label: "Doctors List", view: "doctors" },
    { icon: <UserPlus size={20} />, label: "Add Doctor", view: "addDoctor" },
    { icon: <Calendar size={20} />, label: "Appointments", view: "appointments" },
    { icon: <Users size={20} />, label: "UserList", view: "UserList" },
    { icon: <Bell size={20} />, label: "Notifications", view: "notifications", badge: 8 },
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
        className={` fixed lg:static w-64 bg-slate-900 text-white flex flex-col h-screen z-50 
        transform transition-transform duration-300 overflow-y-auto 
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
            <span className="text-2xl">⚕️</span>
          </div>
          <span className="text-xl font-bold">Admin Panel</span>
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
                ${currentView === item.view ? "bg-purple-500" : "text-gray-400 hover:bg-slate-800"}`}
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
              onClick={handleLogout}  >
            <LogOut size={20} />
            <span className="font-medium text-sm">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
