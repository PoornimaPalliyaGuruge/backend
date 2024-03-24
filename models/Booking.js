    const { Schema, model } = require('mongoose');

    const BookingSchema = new Schema({
        date: {
            type: Date,
            required: true
        },
        startTime: {
            type: Date,
            required: true
        },
        endTime: {
            type: Date,
            required: true
        },
        roomId: {
            type: Schema.Types.ObjectId,
            ref: 'room',
            required: true
        },
        resourceId: {
            type: Schema.Types.ObjectId,
            ref: 'resources'
        },
        
    });

    module.exports = model('Booking', BookingSchema);
