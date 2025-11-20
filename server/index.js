import express from 'express';
import connectDB from './config/db.js';
import dotenv from "dotenv";
import cors from 'cors'
import { errorHandler } from './src/middlewares/errorHandler.js';
import cookieParser from "cookie-parser";
import authRoute from './src/routes/authRoute.js'
import userRoutes from "./src/routes/userRoutes.js"
import doctorRoutes from './src/routes/doctorRoutes.js'
import adminRoutes from './src/routes/adminRoutes.js'
import appoinmentsRoutes from './src/routes/appointmentRoutes.js'
import medicalReportRoutes from './src/routes/medicalReportRoute.js'
import patientRoutes from './src/routes/patientRoutes.js'
import paymentRoutes from "./src/routes/paymentRoutes.js"
import contactRoutes from "./src/routes/contactRoutes.js"

dotenv.config();

const app = express();
connectDB();




// Middlewares
app.use(express.json());
app.use(cookieParser()); // for refresh tokens in cookies
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://health-care-system-frontend.vercel.app"
    ],
    credentials: true,
  })
);

app.get("/health", (req, res) => {
  res.json({ status: "ok", message: "Backend is live!" });
});

app.use("/api/payment", paymentRoutes);
app.use("/api/auth",authRoute);//register/login user profile (user include patients,doctors and admins)
app.use('/api/users',userRoutes);//user CRUD...
app.use('/api/admin/users',adminRoutes); //creating doctor profiles(admin access only)
app.use("/api/admin/doctorinfo", doctorRoutes);//doctor profile info update and Appointment booking
app.use("/api/appointments", appoinmentsRoutes);
app.use("/api/medicalreport",medicalReportRoutes)//patient report creation for doctor
app.use('/api/patient',patientRoutes) //patient creating their own data.
app.use("/api", contactRoutes);


app.use(errorHandler);//error handler as the last middleware

app.listen(process.env.PORT,()=>{console.log("connected to the port",`${process.env.PORT}`)}) 
