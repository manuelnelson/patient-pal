import mongoose from 'mongoose';
import request from 'supertest';
import httpStatus from 'http-status';
import chai, { expect } from 'chai';
import app from '../index';

chai.config.includeStack = true;
/**
 * root level hooks
 */

let organization = '59ca7f03298d4e2f1c3db5ed'; 

after((done) => {
    // required because https://github.com/Automattic/mongoose/issues/1251#issuecomment-65793092
    mongoose.models = {};
    mongoose.modelSchemas = {};
    mongoose.connection.close();
    done();
});

  describe('## Client APIs', () => {
    let client = {
      email: 'client@test.com',
      password: 'p@ssw0rd!',
      role: 10,
      firstname: 'test',
      lastname: 'beryy',
      organization: organization,
      status:1
    };
  
    describe('# POST /api/clients', () => {
      it('should create a new client', (done) => {
        request(app)
          .post('/api/clients')
          .send(client)
          .expect(httpStatus.OK)
          .then((res) => {
            expect(res.body.firstname).to.equal(client.firstname);
            client = res.body;
            done();
          })
          .catch(done);
      });
    });

    describe('# GET /api/clients', () => {
        it('should retrieve the client', (done) => {
          request(app)
            .get('/api/clients/' + client._id)
            .expect(httpStatus.OK)
            .then((res) => {
              expect(res.body.firstname).to.equal(client.firstname);
              done();
            })
            .catch(done);
        });
        it('should return not found', (done) => {
            request(app)
              .get('/api/clients/56c787ccc67fc16ccc1a5e92')
              .expect(httpStatus.NOT_FOUND)
              .then((res) => {
                expect(res.body.message).to.equal('Not Found');
                done();
              })
              .catch(done);
        });
    });
  

    describe('# PUT /api/clients/:userId', () => {
        it('should update user details', (done) => {
          client.firstname = 'bama';
          request(app)
            .put(`/api/clients/${client._id}`)
            .send(client)
            .expect(httpStatus.OK)
            .then((res) => {
              expect(res.body.firstname).to.equal('bama');
              done();
            })
            .catch(done);
        });
      });

      describe('# Get /api/clients/', () => {
        it('should search clients and return array', (done) => {
          request(app)
            .get(`/api/clients?firstname=${client.firstname}`)
            .expect(httpStatus.OK)
            .then((res) => {
                expect(res.body).to.be.an('array');
                done();
            })
            .catch(done);
        });
      });

      describe('# DELETE /api/users', () => {
        it('should delete the client by deleting the user', (done) => {
          request(app)
            .delete(`/api/users/${client.userId}`)
            .expect(httpStatus.OK)
            .then((res) => {
              expect(res.body.email).to.equal(client.email);
              //expect(res.body.firstname).to.equal(professional.firstname);
              done();
            })
            .catch(done);
        });
      });
  
});