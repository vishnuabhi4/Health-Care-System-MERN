import { Calendar } from "lucide-react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../redux/features/authSlice"

const WelcomeBanner = () => {
  const user = useSelector(selectCurrentUser);


  return (
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 lg:p-6 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h2 className="text-lg lg:text-xl font-bold text-gray-800">
          Welcome {user?.username || "Doctor"}
        </h2>
        <p className="text-sm lg:text-base text-gray-600">
          Have a nice day at great work
        </p>
      </div>

      <div className="flex items-center gap-2 bg-white px-3 lg:px-4 py-2 rounded-lg">
        <Calendar size={20} className="text-teal-500" />
        <span className="text-sm lg:text-base font-semibold">
          {new Date().toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </span>
      </div>
    </div>
  );
};

export default WelcomeBanner;
