import { Router } from "express"
import { getProfile, isVerify, loginUser, registerUser } from "../controller/user.controller.js";
import userLoggedIn from "../middleware/user.middleware.js";

const userRoutes = Router();

userRoutes.post("/register", registerUser);
userRoutes.get("/verify/:token", isVerify);
userRoutes.post("/login" , loginUser)
userRoutes.get("/profile", userLoggedIn, getProfile);


export default userRoutes;