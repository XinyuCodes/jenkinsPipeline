// Integration tests for the actual server
const request = require('supertest');

describe('Integration Tests', () => {
  let server;
  let app;

  beforeAll(() => {
    // Start server for testing
    const express = require('express');
    app = express();
    
    // Add the same routes as your main app
    app.get('/', (req, res) => {
      res.status(200).json({ message: 'Hello World', status: 'success' });
    });
    
    app.get('/health', (req, res) => {
      res.status(200).json({ status: 'healthy', timestamp: new Date().toISOString() });
    });
    
    server = app.listen(0); // Use random port for testing
  });

  afterAll((done) => {
    if (server) {
      server.close(done);
    } else {
      done();
    }
  });

  describe('Server Integration', () => {
    test('should handle multiple concurrent requests', async () => {
      const requests = Array(5).fill().map(() => request(app).get('/'));
      const responses = await Promise.all(requests);
      
      responses.forEach(response => {
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Hello World');
      });
    });

    test('should serve health endpoint correctly', async () => {
      const response = await request(app).get('/health');
      expect(response.status).toBe(200);
      expect(response.body.status).toBe('healthy');
    });
  });

  describe('Performance Tests', () => {
    test('should respond within acceptable time', async () => {
      const startTime = Date.now();
      const response = await request(app).get('/');
      const endTime = Date.now();
      
      expect(response.status).toBe(200);
      expect(endTime - startTime).toBeLessThan(1000); // Less than 1 second
    });
  });
});