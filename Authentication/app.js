import express from "express";
import dotenv from 'dotenv';
import cors from "cors";
import Dbconnect from "./src/lib/db.js";
import userRoutes from "./src/routes/user.route.js";
import cookieParser from "cookie-parser";
const app = express()
dotenv.config()
const port = process.env.PORT || 800

// app.use(
//   cors({
//     origin: process.env.BASE_URL,
//     methods: ["GET", "POST", "DELETE", "OPTIONS"],
//     credentials: true,
//   })
// );

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());




Dbconnect()
app.use("/api/v1/users", userRoutes)


app.listen(port, () => {
     console.log("Start server")
})