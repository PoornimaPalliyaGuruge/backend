  const request = require('supertest');
  const app = require('../../index'); 
  const TimeTable = require('../../models/TimeTable');


  describe('TimeTable API endpoints', () => {
    let savedTimeTableId;

    // Test case for creating a timetable
    describe('POST /api/timetable', () => {
      it('should create a timetable', async () => {
        const newTimeTableData = {

          dayOfWeek: 'Monday',
          courseId: '660014fc4ea90d68cddb5573',
          facultyId: '65edb18c8139d02bbe8f30fd',
          timeSlotId: '65fe34c38d3b188272691b93',
          type: 'class',
          roomId: '65fecb84c979c0dc4657bbc2',
          resourceId: '65fef1e80ebdf1efbc35a593',
          status: 'booked'
        };

        const response = await request(app)
          .post('/api/timetable')
          .send(newTimeTableData)
          .expect(201);

        savedTimeTableId = response.body._id; 
      });
    });

    // Test case for fetching all timetables
    describe('GET /api/timetable', () => {
      it('should fetch all timetables', async () => {
        await request(app)
          .get('/api/timetable')
          .expect(200);
      });
    });

    // Test case for fetching a single timetable by ID
    describe('GET /api/timetable/:id', () => {
      it('should fetch a single timetable by ID', async () => {
        await request(app)
          .get(`/api/timetable/${savedTimeTableId}`)
          .expect(200);
      });
    });

    // Test case for updating a timetable
    describe('PUT /api/timetable/:id', () => {
      it('should update a timetable', async () => {
        const updatedTimeTableData = {
        
          dayOfWeek: 'Tuesday'
        };

        await request(app)
          .put(`/api/timetable/${savedTimeTableId}`) 
          .send(updatedTimeTableData)
          .expect(200);
      });
    });

    // Test case for deleting a timetable
    describe('DELETE /api/timetable/:id', () => {
      it('should delete a timetable', async () => {
        await request(app)
          .delete(`/api/timetable/${savedTimeTableId}`) 
          .expect(200);
      });
    });
  });
