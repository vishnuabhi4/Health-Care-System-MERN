import React, { useState } from "react";
import Sidebar from "./DoctorSidebar";
import Header from "./DoctorHeader";

import WelcomeBanner from "./views/WelcomeBanner";
import TodaysAppointment from "./views/Appoinment";
import StatsGrid from "./views/StatusGrid";
import PatientDetails from "./views/PatientDetails";
import DoctorAppointmentsPage from "./views/AppointmentPage";
import AppointmentRequest from "./views/AppoinmentRequest";
import CreateReportList from "./views/CreateReportList";
import CreateReport from "./views/CreateReport";
import ViewReport from "./views/ViewReport";


const Dashboard = () => {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentView, setCurrentView] = useState("overview");

  //  View Logic
  let mainView; //functional continuity inside the same dashboard view, not a route change.

  if (currentView === "overview") {
    mainView = (
      <>
        <WelcomeBanner />
        <StatsGrid />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <AppointmentRequest />
           <TodaysAppointment />
        </div>
      </>
    );
  }

  if (currentView === "appointments") {
    mainView = (
      <>
        <h2 className="text-2xl font-bold mb-4">Appointments</h2>
        <DoctorAppointmentsPage/>
      </>
    );
  }
  if(currentView === "Report") {
  mainView =( <CreateReportList 
   setSelectedPatient={setSelectedPatient}
      setCurrentView={setCurrentView}/>
  )
}
if (currentView === "CreateReport") {
  mainView = (
    <CreateReport
        selectedPatient={selectedPatient} 
      setCurrentView={setCurrentView}
    />
  );
}

if (currentView === "ViewReport") {
  mainView = (
    <ViewReport
      selectedPatient={selectedPatient} // pass as selectedPatient
      setCurrentView={setCurrentView}
    />
  );
}
  if (currentView === "patients") {
    mainView = (
      <>
        <h2 className="text-2xl font-bold mb-4">Patients</h2>
        <PatientDetails />
        <PatientAnalysis />
      </>
    );
  }



  if (currentView === "messages") {
    mainView = (
      <>
        <h2 className="text-2xl font-bold mb-4">Messages</h2>
        <p className="text-gray-600">Messages page content coming soon…</p>
      </>
    );
  }

  if (currentView === "settings") {
    mainView = (
      <>
        <h2 className="text-2xl font-bold mb-4">Settings</h2>
        <p className="text-gray-600">Settings page content coming soon…</p>
      </>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
        currentView={currentView}
        setCurrentView={setCurrentView}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          {mainView}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
