  const exp = require("express");
  const Resource = require("../models/Resource");

  const createResourse = async (req, res) => {
      try {
          const resource = await Resource.create(req.body);
          res.status(200).json(resource);
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
  };

  const getResourses = async (req,res) =>{
      try {
          const resource = await Resource.find({});
          res.status(200).json(resource);
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
  }


  const getResourse = async(req , res)=>{
      try {
          const { id } = req.params;
          const resource = await Resource.findById(id);
          if (!resource) {
            return res.status(404).json({ message: "resource not found" });
          }
          res.status(200).json(resource);
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
  }

  const updateResourse= async( req, res )=>{
      try {
          const { id } = req.params;
          const resource = await Resource.findByIdAndUpdate(id, req.body);
      
          if (!resource) {
            return res.status(404).json({ message: "No resource with this id" });
          }
      
          const updateResource = await Resource.findById(id);
          res.status(200).json(updateResource);
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
  }

  const deleteResourse = async( req, res ) =>{
      try {
          const { id } = req.params;
          const resource = await Resource.findByIdAndDelete(id);
      
          if (!resource) {
            return res.status(404).json({ message: "No resource with this id!" });
          }
          res.status(200).json({ message: "The resource has been deleted" });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
      }

  module.exports ={
      createResourse,
      getResourses,
      getResourse,
      updateResourse,
      deleteResourse

  }