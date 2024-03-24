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

  describe("GET /api/enroll/:id", () => {
      it("should return a enrollment details", async () => {
        const res = await request(app).get(
          "/api/enroll/65ffdb07efa5850c22e7b025"
        );
        expect(res.statusCode).toBe(200);
        expect(res.body.studentId).toBe("65edb0ff8139d02bbe8f30f4");
      });
    });