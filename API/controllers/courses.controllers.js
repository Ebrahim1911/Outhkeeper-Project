import { validationResult } from "express-validator";
import { mongooseModel } from "../models/course.model.js";
import { SUCCESS, FAIL, ERROR } from "../utilities/http.Status.Text.js";
//Get All Courses
const getAllCourses = async (req, res) => {
  const query = req.query;
  const limit = query.limit || 5;
  const page = query.page || 1;
  const skip = (page - 1) * limit;
  const courses = await mongooseModel
    .find({}, { __v: false, price: false })
    .limit(limit)
    .skip(skip);
  res.json({
    status: SUCCESS,
    data: {
      courses,
    },
  });
};
//Get Single Course
const getSingleCourse = async (req, res) => {
  try {
    const course = await mongooseModel.findById(req.params.courseId);
    course
      ? res.json({ status: SUCCESS, data: { course } })
      : res.status(404).json({ status: FAIL, course: null });
  } catch (err) {
    console.log(err.message);
    res.status(404).json({
      status: ERROR,
      data: null,
      massage: err.message,
      code: 400,
    });
  }
};
//Post Data
const addCourse = async (req, res) => {
  const errors = validationResult(req);
  !errors.isEmpty()
    ? res.status(400).json({ status: ERROR, data: errors.array() })
    : null;
  const newCourse = new mongooseModel(req.body);
  await newCourse.save();
  res.status(201).json({ status: SUCCESS, data: { course: newCourse } });
};
//Patch Data
const updatdeCourse = async (req, res) => {
  const courseId = req.params.courseId;
  try {
    const updatedCourse = await mongooseModel.updateOne(
      { _id: courseId },
      { $set: { ...req.body } }
    );
    return res
      .status(200)
      .json({ status: SUCCESS, data: { course: updatedCourse } });
  } catch (error) {
    return res
      .status(400)
      .json({ status: ERROR, data: { error: error.message } });
  }
};
//Delete Data
const deleteData = async (req, res) => {
  const courseId = req.params.courseId;
  try {
    const deletedCourse = await mongooseModel.deleteOne({ _id: courseId });
    res.status(200).json({ status: SUCCESS, data: null });
  } catch (e) {
    console.log("from Catch", e);
  }
};
export { getAllCourses, getSingleCourse, addCourse, updatdeCourse, deleteData };
