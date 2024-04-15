import { Query } from "mongoose";
import { usersForm } from "../models/user.model.js";
import { SUCCESS, FAIL, ERROR } from "../utilities/http.Status.Text.js";
import { validationResult } from "express-validator";
import JWT from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { generateJWT } from "../utilities/generate.JWT.js";
const gellAllUsers = async (req, res) => {
  console.log(req.headers);
  const query = req.query;
  const limit = query.limit || 5;
  const page = query.page || 1;
  const skip = (page - 1) * limit;
  const users = await usersForm
    .find({}, { _v: false, password: false })
    .limit(limit)
    .skip(skip);
  res.json({
    status: SUCCESS,
    data: {
      users,
    },
  });
};
const signUp = async (req, res) => {
  const { fristName, lastName, email, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new usersForm({
    fristName,
    lastName,
    email,
    password: hashedPassword,
    role,
  });

  const token = await generateJWT({
    email: newUser.email,
    id: newUser._id,
    role: newUser.role,
  });
  newUser.token = token;
  await newUser.save();
  res.status(202).json({ status: SUCCESS, data: { newUser } });
};
const login = async (req, res) => {
  const { email, password, role } = req.body;
  const user = await usersForm.findOne({ email });
  const decodedPassword = await bcrypt.compare(password, user.password);
  const token = await generateJWT({
    email: user.email,
    id: user._id,
    role: user.role,
  });
  return res.status(200).json({ status: SUCCESS, data: { token } });
};
export { gellAllUsers, signUp, login };
