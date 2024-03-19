const exp = require("express");
const router = require( "express" ).Router();
const { getCourses, getCourse,createCourse, updateCourse, deleteCourse } =  require('../controllers/course.controller.js');

router.get("/",getCourses);

router.get("/:id",getCourse);

router.post("/",createCourse);

router.put("/:id",updateCourse);

router.delete("/:id", deleteCourse);

module.exports =  router;
               