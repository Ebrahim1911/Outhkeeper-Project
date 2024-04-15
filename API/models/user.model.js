import { mongoose } from "mongoose";
import validator from "validator";
import userRole from "../utilities/userRoles.js";

const userSchema = new mongoose.Schema({
  fristName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, "Must be a Valid Email"],
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
  },
  role: {
    type: String,
    enum: [userRole.ADMIN, userRole.USER, userRole.MANGER],
    default: userRole.USER,
  },
  avatar: {
    type: String,
    default: "uploads/profile.png",
  },
});
export const usersForm = mongoose.model("user", userSchema);
