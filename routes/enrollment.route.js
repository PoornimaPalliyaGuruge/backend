    const express = require('express');
    const router = express.Router();
    const { enrollStudent, getStudentEnrollments,removeStudentEnrollment,updateEnrollment, getEnrollmentById} = require('../controllers/enrollment.controller');
    const { userAuth, checkRole } = require('../controllers/Auth.js');


    router.post("/", userAuth, checkRole(['student']), enrollStudent);
    router.get("/", userAuth, checkRole(['admin','faculty']), getStudentEnrollments);
    router.put("/:id", userAuth, checkRole(['admin','faculty']), updateEnrollment);
    router.get("/:id", userAuth, checkRole(['admin','faculty']), getEnrollmentById);
    router.delete("/:id", userAuth, checkRole(['admin','faculty']), removeStudentEnrollment);

    module.exports = router;