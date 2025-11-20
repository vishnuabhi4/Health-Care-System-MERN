import React, { useState } from "react";
import Sidebar from "./AdminSidebar";
import Header from "./AdminHeader";
import DashboardView from "./views/DashboardView";
import DoctorsListView from "./views/DoctorsListView";
import AddDoctorView from "./views/AddDoctorView";
import DoctorDetailsView from "./views/DoctorDetailsView";
import AppointmentsView from "./views/AppointmentsView";
import NotificationsView from "./views/NotificationsView";
import AddDoctorInfoForm from "./views/AddDoctorInfoForm";
import DoctorProfileView from "./views/DoctorProfileView";
import UsersList from "./views/UserListPage";
import UserDetails from "./views/UserDetailsPage";
import CreatePatientDetails from "./views/CreatePatientDetails";


const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentView, setCurrentView] = useState("dashboard");
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

let mainView;
if (currentView === "dashboard") mainView = <DashboardView />;
else if (currentView === "doctors")
  mainView = (
    <DoctorsListView
      setCurrentView={setCurrentView}
      setSelectedDoctor={setSelectedDoctor}
    />
  );
else if (currentView === "addDoctor") mainView = <AddDoctorView />;
else if (currentView === "editDoctor" && selectedDoctor)
  

  
  mainView = (
    <AddDoctorInfoForm
      userId={selectedDoctor._id} // or selectedDoctor._id if your backend uses doctor id
      initialData={selectedDoctor} // pre-fill form
      setCurrentView={setCurrentView} // go back to list after submit
    />
  );
  
else if (currentView === "doctorDetails" && selectedDoctor)
  mainView = (
    <DoctorDetailsView
      doctor={selectedDoctor}
      setCurrentView={setCurrentView}
    />
  );

else if (currentView === "UserList") {
  mainView = (
    <UsersList
      setSelectedUser={setSelectedUser}
      setCurrentView={setCurrentView}
    />
  );
} else if (currentView === "UserDetails" && selectedUser) {
  mainView = (
    <UserDetails
      user={selectedUser}
      setCurrentView={setCurrentView}
    />
  );
} 

else if (currentView === "CreatePatientDetails" && selectedUser) {
  mainView = (
    <CreatePatientDetails
      user={selectedUser}
      setCurrentView={setCurrentView}
      setSelectedUser={setSelectedUser}
    />
  );
}

else if (currentView === "doctorProfile" && selectedDoctor)
  mainView = (
    <DoctorProfileView
      selectedDoctor={selectedDoctor}
      setCurrentView={setCurrentView}
    />
  );

else if (currentView === "appointments") mainView = <AppointmentsView />;
else if (currentView === "UserList") mainView = <UsersList />;
else if (currentView === "notifications") mainView = <NotificationsView />;


  return (
     <div className="flex h-screen overflow-hidden">
      {/* Sidebar - fixed height, never scrolls */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-slate-900 text-white z-50 
        transform transition-transform duration-300 
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        <Sidebar
          isOpen={isSidebarOpen}
          setIsOpen={setIsSidebarOpen}
          currentView={currentView}
          setCurrentView={setCurrentView}
        />
      </div>

      {/* Right Section */}
      <div className="flex flex-col flex-1 lg:pl-64">
        {/* Header - fixed top */}
        <div className="fixed top-0 left-0 lg:left-64 right-0 z-40 bg-white border-b border-gray-200">
          <Header
            toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
            currentView={currentView}
          />
        </div>

        {/* Scrollable content area */}
        <main className="flex-1 overflow-y-auto bg-gray-100 p-6 mt-16">
          {mainView}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
