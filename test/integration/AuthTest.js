/* eslint no-undef:0 */
// import sinon from 'sinon';
// import sinonchai from 'sinon-chai';
import chai, { expect } from 'chai';
import supertest from 'supertest';
// import { mockReq, mockRes } from 'sinon-express-mock';
import app from '../../server';
// import AuthController from '../../../api/controllers/AuthController';
import credentials from './fixtures/userCredentials';

// chai.use(sinonchai);
// chai.use(assertArrays);

let server;
let request;

const basePath = '/api/v1/auth'

before(async () => {
    try {
        server = await app;
        request = supertest(server);
        // server.close();
        // console.log(request);
    } catch (e) {
        winston.error(e);
    }
});

after(() => {
    server.close();
});
describe('Authentication Workflow test', () => {


    it('Should return an accesstoken if valid credentials are provided', async () => {
        // console.log(request);
        const { body } = await request
            .post(basePath)
            .send(credentials)
            .expect(200);
        expect(body).to.have.property('accessToken')
    });
    it('Should get 401 when invalid credentials are provided', async () => {
        // console.log(request);
        credentials.password = 'invalidpasssword'
        const { body } = await request
            .post(basePath)
            .send(credentials)
            .expect(401);
    });

    // it('Should get clients', async () => {
    //     const {
    //         body
    //     } = await request
    //         .get('/clients')
    //         .set('apikey', apikey)
    //         .expect(200);
    // });

    // it('Should get client by id', async () => {
    //     const {
    //         body
    //     } = await request
    //         .get(`/clients/${client._id}`)
    //         .set('apikey', apikey)
    //         .expect(200);
    // });

    // it('Should update client by id', async () => {
    //     const {
    //         body
    //     } = await request
    //         .put(`/clients/${client._id}`)
    //         .set('apikey', apikey)
    //         .send({
    //             dni: '12345678900'
    //         })
    //         .expect(204);
    // });

    // it('Should delete client by id', async () => {
    //     const {
    //         body
    //     } = await request
    //         .delete(`/clients/${client._id}`)
    //         .set('apikey', apikey)
    //         .expect(204);
    // });



});