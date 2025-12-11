import { Router } from "express"
import { changePassword, forgotPassword, getProfile, isVerify, loginUser, logoutUser, registerUser, resendVerificationEmail, resetPassword } from "../controller/user.controller.js";
import userLoggedIn from "../middleware/user.middleware.js";

const userRoutes = Router();

userRoutes.post("/register", registerUser);
userRoutes.get("/verify/:token", isVerify);
userRoutes.post("/login", loginUser)
userRoutes.get("/profile", userLoggedIn, getProfile);
userRoutes.post("/forgot-password", forgotPassword);
userRoutes.post("/reset-password/:token", resetPassword);
userRoutes.post("/change-password", userLoggedIn, changePassword);
userRoutes.get("/logout", userLoggedIn, logoutUser);
userRoutes.get("/reverify", userLoggedIn, resendVerificationEmail);

export default userRoutes;