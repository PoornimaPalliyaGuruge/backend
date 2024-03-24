    const exp = require("express");
    const router = require( "express" ).Router();
    const { createTimeSlot, getTimeSlot, getTimeSlots, updateTimeSlot, deleteTimeSlot} =  require('../controllers/timeSlot.controller.js');
    const { userAuth, checkRole } = require('../controllers/Auth.js');

    router.post("/",createTimeSlot);

    router.get("/",getTimeSlots);

    router.get("/:id",getTimeSlot);

    router.put("/:id",updateTimeSlot);

    router.delete("/:id", deleteTimeSlot);


    module.exports =  router;