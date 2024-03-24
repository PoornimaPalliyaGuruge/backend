    const exp = require("express");
    const router = require( "express" ).Router();
    const { getTimeTables,getTimeTable,createTimeTable,updateTimeTable,deleteTimeTable} =  require('../controllers/timeTable.controller.js');
    const { userAuth, checkRole } = require('../controllers/Auth.js');


    router.get("/",getTimeTables)
    router.get("/:id",getTimeTable);
    router.post("/",createTimeTable)
    router.put("/:id",updateTimeTable);
    router.delete("/:id",deleteTimeTable);

    module.exports =  router;