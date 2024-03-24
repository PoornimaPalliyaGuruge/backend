    const exp = require("express");
    const router = require( "express" ).Router();
    const { createRoom, getRooms, getRoom, updateRoom, deleteRoom} =  require('../controllers/room.controller.js');
    const { userAuth, checkRole } = require('../controllers/Auth.js');

    router.post("/",createRoom);

    router.get("/",getRooms);

    router.get("/:id",getRoom);

    router.put("/:id",updateRoom);

    router.delete("/:id", deleteRoom);


    module.exports =  router;