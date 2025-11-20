import { Calendar, Users, CreditCard, Mail, Settings, LogOut } from "lucide-react";
import { useDispatch,useSelector } from "react-redux";
import { logout,selectCurrentUser } from "../../redux/features/authSlice";
import { useNavigate } from "react-router-dom";

const DoctorSidebar = ({ isOpen, setIsOpen, currentView, setCurrentView }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
   const user = useSelector(selectCurrentUser);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const menuItems = [
    { key: "overview", icon: <Calendar size={20} />, label: "Overview" },
    { key: "appointments", icon: <Calendar size={20} />, label: "Appointments" },
    { key: "Report", icon: <Mail size={20} />, label: "Report",  },
    { key: "Upcoming Features", icon: <Settings size={20} />, label: "Upcoming Features" },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed lg:static w-64 bg-slate-900 text-white flex flex-col h-screen z-50
        transform transition-transform duration-300 overflow-y-auto 
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        {/* Branding */}
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 bg-teal-500 rounded-lg flex items-center justify-center text-2xl">
            🏥
          </div>
          <span className="text-xl font-bold">MedicDr</span>
        </div>

        {/* Doctor Info */}
        <div className="px-6 py-6 flex flex-col items-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-3xl mb-3">
            👨‍⚕️
          </div>
          <h3 className="font-semibold text-base"> {user?.username || "Doctor"}</h3>
        </div>

        {/* Menu */}
        <nav className="px-4 py-4 flex-1 overflow-y-auto">
          {menuItems.map((item) => (
            <button
              key={item.key}
              onClick={() => {
                setCurrentView(item.key);
                setIsOpen(false); // auto close on mobile
              }}
              className={`flex items-center gap-3 px-4 py-2.5 mb-2 rounded-lg w-full text-left transition
                ${
                  currentView === item.key
                    ? "bg-teal-500 text-white"
                    : "text-gray-400 hover:bg-slate-800"
                }`}
            >
              {item.icon}
              <span className="font-medium text-sm">{item.label}</span>

              {item.badge && (
                <span className="ml-auto bg-teal-500 text-white text-xs px-2 py-1 rounded-full">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-slate-800 mt-auto">
          <button
            className="flex items-center gap-3 px-4 py-2.5 w-full text-gray-400 hover:bg-slate-800 rounded-lg transition"
            onClick={handleLogout}
          >
            <LogOut size={20} />
            <span className="font-medium text-sm">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default DoctorSidebar;
