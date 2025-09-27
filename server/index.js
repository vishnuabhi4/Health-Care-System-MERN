import express from 'express';
import connectDB from './config/db.js';
import dotenv from "dotenv";
import { errorHandler } from './src/middlewares/errorHandler.js';
import cookieParser from "cookie-parser";
import authRoute from './src/routes/authRoute.js'
import userRoutes from "./src/routes/userRoutes.js"
import doctorRoutes from './src/routes/doctorRoutes.js'
import adminRoutes from './src/routes/adminRoutes.js'

dotenv.config();

console.log(process.env.PORT);

const app = express();
connectDB();

// Middlewares
app.use(express.json());
app.use(cookieParser()); // for refresh tokens in cookies
app.use(express.urlencoded({ extended: true }));


app.get('/', (req,res) => {
 res.send('primary route')
});

app.use("/api/auth",authRoute);//create user profile
app.use('/api/users',userRoutes);//user CRUD...
app.use('/api/admin/users',adminRoutes); //creating doctor profiles(admin access only)
app.use("/api/admin/doctorinfo", doctorRoutes);//doctor profile info update 

app.use(errorHandler);//error handler as the last middleware

app.listen(process.env.PORT,()=>{console.log("connected to the port",`${process.env.PORT}`)}) 