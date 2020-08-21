const supertest = require('supertest');
const app = require('../../app');

describe('Get /api/v1/states', () => {
    it('should be response a array of states', async () => {
        const response = await supertest(app)
        .get('/api/v1/states')
        .expect('Content-Type', /json/)
        .expect(200);

        expect(response.body.length).toBeGreaterThan(0);
    })
});