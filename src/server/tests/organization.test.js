import mongoose from 'mongoose';
import request from 'supertest';
import httpStatus from 'http-status';
import chai, { expect } from 'chai';
import app from '../index';

chai.config.includeStack = true;
/**
 * root level hooks
 */


after((done) => {
    // required because https://github.com/Automattic/mongoose/issues/1251#issuecomment-65793092
    mongoose.models = {};
    mongoose.modelSchemas = {};
    mongoose.connection.close();
    done();
});

  describe('## Organization APIs', () => {
    let organization = {
      name: 'test',
    };
  
    describe('# POST /api/organizations', () => {
      it('should create a new organization', (done) => {
        request(app)
          .post('/api/organizations')
          .send(organization)
          .expect(httpStatus.OK)
          .then((res) => {
            expect(res.body.name).to.equal(organization.name);
            organization = res.body;
            done();
          })
          .catch(done);
      });
    });

    describe('# GET /api/organizations', () => {
        it('should retrieve the organization', (done) => {
          request(app)
            .get('/api/organizations/' + organization._id)
            .expect(httpStatus.OK)
            .then((res) => {
              expect(res.body.name).to.equal(organization.name);
              done();
            })
            .catch(done);
        });
        it('should return not found', (done) => {
            request(app)
              .get('/api/organizations/56c787ccc67fc16ccc1a5e92')
              .expect(httpStatus.NOT_FOUND)
              .then((res) => {
                expect(res.body.message).to.equal('Not Found');
                done();
              })
              .catch(done);
        });
    });
  

    describe('# PUT /api/organizations/:id', () => {
        it('should update user details', (done) => {
          organization.name = 'bama';
          request(app)
            .put(`/api/organizations/${organization._id}`)
            .send(organization)
            .expect(httpStatus.OK)
            .then((res) => {
              expect(res.body.name).to.equal('bama');
              done();
            })
            .catch(done);
        });
      });

      describe('# Get /api/organizations/', () => {
        it('should search organizations and return array', (done) => {
          request(app)
            .get(`/api/organizations?name=${organization.name}`)
            .expect(httpStatus.OK)
            .then((res) => {
                expect(res.body).to.be.an('array');
                done();
            })
            .catch(done);
        });
      });

      describe('# DELETE /api/organizations', () => {
        it('should delete the organization', (done) => {
          request(app)
            .delete(`/api/organizations/${organization._id}`)
            .expect(httpStatus.OK)
            .then((res) => {
              expect(res.body.name).to.equal(organization.name);
              done();
            })
            .catch(done);
        });
      });
  
});