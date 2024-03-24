    const exp = require("express");
    const Enrollment = require('../models/Enrollment.js');
    const User = require("../models/User");

    const enrollStudent = async (req, res) => {
        try {
        
            const { studentId, courseId } = req.body;

            const existingEnrollment = await Enrollment.findOne({ studentId, courseId });

            if (existingEnrollment) {
                return res.status(409).json({ message: "Student is already enrolled in this course" });
            }

            const enrollment = await Enrollment.create({ studentId, courseId });

            res.status(201).json(enrollment);
        } catch (error) {
    
            res.status(500).json({ message: error.message });
        }
    };

    const getStudentEnrollments = async (req, res) => {
        try {
            const enrollments = await Enrollment.find({});
            res.status(200).json(enrollments);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };
    const getEnrollmentById = async (req, res) => {
        try {
            const { id } = req.params;

            const enrollment = await Enrollment.findById(id);

            if (!enrollment) {
                return res.status(404).json({ message: "Enrollment not found" });
            }

            res.status(200).json(enrollment);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };


    const updateEnrollment = async (req, res) => {
        try {
            const { id } = req.params;
            const enrollment = await Enrollment.findByIdAndUpdate(id, req.body);
        
            if (!enrollment) {
            return res.status(404).json({ message: "No Enrollment with this id" });
            }
        
            const updateEnrollment = await Enrollment.findById(id);
            res.status(200).json(updateEnrollment);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    const removeStudentEnrollment = async (req, res) => {
        try {
            const { id } = req.params;
            const enrollment = await Enrollment.findByIdAndDelete(id);
        
            if (!enrollment) {
            return res.status(404).json({ message: "No enrollment with this id!" });
            }
            res.status(200).json({ message: "The enrollment has been deleted" });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };


    module.exports = {
        enrollStudent,
        getStudentEnrollments,
        getEnrollmentById,
        updateEnrollment,
        removeStudentEnrollment
    };
