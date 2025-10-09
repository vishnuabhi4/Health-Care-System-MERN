import axiosInstance from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/features/authSlice";

const LogoutButton = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    // console.log(User, token);

    try {
      await axiosInstance.post("/auth/logout"); // calls your backend logout route

      dispatch(logout()); //Redux dispatch(logout()) → immediately updates the app’s global state so UI reacts instantly.

      localStorage.removeItem("token"); // localStorage → ensures user is logged out even after page refresh.
      localStorage.removeItem("user");

    //   navigate("/login"); // redirect to login
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Something went wrong while logging out!");
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 text-white px-4 py-2 rounded"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
