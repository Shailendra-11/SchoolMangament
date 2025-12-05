import {Router} from "express"
import { isVerify, registerUser } from "../controller/user.controller.js";

const userRoutes = Router();

userRoutes.post("/register", registerUser);
userRoutes.get("/verify/:token", isVerify);




export default userRoutes;