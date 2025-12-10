import User from "../model/user.model.js"
import crypto from "crypto";
import bcrypt from "bcrypt";
import sendingEmail from "../lib/sendingEmail.js"
import jwt from "jsonwebtoken";
const registerUser = async (req, res) => {
     const { name, email, password } = req.body
     if (!name || !email || !password) {
          return res.status(401).json({
               message: "All fields are required",
               success: false,
          });
     }
     try {
          const allreadyRegisterdUser = await User.findOne({ email });
          if (allreadyRegisterdUser) {
               return res.status(400).json({
                    message: "User allready Registerd",
                    success: false,
               });
          }

          const token = crypto.randomBytes(30).toString("hex");
          // console.log("Token :- ", token);
          const hashPassword = await bcrypt.hash(password, 10);
          console.log(hashPassword, hashPassword)
          const newUser = await User.create({
               name,
               email,
               password: hashPassword,
               emailVerificationToken: token,
               emailVerificationExpiry: Date.now() + 60 * 60 * 1000,
          });

          if (!newUser) {
               return res.status(401).json({
                    message: "User not Registerd",
                    success: false,
               });
          }

          // Sending Email
          const options = {
               email: email,
               subject: "Email verification",
               route: "verify",
               token: token,
          };
          await sendingEmail(options);
          return res.status(201).json({
               message: "User register successfully",
               success: true,
               user: newUser,
          });
     } catch (error) {
          console.log("Internel server error :- ", error);
          return res.status(500).json({
               message: "Internel server error",
               success: false,
               error: error.message,
          });

     }

}



const isVerify = async (req, res) => {
     try {
          const { token } = req.params;
          // console.log(token)
          if (!token) {
               return res.status(401).json({
                    message: "Token is required",
                    success: false,
               });
          }

          const user = await User.findOne({ emailVerificationToken: token }).select(
               "-password"
          );

          if (!user || user.emailVerificationExpiry < Date.now()) {
               return res.status(401).json({
                    message: "Invalid token",
                    success: false,
               });
          }

          user.isVerified = true;
          user.emailVerificationExpiry = undefined;
          user.emailVerificationToken = undefined;

          await user.save();

          return res.status(200).json({
               message: "Email verification successfully",
               success: true,
               user: user,
          });
     } catch (error) {
          console.log("Internel server error :- ", error);
          return res.status(500).json({
               message: "Internel server error",
               success: false,
               error: error.message,
          });
     }
};


const loginUser = async (req, res) => {
     const { email, password } = req.body;
     // console.log(email , password)
     if (!email || !password) {
          return res.status(401).json({
               message: "All fields are requires",
               success: false,
          })
     }
     try {
          const user = await User.findOne({ email });
          if (!user) {
               return res.status(404).json({
                    message: "User not Found",
                    success: false,
               })
          }

          const isMatch = await bcrypt.compare(password, user.password)
          if (!isMatch) {
               return res.status(401).json({
                    message: "email and password invalid",
                    success: false,
               });
          }
          const jwtToken = jwt.sign({ email: email, _id: user._id }, process.env.JWT_SECRET, { expiresIn: "12h" })
          const cookieOptions = {
               httpOnly: true,
               secure: false,
               maxAge: 24 * 60 * 60 * 1000,
          };
          res.cookie("token", jwtToken, cookieOptions);
          return res.status(200).json({
               success: true,
               message: "Login successful",
          });
     } catch (error) {
          console.log("Internel server error :- ", error);
          return res.status(500).json({
               message: "Internel server error",
               success: false,
               error: error.message,
          });
     }


}






const logoutUser = (req, res) => {

}


export {
     registerUser,
     loginUser,
     logoutUser,
     isVerify,
     //   getProfile,
     //   forgotPassword,
     //   resetPassword,
     //   changePassword,
     //   resendVerificationEmail,
};