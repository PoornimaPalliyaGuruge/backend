    const exp = require("express");
    const router = require( "express" ).Router();
    const { createBooking,getBookings,getBooking,updateBooking, deleteBooking } =  require('../controllers/booking.controller.js');
    const { userAuth, checkRole } = require('../controllers/Auth.js');

    router.post("/",createBooking);

    router.get("/",getBookings);

    router.get("/:id",getBooking);

    router.put("/:id",updateBooking);

    router.delete("/:id", deleteBooking);


    module.exports =  router;