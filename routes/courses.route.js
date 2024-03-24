    const exp = require("express");
    const router = require( "express" ).Router();
    const { getCourses, getCourse,createCourse, updateCourse, deleteCourse , assignFacultyToCourse} =  require('../controllers/course.controller.js');
    const { userAuth, checkRole } = require('../controllers/Auth.js');

    router.get("/",getCourses);

    router.get("/:id",getCourse);

    router.post("/",createCourse);

    router.put("/:id",updateCourse);

    router.delete("/:id",deleteCourse);

    router.post('/:id/assign-faculty', userAuth, checkRole(['admin']), assignFacultyToCourse); 

    module.exports =  router;
                