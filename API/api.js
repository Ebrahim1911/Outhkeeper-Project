import express from "express";
import { coursesRouter } from "./routers/courses.routers.js";
import { usersRouter } from "./routers/users.routers.js";
import { mongoose } from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
//Handling env File
dotenv.config();
const app = express();
const Port = process.env.PORT;
//Static Path
app.use("/uploads", express.static(path.join("uploads")));
//Mongo Database URL
const url = process.env.MONGO_URL;
mongoose
  .connect(url)
  .then(() => console.log("Mongodb connect success"))
  .catch((e) => console.log(console.log(e)));
//Handling block cors
app.use(cors());
app.use(express.json());
app.use("/api/courses", coursesRouter);
app.use("/api/users", usersRouter);
app.use("*", (req, res, next) => res.json("Not Found"));

//Listen
app.listen(Port, () => console.log(`Listen on Port ${Port}`));
