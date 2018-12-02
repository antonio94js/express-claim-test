/* eslint no-undef:0 */
import sinon from 'sinon';
import sinonchai from 'sinon-chai';
import chai, { expect } from 'chai';
import assertArrays from 'chai-arrays';
import { mockReq, mockRes } from 'sinon-express-mock';
import passport from 'passport';
import app from '../../../server';
import AuthenticationPolicies from '../../../api/policies/AuthenticationPolicies';
// import mocks from '../../fixtures/mocks';

chai.use(sinonchai);
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

let sandbox;
beforeEach(() => {
    sandbox = sinon.createSandbox();
});

afterEach(() => {
    sandbox.restore();
});

describe('AuthenticationPolicies', () => {
    describe('localAuth', () => {
        let res = null;
        beforeEach(function () {
            res = mockRes();
        });
        it('should be call next with MissingCredentials code when missingCredentials is true', async () => {
            const req = mockReq()
            const next = sinon.spy();

            sandbox
                .stub(passport, 'authenticate')
                .withArgs('local', sinon.match.any)
                .callsFake((strategy, cb) => {
                    cb(null, null, true) // err, accessToken, missingCredentials
                    return () => {};
                })
           
            await AuthenticationPolicies.localAuth(req, res, next);
            expect(next).to.have.been.calledWith(sinon.match({
                "content": {
                    code: 'MissingCredentials'
                }
            }));
        });
        it('should be call next with err object when err param is passed', async () => {
            const req = mockReq()
            const next = sinon.spy();
            const error = new Error();

            sandbox
                .stub(passport, 'authenticate')
                .withArgs('local', sinon.match.any)
                .callsFake((strategy, cb) => {
                    cb(error, null, null) // err, accessToken, missingCredentials
                    return () => {};
                })
           
            await AuthenticationPolicies.localAuth(req, res, next);
            expect(next).to.have.been.calledWith(sinon.match.instanceOf(Error));
        });
        it('should call req.logIn when no error is passed', async () => {
            const req = {
                logIn: sinon.spy(),
            }
            const next = sinon.spy();

            sandbox
                .stub(passport, 'authenticate')
                .withArgs('local', sinon.match.any)
                .callsFake((strategy, cb) => {
                    cb(null, {}, null) // err, accessToken, missingCredentials
                    return () => {};
                })
           
            await AuthenticationPolicies.localAuth(req, res, next);
            expect(req.logIn).to.be.have.been.calledOnce;
        });
    });
    describe('jwt', () => {
        let res = null;
        beforeEach(function () {
            res = mockRes();
        });
        it('should be call next with MissingCredentials code when missingCredentials is true', async () => {
            const req = mockReq()
            const next = sinon.spy();

            sandbox
                .stub(passport, 'authenticate')
                .withArgs('local', sinon.match.any)
                .callsFake((strategy, cb) => {
                    cb(null, null, true) // err, accessToken, missingCredentials
                    return () => {};
                })
           
            await AuthenticationPolicies.localAuth(req, res, next);
            expect(next).to.have.been.calledWith(sinon.match({
                "content": {
                    code: 'MissingCredentials'
                }
            }));
        });
        it('should be call next with err object when err param is passed', async () => {
            const req = mockReq()
            const next = sinon.spy();
            const error = new Error();

            sandbox
                .stub(passport, 'authenticate')
                .withArgs('local', sinon.match.any)
                .callsFake((strategy, cb) => {
                    cb(error, null, null) // err, accessToken, missingCredentials
                    return () => {};
                })
           
            await AuthenticationPolicies.localAuth(req, res, next);
            expect(next).to.have.been.calledWith(sinon.match.instanceOf(Error));
        });
        it('should call req.logIn when no error is passed', async () => {
            const req = {
                logIn: sinon.spy(),
            }
            const next = sinon.spy();

            sandbox
                .stub(passport, 'authenticate')
                .withArgs('local', sinon.match.any)
                .callsFake((strategy, cb) => {
                    cb(null, {}, null) // err, accessToken, missingCredentials
                    return () => {};
                })
           
            await AuthenticationPolicies.localAuth(req, res, next);
            expect(req.logIn).to.be.have.been.calledOnce;
        });
    });
    
});