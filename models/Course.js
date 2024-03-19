const { Schema, model, default: mongoose } = require('mongoose');

const CourseSchema = mongoose.Schema({

    courseName : {
        type : String,
        require : true
    },

    description : {
        type : String,
        require: true
    },

    credits : {
        type : Number,
        min : 1,
        max : 4,
        require : true
    },

},{
    timestamps : true //creates createdAt and updatedAt fields in the database
  }
);

const Course = module.exports = model("Course", CourseSchema);

module.exports = Course;