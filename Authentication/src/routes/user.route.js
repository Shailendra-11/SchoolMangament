import { Router } from "express"
import { isVerify, loginUser, registerUser } from "../controller/user.controller.js";

const userRoutes = Router();

userRoutes.post("/register", registerUser);
userRoutes.get("/verify/:token", isVerify);
userRoutes.post("/login" , loginUser)




export default userRoutes;