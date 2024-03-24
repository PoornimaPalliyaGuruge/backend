    const cors = require("cors");
    const exp = require("express");
    const bp = require("body-parser");
    const passport = require("passport");
    const { connect } = require("mongoose");
    const { success, error } = require("consola");
    const courseRoute = require("./routes/courses.route.js")
    const timeSlotRoute = require("./routes/timeSlot.route.js")
    const timeTableRoute = require("./routes/timeTable.route.js")
    const roomRoute =  require("./routes/room.route.js");
    const resourceRoute =  require("./routes/resource.route.js");
    const bookingRoute = require("./routes/booking.route.js");
    const enrollmentRoute = require("./routes/enrollment.route.js");
    const notificationRoute = require("./routes/notification.route.js")


    // Bring in the app constants
    const { DB, PORT } = require("./config");




    // Initialize the application
    const app = exp();

    // Middleware
    app.use(cors());
    app.use(bp.json());
    app.use(passport.initialize());

    require("./middlewares/passport");
        
    //use router middleware
    app.use("/api/users", require("./routes/users"));
    app.use("/api/courses", courseRoute);
    app.use("/api/timeSlots",timeSlotRoute);
    app.use("/api/timetable",timeTableRoute);
    app.use("/api/room",roomRoute);
    app.use("/api/resource",resourceRoute);
    app.use("/api/booking",bookingRoute);
    app.use("/api/enroll",enrollmentRoute);
    app.use('/api/notifications', notificationRoute);


    // Connection with DB
    const startApp = async () => {
      try {
        await connect(DB, {
          serverSelectionTimeoutMS: 5000, 
          useNewUrlParser: true, 
          useUnifiedTopology: true, 
        });

        success({
          message: `Successfully connected with the Database \n ${DB}`,
          badge: true,
        });
        //Start listen for the server on port
        app.listen(PORT, () =>
          success({ message: `Server is running on port ${PORT}`, badge: true })
        );
      } catch (err) {
        error({
          message: `Unable to connect with DataBase \n${err}`,
          badge: true,
        });
        startApp();
      }
    };

    startApp();

    module.exports = app;
