import StatsCard from "./StatusCard";
import { Calendar, Video,Users, MessageSquare  } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDoctorAppointments } from "../../../redux/features/doctorAppointmentSlice";
import { useEffect } from "react";

const StatsGrid = () => {

    const dispatch = useDispatch();
  const { appointments, loading, error } = useSelector(
    (state) => state.doctorAppointments
  );


  useEffect(() => {
    dispatch(fetchDoctorAppointments()); // no args needed now
  }, [dispatch]);

 
  

  const stats = [
    { icon: <Calendar size={24} className="text-blue-600" />, value: appointments.length, label: 'Appointments', bgColor: 'bg-blue-500', iconBg: 'bg-white' },
    { icon: <Video size={24} className="text-green-600" />, value: '18', label: 'Online Consultancy', bgColor: 'bg-green-500', iconBg: 'bg-white' },
    { icon: <Users size={24} className="text-purple-600" />, value: '20', label: 'Pendings', bgColor: 'bg-purple-500', iconBg: 'bg-white' },
    { icon: <MessageSquare size={24} className="text-cyan-600" />, value: '12', label: 'Request', bgColor: 'bg-cyan-500', iconBg: 'bg-white' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => (
        <StatsCard key={index} {...stat} />
      ))}
    </div>
  );
};

export default StatsGrid