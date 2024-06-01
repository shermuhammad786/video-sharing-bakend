import Express from "express"
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./Routes/User.js"
import videoRoutes from "./Routes/Video.js"
import commentRoutes from "./Routes/Comments.js"
import authRoutes from "./Routes/auth.js"
import cookieParser from "cookie-parser";
import cors from "cors"
import DBConnection from "./DB_Connection/Connect.mjs";
dotenv.config()






const app = Express()
DBConnection()

app.use(Express.json())
app.use(cookieParser());

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use((err, req, res, next) => {
    const status = err.status || 500
    const message = err.message || "something went wrong!";
    return res.status(status).json({
        success: false,
        status,
        message,
    })
})

app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/videos", videoRoutes)
app.use("/api/comments", commentRoutes)

app.listen(9000, () => {
    console.log("port is running!")
})
