  const request = require('supertest');
  const app = require('../../index'); 

  describe('User API Endpoints', () => {
      let userId;
    
      beforeAll(async () => {
        await mongoose.connect(process.env.APP_DB);
      });
    
      afterAll(async () => {
        await mongoose.connection.close();
      });
    
      it('should create a new user', async () => {
        const res = await request(app)
          .post('/api/users')
          .send({
              name: "nayani",
              email: "nayani@gmail.com",
              role: "admin",
              username: "naya99",
              password: "123456"
          });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('_id');
        userId = res.body._id;
      });
    
      it('should fetch a user by ID', async () => {
        const res = await request(app).get(`/api/users/${userId}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('_id', userId);
      });
    
      it('should update a user', async () => {
        const res = await request(app)
          .put(`/api/users/${userId}`)
          .send({
              name: "Poornima updated",
          });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('_id', userId);
        
      });
    
      it('should delete a user', async () => {
        const res = await request(app).delete(`/api/users/${userId}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message', 'The User has been deleted');
      });
    });
    