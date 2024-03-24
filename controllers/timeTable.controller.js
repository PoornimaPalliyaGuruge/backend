  const exp = require("express");
  const TimeTable = require("../models/TimeTable");
  const User = require("../models/User");
  const {triggerNotifications} = require("../controllers/notification.controller")

  const getTimeTables = async (req,res) =>{
      try {
          const timeTable = await TimeTable.find({});
          res.status(200).json(timeTable);
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
  }


  const getTimeTable = async(req , res)=>{
      try {
          const { id } = req.params;
          const timeTable = await TimeTable.findById(id);
          if (!timeTable) {
            return res.status(404).json({ message: "TimeTable not found" });
          }
          res.status(200).json(timeTable);
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
  }

  const createTimeTable = async (req, res) => {
      try {
          const timeTable = await TimeTable.create(req.body);
          res.status(201).json(timeTable); 
      } catch (error) {
          res.status(500).json({ message: error.message });
      }
  }

  const updateTimeTable = async( req, res )=>{
      try {
          const { id } = req.params;
          const timeTable = await TimeTable.findByIdAndUpdate(id, req.body);
      
          if (!timeTable) {
            return res.status(404).json({ message: "No Time Table with this id" });
          }
      
          const updateTimeTable = await TimeTable.findById(id);
          
          const allUsers = await User.find({});
          const message = 'The timetable has been updated. Please check for changes.';
          await triggerNotifications(allUsers, message);

          res.status(200).json(updateTimeTable);
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
  }

  const deleteTimeTable = async( req, res ) =>{
      try {
          const { id } = req.params;
          const timeTable = await TimeTable.findByIdAndDelete(id);
      
          if (!timeTable) {
            return res.status(404).json({ message: "No TimeTable with this id!" });
          }
          res.status(200).json({ message: "The TimeTable has been deleted" });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
  }


  module.exports = {
      createTimeTable,
      getTimeTables,
      getTimeTable,
      updateTimeTable,
      deleteTimeTable
  }