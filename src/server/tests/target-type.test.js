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

  describe('## TargetType APIs', () => {
    let targetType = {
      name: 'test',
    };
  
    describe('# POST /api/targetTypes', () => {
      it('should create a new targetType', (done) => {
        request(app)
          .post('/api/targetTypes')
          .send(targetType)
          .expect(httpStatus.OK)
          .then((res) => {
            expect(res.body.name).to.equal(targetType.name);
            targetType = res.body;
            done();
          })
          .catch(done);
      });
    });

    describe('# GET /api/targetTypes', () => {
        it('should retrieve the targetType', (done) => {
          request(app)
            .get('/api/targetTypes/' + targetType._id)
            .expect(httpStatus.OK)
            .then((res) => {
              expect(res.body.name).to.equal(targetType.name);
              done();
            })
            .catch(done);
        });
        it('should return not found', (done) => {
            request(app)
              .get('/api/targetTypes/56c787ccc67fc16ccc1a5e92')
              .expect(httpStatus.NOT_FOUND)
              .then((res) => {
                expect(res.body.message).to.equal('Not Found');
                done();
              })
              .catch(done);
        });
    });
  

    describe('# PUT /api/targetTypes/:userId', () => {
        it('should update user details', (done) => {
          targetType.name = 'bama';
          request(app)
            .put(`/api/targetTypes/${targetType._id}`)
            .send(targetType)
            .expect(httpStatus.OK)
            .then((res) => {
              expect(res.body.name).to.equal('bama');
              done();
            })
            .catch(done);
        });
      });

      describe('# Get /api/targetTypes/', () => {
        it('should search targetTypes and return array', (done) => {
          request(app)
            .get(`/api/targetTypes?name=${targetType.name}`)
            .expect(httpStatus.OK)
            .then((res) => {
                expect(res.body).to.be.an('array');
                done();
            })
            .catch(done);
        });
      });

      describe('# DELETE /api/targetTypes', () => {
        it('should delete the targetType', (done) => {
          request(app)
            .delete(`/api/targetTypes/${targetType._id}`)
            .expect(httpStatus.OK)
            .then((res) => {
              expect(res.body.name).to.equal(targetType.name);
              done();
            })
            .catch(done);
        });
      });
  
});