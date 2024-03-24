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

  describe("GET /api/room/:id", () => {
      it("should return a product", async () => {
        const res = await request(app).get(
          "/api/room/65fecb84c979c0dc4657bbc2"
        );
        expect(res.statusCode).toBe(200);
        expect(res.body.name).toBe("B501");
      });
    });