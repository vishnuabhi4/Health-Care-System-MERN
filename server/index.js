import express from 'express';
import userRoutes from './src/routes/userRoutes.js';



const app = express();

app.use('/', (req, res, next) => {
  console.log('primary root');
  next(); // important to not block following routes
});
app.use('/users',userRoutes)

const PORT = 5000;

app.listen(PORT,()=>{console.log("connected to the port",`${PORT}`)})