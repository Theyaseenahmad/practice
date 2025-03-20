import cookieParser from "cookie-parser";
import express from "express";
import { Admin, Home, Login, Signup } from "./controllers/User.controller.js";
import connectDB from "./config/db.js";
import { authMiddleware } from "./middlewares/Auth.middleware.js";
import SignupValidation from "./validators/Signup.Validators.js";
import loginValidation from "./validators/Login.Validators.js";
import { AdminMiddleware } from "./middlewares/Admin.middleware.js";

const app = express()
app.use(cookieParser())
app.use(express.json())
connectDB();

app.post('/',SignupValidation,Signup)
app.post('/login',loginValidation,Login)
app.get('/',authMiddleware,Home)
app.get('/admin',AdminMiddleware,Admin)
// app.patch('/',Login)
// app.delete('/',Login)

export default app;