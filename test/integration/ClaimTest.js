/* eslint no-undef:0 */
import chai, { expect } from 'chai';
import supertest from 'supertest';
import app from '../../server';
import credentials from './fixtures/userCredentials';
import claim from './fixtures/claim';
import jwt from 'jsonwebtoken';


let server;
let request;
const userCredentials = credentials.user;

const basePath = '/api/v1/claims'

before(async () => {
    try {
        server = await app;
        request = supertest(server);
    } catch (e) {
        winston.error(e);
    }
});

after(() => {
    server.close();
});
describe('Claim Workflow test', () => {
    let claimId = null;
    describe('Create Claim', () => {
        let accessToken
        before(async () => {
            const basePath = '/api/v1/auth'
            const { body } = await request
                .post(basePath)
                .send(userCredentials)
                .expect(200);
            accessToken = body.accessToken;
        });

        it('Should create a new claim', async () => {
            const { body } = await request
                .post(basePath)
                .set('Authorization', `Bearer ${accessToken}`)
                .send(claim.create)
                .expect(201);
            expect(body).to.have.property('id')
            expect(body).to.have.property('fligth_code')
            expect(body).to.have.property('ticket_number')
            expect(body).to.have.property('attendant_id')
            expect(body.attendant_id).to.be.equal(null)
            expect(body).to.have.property('status')
            expect(body.status).to.be.equal('pending')
            claimId = body.id;
        });

        it('Should return 400 if fligth_code is not supplied', async () => {
            const create = {...claim.create};
            delete create.fligth_code;
            const { body } = await request
                .post(basePath)
                .set('Authorization', `Bearer ${accessToken}`)
                .send(create)
                .expect(400);
            expect(body).to.have.property('code')
            expect(body.code).to.be.equal('InvalidRequestPayload')
        });
    });
    describe('Get My Claims', () => {
        let accessToken
        before(async () => {
            const basePath = '/api/v1/auth'
            console.log(userCredentials);
            const { body } = await request
                .post(basePath)
                .send(userCredentials)
                .expect(200);
            accessToken = body.accessToken;
        });

        it('Should return 200 and get My claims', async () => {
            const userData = jwt.verify(accessToken, process.env.JWT_SECRET);
            const { body } = await request
                .get('/api/v1/me/claims')
                .set('Authorization', `Bearer ${accessToken}`)
                .send()
                .expect(200);
            body.forEach((claim) => {
                expect(claim).to.have.property('claimer_id')
                expect(claim.claimer_id).to.be.equal(userData.id)
            })
        });

    });
    describe('Delete Claim', () => {
        let accessToken
        before(async () => {
            const basePath = '/api/v1/auth'
            console.log(userCredentials);
            const { body } = await request
                .post(basePath)
                .send(userCredentials)
                .expect(200);
            accessToken = body.accessToken;
        });

        it('Should return 204 and remove claim from DB', async () => {
            await request
                .delete(`${basePath}/${claimId}`)
                .set('Authorization', `Bearer ${accessToken}`)
                .send()
                .expect(204);

            const { body } = await request
                .get(`${basePath}/${claimId}`)
                .set('Authorization', `Bearer ${accessToken}`)
                .send()
                .expect(404);
            
            expect(body).to.have.property('code')
            expect(body.code).to.be.equal('ClaimNotFound')
        });

    });
});