    const { Schema, model, default: mongoose } = require('mongoose');

    const CourseSchema = mongoose.Schema({

        courseName : {
            type : String,
            require : true
        },
        code : {
            type : String,
            unique : true,
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

        facultyId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
            required: true
        }

    },{
        timestamps : true 
    }
    );

    module.exports = mongoose.model("Course", CourseSchema);