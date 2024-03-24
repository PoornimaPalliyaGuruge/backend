  const exp = require("express");
  const TimeSlot = require("../models/TimeSlot");



  const createTimeSlot = async (req, res) => {
      try {
          const timeslot = await TimeSlot.create(req.body);
          res.status(200).json(timeslot);
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
  };

  const getTimeSlots = async (req,res) =>{
      try {
          const timeSlot = await TimeSlot.find({});
          res.status(200).json(timeSlot);
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
  }


  const getTimeSlot = async(req , res)=>{
      try {
          const { id } = req.params;
          const timeSlot = await TimeSlot.findById(id);
          if (!timeSlot) {
            return res.status(404).json({ message: "Time Slot not found" });
          }
          res.status(200).json(timeSlot);
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
  }

  const updateTimeSlot = async( req, res )=>{
      try {
          const { id } = req.params;
          const timeSlot = await TimeSlot.findByIdAndUpdate(id, req.body);
      
          if (!timeSlot) {
            return res.status(404).json({ message: "No time slot with this id" });
          }
      
          const updateTimeSlot = await TimeSlot.findById(id);
          res.status(200).json(updateTimeSlot);
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
  }

  const deleteTimeSlot = async( req, res ) =>{
      try {
          const { id } = req.params;
          const timeSlot = await TimeSlot.findByIdAndDelete(id);
      
          if (!timeSlot) {
            return res.status(404).json({ message: "No time slot with this id!" });
          }
          res.status(200).json({ message: "The time slot has been deleted" });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
  }



  module.exports ={
      createTimeSlot,
      getTimeSlots,
      getTimeSlot,
      updateTimeSlot,
      deleteTimeSlot
  }
