const cors = require("cors");
const exp = require("express");
const bp = require("body-parser");
const passport = require("passport");
const { connect } = require("mongoose");
const { success, error } = require("consola");

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

// Connection with DB
const startApp = async () => {
  try {
    await connect(DB, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds of inactivity
      useNewUrlParser: true, // Optional. Necessary for version 4.0.0 and above
      useUnifiedTopology: true // Optional. Necessary for version 4.0.0 and above
    });

    success({
      message: `Successfully connected with the Database \n ${DB}`,
      badge: true
    });
//Start listen for the server on port
    app.listen(PORT, () =>
      success({ message: `Server is running on port ${PORT}`, badge: true })
    );
  } catch (err) {
    error({
      message: `Unable to connect with DataBase \n${err}`,
      badge: true
    });
    startApp();
  }
};

startApp();
