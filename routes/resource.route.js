    const exp = require("express");
    const router = require( "express" ).Router();
    const { createResourse, getResourses, getResourse, updateResourse, deleteResourse} =  require('../controllers/resource.controller.js');
    const { userAuth, checkRole } = require('../controllers/Auth.js');

    router.post("/",createResourse);

    router.get("/",getResourses);

    router.get("/:id",getResourse);

    router.put("/:id",updateResourse);

    router.delete("/:id", deleteResourse);


    module.exports =  router;