  const exp = require("express");
  const Room = require("../models/Room");

  const createRoom = async (req, res) => {
      try {
          const room = await Room.create(req.body);
          res.status(200).json(room);
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
  };

  const getRooms = async (req,res) =>{
      try {
          const room = await Room.find({});
          res.status(200).json(room);
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
  }


  const getRoom = async(req , res)=>{
      try {
          const { id } = req.params;
          const room = await Room.findById(id);
          if (!room) {
            return res.status(404).json({ message: "room not found" });
          }
          res.status(200).json(room);
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
  }

  const updateRoom = async( req, res )=>{
      try {
          const { id } = req.params;
          const room = await Room.findByIdAndUpdate(id, req.body);
      
          if (!room) {
            return res.status(404).json({ message: "No room with this id" });
          }
      
          const updateRoom = await Room.findById(id);
          res.status(200).json(updateRoom);
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
  }

  const deleteRoom = async( req, res ) =>{
      try {
          const { id } = req.params;
          const room = await Room.findByIdAndDelete(id);
      
          if (!room) {
            return res.status(404).json({ message: "No room with this id!" });
          }
          res.status(200).json({ message: "The room has been deleted" });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
      }

  module.exports ={
      createRoom,
      getRooms,
      getRoom,
      updateRoom,
      deleteRoom

  }