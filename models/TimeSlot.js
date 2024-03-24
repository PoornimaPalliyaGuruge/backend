    const { Schema, model } = require('mongoose');

    const TimeSlotSchema = new Schema({
        startTime: {
            type: Date,
            required: true,
        
        },
        endTime: {
            type: Date,
            required: true,
        
        }
    });

    // Add validation to ensure endTime is after startTime
    TimeSlotSchema.path('endTime').validate(function(value) {
        return this.startTime < value;
    }, 'endTime must be after startTime');


    module.exports = model("TimeSlot", TimeSlotSchema);
