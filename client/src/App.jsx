import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Home from "./pages/Home";
import RegisterPage from "./pages/PatientRegisterPage";
import LoginPage from "./pages/LoginPage";
import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";
import PatientDashboard from "./pages/patient/PatientDashboard";
import GuestRoute from "./components/ProtectedRoute/GuestRoute";
import FindDoctor from "./components/FindDoctor";
import Hospitals from "./components/Hospitals";
import Contact from "./components/Contact";
import Lab from "./components/Lab";
import UsersList from "./pages/admin/views/UserListPage";
import UserDetails from "./pages/admin/views/UserDetailsPage";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/find-doctor" element={<FindDoctor />} />
          <Route path="/hospitals" element={<Hospitals />} />
          <Route path="/lab" element={<Lab />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/register"
            element={
              <GuestRoute>
                <RegisterPage />
              </GuestRoute>
            }
          />

   

          <Route
            path="/login"
            element={
              <GuestRoute>
                <LoginPage />
              </GuestRoute>
            }
          />
          <Route path="/dash" element={<LoginPage />} />
        </Route>

        <Route
          path="/doctor/dashboard"
          element={
            <ProtectedRoute allowedRoles={["doctor"]}>
              <DoctorDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/patient/dashboard"
          element={
            <ProtectedRoute allowedRoles={["patient"]}>
              <PatientDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
