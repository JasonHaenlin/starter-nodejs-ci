const { app } = require('../../server');
const request = require('supertest');
const assert = require('assert');


describe('status route', () => {
  describe('GET /', () => {
    it('should respond with a 200', () => {
      request(app)
        .get('/status/')
        .expect(200)
        .end((err) => {
          if (err) {
            throw err;
          }
        });
    });
  });
});
