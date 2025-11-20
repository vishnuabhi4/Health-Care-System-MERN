import { LucideUser } from "lucide-react";
import axiosInstance from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { selectUserRole } from "../../redux/features/authSlice";
import { useSelector } from "react-redux";

const ButtonDashboard = () => {
  const userRole = useSelector(selectUserRole);
  const navigate = useNavigate();
  const handleNavigation = () => {
   const dashboardRoutes = {
    admin: "/admin/dashboard",
    patient: "/patient/dashboard",
    doctor: "/doctor/dashboard",
  };
  const route = dashboardRoutes[userRole] || "/";
  navigate(route)
  };
  

  return (
    <>
      <button
        className="bg-red-500 text-white px-4 py-2 rounded flex"
        onClick={handleNavigation}
      >
        <LucideUser />
        <h3>Dashboard</h3>
      </button>
    </>
  );
};
export default ButtonDashboard;
