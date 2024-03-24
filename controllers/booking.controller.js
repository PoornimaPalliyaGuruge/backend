    const Booking = require("../models/Booking");
    const Timetable = require("../models/TimeTable");
    const User = require("../models/User");
    const {triggerNotifications} = require("../controllers/notification.controller")


    const createBooking = async (req, res) => {
        try {
            const { date, startTime, endTime, roomId, resourceId, eventType } = req.body;

            const existingBooking = await Booking.findOne({
                date,
                roomId,
                $or: [
                    { startTime: { $lt: endTime }, endTime: { $gt: startTime } }, 
                    { resourceId } 
                ]
            });

            if (existingBooking) {
                return res.status(409).json({ message: "Room or resource is already booked for this time slot" });
            }


            console.log("Existing Booking:", existingBooking);


            
            const existingClass = await Timetable.findOne({
                dayOfWeek: getDayOfWeek(date), 
                roomId,
                startTime: { $lt: endTime },
                endTime: { $gt: startTime }
            });

            if (existingClass) {
            
                return res.status(409).json({ message: "Room is already booked for a class during this time slot" });
            }

        
            console.log("Existing Class:", existingClass);

            
            const newBooking = await Booking.create({
                date,
                startTime,
                endTime,
                roomId,
                resourceId,
                eventType
            });

            const allUsers = await User.find({});
            const message = 'The Booking has been updated. Please check for changes.';
            await triggerNotifications(allUsers, message);

            res.status(201).json(newBooking);
        } catch (error) {
        
            res.status(500).json({ message: error.message });
        }
    };


    const getDayOfWeek = (date) => {

        const parsedDate = new Date(date);
        const dayOfWeek = parsedDate.getDay();
        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        return daysOfWeek[dayOfWeek];
    };


    const getBookings = async (req, res) => {
        try {
            const bookings = await Booking.find();
            res.status(200).json(bookings);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    // Controller function to get a booking by ID
    const getBooking = async (req, res) => {
        try {
            const { id } = req.params;
            const booking = await Booking.findById(id);
            if (!booking) {
                return res.status(404).json({ message: "Booking not found" });
            }
            res.status(200).json(booking);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    const updateBooking = async (req, res) => {
        try {
            const { id } = req.params;
            const { date, startTime, endTime, roomId, resourceId } = req.body;

            // Check if the updated booking overlaps with existing bookings
            const existingBooking = await Booking.findOne({
                _id: { $ne: id }, // Exclude the current booking being updated
                date,
                roomId,
                $or: [
                    { startTime: { $lt: endTime }, endTime: { $gt: startTime } },
                    { resourceId }
                ]
            });

            if (existingBooking) {
                return res.status(409).json({ message: "Room or resource is already booked for this time slot" });
            }

            // Check if the updated booking overlaps with existing classes in the timetable
            const existingClass = await Timetable.findOne({
                dayOfWeek: getDayOfWeek(date),
                roomId,
                startTime: { $lt: endTime },
                endTime: { $gt: startTime }
            });

            if (existingClass) {
                return res.status(409).json({ message: "Room is already booked for a class during this time slot" });
            }

            // Update the booking
            const updatedBooking = await Booking.findByIdAndUpdate(id, req.body, { new: true });

            if (!updatedBooking) {
                return res.status(404).json({ message: "Booking not found" });
            }

            res.status(200).json(updatedBooking);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    const deleteBooking = async (req, res) => {
        try {
            const { id } = req.params;
            const deletedBooking = await Booking.findByIdAndDelete(id);
            if (!deletedBooking) {
                return res.status(404).json({ message: "Booking not found" });
            }
            res.status(200).json({ message: "Booking deleted successfully" });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };


    module.exports = {
        createBooking,
        getBookings,
        getBooking,
        updateBooking,
        deleteBooking
        
    };
