    const { Schema, model } = require('mongoose');

    const UserSchema = new Schema(
        {
            name : {
                type: String,
                required : true
            },
            email :{
                type: String,
                required :true
            },
            role: {
                type: String,
                default : "student",
                enum: ["student","faculty","admin"]
            },
            username:{
                type: String,
                required : true
            },
            password:{
                type: String,
                required : true
            }
        },
        { timestamps:true }
        
    );

    module.exports =model("users",UserSchema) ; 