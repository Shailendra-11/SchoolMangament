import mongoose from "mongoose";
import { Schema } from "mongoose";
const UserSchema = new Schema({
     name: {
          type: String,
          require: true
     },
     email: {
          type: String,
          unique: [true, 'Email must be unique'],
          require: true
     },
     password: {
          type: String,
          require: true
     },

      role: {
      type: String,
      enum: ["ADMIN", "USER"],
      default: "USER",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    emailVerificationToken: String,
    emailVerificationExpiry: Date,
    resetVerificationToken: String,
    resetVerificationExpiry: Date,
},{timestamps :true})

const User = mongoose.model('User', UserSchema);
export default User;