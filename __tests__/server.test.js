const request = require('supertest');
const app = require('../server');

describe('User Login Endpoint', () => {
  it('should return 200 and success message on successful login', async () => {
    const response = await request(app).post('/api/authentication/login').send({
      email_id: 'ksi22845@nezid1.com',
      password: 'test@123',
    });

    expect(response.status).toEqual(200);
  });
});

describe('Create Question Endpoint', () => {
  it('should return 201 and success message on successfull Insertion', async () => {
    const requestBody = {
      question: 'What is the capital of France?',
      answer: 1,
      options: ['Paris', 'Berlin', 'London', 'Madrid'],
      status: 'approved',
      difficulty: 1,
      hint: 'Think about famous landmarks.',
      // Add other fields here as needed
    };
    const customHeaders = {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZTgzYmEzZjMwODAyNTY0YzE4NTkzZSIsInJvbGUiOlsic3VwZXJBZG1pbiJdLCJpYXQiOjE2OTM5OTg1NDUsImV4cCI6MTY5NDE3MTM0NX0.rOrW34gHRt-ciUZOa1DmsaxqdI5eJFgd8l8pr4_LLEA',
    };
    // Send a POST request to your create question endpoint (replace with the actual endpoint)
    const response = await request(app)
      .post('/api/question/')
      .send(requestBody)
      .set(customHeaders);

    // Expectations for a successful request
    expect(response.status).toBe(201); // Adjust the status code as needed
    expect(response.body).toEqual({
      success: true,
      message: 'Question Added Successfully',
    });
  });
});

// describe('Upload Image FrontEnd To GCP', () => {
//   it('should return imgae url of GCP and success if Image Upload', async () => {
//     
//   });
// });
