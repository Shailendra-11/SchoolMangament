import express from "express";
import dotenv from 'dotenv';
import Dbconnect from "./src/lib/db.js";
const app = express()
dotenv.config()
const port = process.env.PORT || 800



Dbconnect()
app.listen(port, () => {
     console.log("Start server")
})