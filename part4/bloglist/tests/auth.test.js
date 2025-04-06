const request = require('supertest');
const app = require('../server'); // Make sure to export your Express app in server.js

describe('Auth API', () => {
  it('should log in successfully with valid credentials', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({
        username: 'admin',
        password: 'admin123',
      });

    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  it('should fail to log in with invalid credentials', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({
        username: 'admin',
        password: 'wrongpassword',
      });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Invalid username or password');
  });

  it('should register a new user successfully', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({
        username: 'newuser',
        password: 'newuser123',
        role: 'regular',
      });

    expect(res.status).toBe(201);
    expect(res.body.message).toBe('User registered successfully');
  });

  it('should fail to register a user with an existing username', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({
        username: 'admin', // Already exists
        password: 'admin123',
        role: 'admin',
      });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Username already exists');
  });
});
