    const { Schema, model } = require('mongoose');

    const enrollmentSchema = new Schema({
        
        studentId: { 
            type: Schema.Types.ObjectId, 
            ref: 'users', required: true 
        },
        courseId: { 
            type: Schema.Types.ObjectId, 
            ref: 'courses', required: true
        },
        
    });

    module.exports = model('Enrollment', enrollmentSchema);
