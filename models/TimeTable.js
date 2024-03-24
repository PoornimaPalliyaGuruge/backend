  const { Schema, model } = require('mongoose');

  const timetableSchema = new Schema({
    dayOfWeek: {
      type: String,
      required: true,
      enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    },
    courseId: {
      type: Schema.Types.ObjectId,
      ref: 'Course',
      required: true
    },
    facultyId:{
      type : Schema.Types.ObjectId ,
      ref : 'User',
      required : true
    },
    timeSlotId: {
      type: Schema.Types.ObjectId,
      ref: 'TimeSlot',
      required: true
    },
    type: {
      type: String,
      enum: ['class', 'event'],
      required: true
    },
    roomId: {
      type: Schema.Types.ObjectId,
      ref: 'Room',
      required: true
    },
    resourceId: {
      type: Schema.Types.ObjectId,
      ref: 'resources'
  },
  status: {
      type: String,
      enum: ['booked', 'cancelled'],
      default: 'booked'
  }
  });

  module.exports = model('Timetable', timetableSchema);
