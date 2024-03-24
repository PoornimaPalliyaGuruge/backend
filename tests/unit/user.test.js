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

  describe("GET /api/users/:id", () => {
      it("should return a user", async () => {
        const res = await request(app).get(
          "/api/users/65edb0618139d02bbe8f30ed"
        );
        expect(res.statusCode).toBe(200);
        expect(res.body.role).toBe("Student");
      });
    });