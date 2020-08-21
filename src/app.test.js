const supertest = require('supertest');
const app = require('./app');

describe('GET /', () => {

    it('should response with a message', async () => {
        const response = await supertest(app)
            .get('/')
            .expect('Content-Type', /json/)
            .expect(200)

        expect(response.body.message).toEqual('Store Inventory API');
    });

});
