  const mongoose = require("mongoose");
  const request = require("supertest");
  const app = require("../../index.js");

  require("dotenv").config();

  /* Connecting to the database before each test. */
  beforeEach(async () => {
      await mongoose.connect(process.env.APP_DB);
  });
    
  /* Closing database connection after each test. */
  afterEach(async () => {
      await mongoose.connection.close();
  });

  describe("POST /api/timetable", () => {
      it("should create a timetable", async () => {
        const res = await request(app).post("/api/timetable").send({
          dayOfWeek: "Wednesday",
          courseId: "660009179d6fe77b5bbd01cd",
          facultyId: "65edb18c8139d02bbe8f30fd",
          timeSlotId: "65feb52014093392bf9a3af8",
          type :"class",
          roomId : "65fecb84c979c0dc4657bbc2",
          resourceId : "65fef1e80ebdf1efbc35a593",
          status : "booked"
        });
        expect(res.statusCode).toBe(201); 
        expect(res.body.dayOfWeek).toBe("Wednesday"); 
      });
  });
