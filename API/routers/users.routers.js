import express from "express";
import {
  gellAllUsers,
  signUp,
  login,
} from "../controllers/users.controllers.js";
import { verifyToken } from "../middleware/verifyToken.js";
const usersRouter = express.Router();
//Get All Users
usersRouter.route("/").get(verifyToken, gellAllUsers);
//Login
usersRouter.route("/login").post(login);
//signUp
usersRouter.route("/signUp").post(signUp);
export { usersRouter };
