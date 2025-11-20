import React, { useState } from "react";
import PatientSidebar from "./PatientSidebar";
import PatientHeader from "./PatienHeader";
import DashboardView from "./views/PatientDashboardView";
import ProfileView from "./views/ProfileView";
import AppointmentBooking from "../../components/BookingSection";
import MyAppointments from "../../components/MyAppointments";
import MedicalReportView from "./views/MedicalReportView";
import Notifications from "./views/Notifications";

const PatientDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentView, setCurrentView] = useState("dashboard");

  let mainView;
  if (currentView === "dashboard") mainView = <DashboardView />;
  else if (currentView === "profile") mainView = <ProfileView />;
  else if (currentView === "notifications") mainView = <Notifications />;
  else if(currentView === "BookAppointment") mainView = <AppointmentBooking/>
   else if(currentView === "MyAppointments") mainView = <MyAppointments/>
else if(currentView === "MedicalHistory") mainView = <MedicalReportView/>


   
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar (Fixed) */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-slate-900 text-white z-50 
        transform transition-transform duration-300 
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        <PatientSidebar
          isOpen={isSidebarOpen}
          setIsOpen={setIsSidebarOpen}
          currentView={currentView}
          setCurrentView={setCurrentView}
        />
      </div>

      {/* Main Area */}
      <div className="flex flex-col flex-1 lg:pl-64">
        {/* Fixed Header */}
        <div className="fixed top-0 left-0 lg:left-64 right-0 z-40 bg-white border-b border-gray-200">
          <PatientHeader
            toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
            currentView={currentView}
          />
        </div>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto bg-gray-100 p-6 mt-16">
          {mainView}
        </main>
      </div>
    </div>
  );
};

export default PatientDashboard;
