// Unit tests for basic functionality
const request = require('supertest');

// Mock Express app for testing
const express = require('express');
const app = express();

// Basic route for testing
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello World', status: 'success' });
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy', timestamp: new Date().toISOString() });
});

describe('Unit Tests', () => {
  describe('GET /', () => {
    test('should return hello world message', async () => {
      const response = await request(app).get('/');
      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Hello World');
      expect(response.body.status).toBe('success');
    });
  });

  describe('GET /health', () => {
    test('should return health status', async () => {
      const response = await request(app).get('/health');
      expect(response.status).toBe(200);
      expect(response.body.status).toBe('healthy');
      expect(response.body.timestamp).toBeDefined();
    });
  });

  describe('GET /nonexistent', () => {
    test('should return 404 for non-existent routes', async () => {
      const response = await request(app).get('/nonexistent');
      expect(response.status).toBe(404);
    });
  });
});