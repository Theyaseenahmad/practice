import cookieParser from "cookie-parser";
import express from "express";
import { Home, Login } from "./controllers/User.controller.js";
import connectDB from "./config/db.js";
import { authMiddleware } from "./middlewares/Auth.middleware.js";

const app = express()
app.use(cookieParser())
app.use(express.json())
connectDB();

app.post('/',Login)
app.get('/',authMiddleware,Home)
// app.patch('/',Login)
// app.delete('/',Login)

export default app;