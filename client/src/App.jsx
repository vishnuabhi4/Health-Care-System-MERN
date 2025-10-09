import { useState} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Home from "./pages/Home";
import RegisterPage from "./pages/patient/PatientRegisterPage";
import LoginPage from "./pages/LoginPage";
import PatientDashboard from "./pages/patient/PatientDashboard";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import DashboardLayout from "./layout/DashboardLayout";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
        <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>

        <Route
          path="/patient/dashboard"
          element={
            <ProtectedRoute allowedRoles={["patient"]}>
             <DashboardLayout>
              <PatientDashboard />
              </DashboardLayout> 
            </ProtectedRoute>
          }
        />

        </Routes>
    </Router>
  );
}

export default App;
