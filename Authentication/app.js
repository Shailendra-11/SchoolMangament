import express from "express";
import dotenv from 'dotenv';
const app = express()
dotenv.config()
const port = process.env.PORT || 800





app.listen(port, () => {
     console.log("Start server")
})