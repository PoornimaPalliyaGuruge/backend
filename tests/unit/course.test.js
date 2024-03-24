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

  describe("GET /api/courses/:id", () => {
      it("should return a course", async () => {
        const res = await request(app).get(
          "/api/courses/65f901ac2270385d2e8207b1"
        );
        expect(res.statusCode).toBe(200);
        expect(res.body.courseName).toBe("IWT");
      });
  });

  describe("POST /api/courses", () => {
      it("should create a course", async () => {
        const res = await request(app).post("/api/courses").send({
          courseName: "ESD",
          code: "IT2130",
          description: "ESD",
          credits: "4",
          facultyId :"65edb18c8139d02bbe8f30fd"
        });
        expect(res.statusCode).toBe(200); // Changed to 201
        expect(res.body.courseName).toBe("ESD"); // Match with the course name provided
      });
  });

  describe("PUT /api/courses/:id", () => {
      it("should update a course", async () => {
        const res = await request(app)
          .patch("/api/courses/6600131637ba361001c9a6f4")
          .send({
            credits : 1,
          });
        expect(res.statusCode).toBe(200);
        expect(res.body.courseName).toBe(1); // Match with the updated course name provided
      });
  });

  describe("DELETE /api/courses/:id", () => {
    it("should delete a course", async () => {
      const res = await request(app).delete(
        "/api/courses/6600148fec3c517a49e214e2"
      );
      expect(res.statusCode).toBe(200);
    });
  });
