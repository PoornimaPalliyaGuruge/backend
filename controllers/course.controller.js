const exp = require("express");
const Course = require("../models/Course");


const getCourses = async (req,res) =>{
    try {
        const course = await Course.find({});
        res.status(200).json(course);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
}

const getCourse = async(req , res)=>{
    try {
        const { id } = req.params;
        const course = await Course.findById(id);
        if (!course) {
          return res.status(404).json({ message: "Course not found" });
        }
        res.status(200).json(course);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
}

//create new course
const createCourse = async(req, res) => {
    try {
        const course = await Course.create(req.body);
        res.status(200).json(course);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
}

//update course
const updateCourse = async( req, res )=>{
    try {
        const { id } = req.params;
        const course = await Course.findByIdAndUpdate(id, req.body);
    
        if (!course) {
          return res.status(404).json({ message: "No course with this id" });
        }
    
        const updateCourse = await Course.findById(id);
        res.status(200).json(updateCourse);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
}

//delete course
const deleteCourse = async( req, res ) =>{
    try {
        const { id } = req.params;
        const course = await Course.findByIdAndDelete(id);
    
        if (!course) {
          return res.status(404).json({ message: "No course with this id!" });
        }
        res.status(200).json({ message: "The course has been deleted" });
      } catch (error) {
          res.status(500).json({ message: error.message });
      }
}


module.exports = {
    getCourses,
    getCourse,
    createCourse,
    updateCourse,
    deleteCourse
}