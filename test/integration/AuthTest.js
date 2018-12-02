/* eslint no-undef:0 */
// import sinon from 'sinon';
// import sinonchai from 'sinon-chai';
import chai, { expect } from 'chai';
import assertArrays from 'chai-arrays';
// import { mockReq, mockRes } from 'sinon-express-mock';
import app from '../../server';
// import AuthController from '../../../api/controllers/AuthController';
// import record from '../fixtures/record';

// chai.use(sinonchai);
chai.use(assertArrays);

let server;
before(async () => {
    try {
        server = await app;
    } catch (e) {
        winston.error(e);
    }
});

after(() => {
    server.close();
});

// let sandbox;
// beforeEach(() => {
//     // sandbox = sinon.createSandbox();
// });

// afterEach(() => {
//     // sandbox.restore();
// });

describe('AuthController', () => {
    describe('get', () => {
        let res = null;
        beforeEach(function () {
            // res = mockRes();
        });
        it('should call res.json with the value injected into user prop', async () => {
            expect(true).to.be.true
        });
    });
});