  // course.test.js

  const request = require('supertest');
  const app = require("../../index"); 

  describe('Course API endpoints', () => {
    // Test case for fetching a course by ID
    it('GET /api/courses/:id should return a specific course', async () => {
      const courseId = "660012f18c35a242014f8e8a"; 

      const res = await request(app).get(`/api/courses/${courseId}`);

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('courseName');
      
    });

    // Test case for creating a new course
    it('POST /api/courses should create a new course', async () => {
      const newCourse = {
        courseName: 'Test Course',
      
      };

      const res = await request(app)
        .post('/api/courses')
        .send(newCourse);

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('courseName', newCourse.courseName);
      
    });

    
  });
