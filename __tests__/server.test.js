'use strict';
const { app } = require('../src/server'); 
const supertest = require('supertest');
const mockRequest = supertest(app);

const { db } = require('../src/models/index');


beforeAll(async () => {
    await db.sync();
});

describe('Web server', () => {

    it('Should respond with 404 status on an invalid route', async () => {
        const response = await mockRequest.get('/foo');
        expect(response.status).toBe(404);
    });

    it('can add a clothes', async () => {
        const response = await mockRequest.post('/food').send({
            name: 'burger',
            type: 'american'
        });
        expect(response.status).toBe(201);
    });

    // test if can read
    it('can get all clothes', async () => {
        const response = await mockRequest.get('/food');
        expect(response.status).toBe(200);

    });
    
    it('can update a record', async () => {
        const response = await mockRequest.put('/food/1').send({
            name: 'pizza',
            type: 'italian'
        });
        expect(response.status).toBe(201);
    });

    it('can get all clothes', async () => {
        const response = await mockRequest.get('/food/1');
        expect(response.status).toBe(200);
    });
    
    it('can delete a record', async () => {
        const response = await mockRequest.delete('/food/1');
        expect(response.status).toBe(204);
    });
});

// after all the tests are done
afterAll(async () => {
    await db.drop();
});