import express from "express";
import {
  getAllCourses,
  getSingleCourse,
  addCourse,
  updatdeCourse,
  deleteData,
} from "../controllers/courses.controllers.js";
import { body } from "express-validator";
import { verifyToken } from "../middleware/verifyToken.js";
import userRole from "../utilities/userRoles.js";
import allowTo from "../middleware/allowedTo.js";
const coursesRouter = express.Router();

//CRUD Operation (Create/Read/Update/Delete)
//GET
coursesRouter.get("/", getAllCourses);
//GET by Id by req.params
coursesRouter.get("/:courseId", getSingleCourse);
//Post
coursesRouter.post(
  "/",
  [
    body("title")
      .notEmpty()
      .withMessage("Title Is Required")
      .isLength({ min: 3 })
      .withMessage("Title At Least Is 2 degists"),
    body("price")
      .notEmpty()
      .withMessage("Price Is Required")
      .isLength({ min: 4 })
      .withMessage("Price At Least Is 4 degists"),
  ],
  addCourse
);
//Update
coursesRouter.patch("/:courseId", updatdeCourse);
//Delete
coursesRouter.delete(
  "/:courseId",
  verifyToken,
  allowTo(userRole.ADMIN, userRole.MANGER),
  deleteData
);

export { coursesRouter };
