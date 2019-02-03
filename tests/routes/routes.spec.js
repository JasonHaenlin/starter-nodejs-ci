const { app } = require('../../server');
const handleExceptions = require('@root/app/middlewares/errorHandlers').handleExceptions;
const request = require('supertest');
const assert = require('assert');

describe('index route', () => {
  describe('GET /', () => {
    it('should respond with a 200', () => {
      request(app)
        .get('/')
        .expect('content-type', /html/)
        .expect(200);
    });
  });

  describe('GET /tickets', () => {
    it('should respond with a 200 and fetch data from database', () => {
      request(app)
        .get('/tickets')
        .expect('Content-Type', /json/)
        .expect(200)
        .expect((res) => {
          assert.notEqual(res.body, null);
          assert.equal(res.body[0].name, 'Pichu');
        });
    });

    it('should respond with a 404 error', () => {
      request(app)
        .get('/tickets/nopath')
        .expect(404);
    });

    it('should respond with a 500 error', () => {
      app.get('/testErrorhandler', handleExceptions((res, req) => {
        // Since we are not passing username,
        // any operation on undefined will result in error
        const { username } = req.body;
        const lengthOfSUername = username.length;
        res.json({ status: true, length: lengthOfSUername });
      }));

      request(app)
        .get('/testErrorhandler')
        .expect(500);
    });

  });
});
