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

  describe('## DttType APIs', () => {
    let dttType = {
      name: 'test',
    };
  
    describe('# POST /api/dttTypes', () => {
      it('should create a new dttType', (done) => {
        request(app)
          .post('/api/dttTypes')
          .send(dttType)
          .expect(httpStatus.OK)
          .then((res) => {
            expect(res.body.name).to.equal(dttType.name);
            dttType = res.body;
            done();
          })
          .catch(done);
      });
    });

    describe('# GET /api/dttTypes', () => {
        it('should retrieve the dttType', (done) => {
          request(app)
            .get('/api/dttTypes/' + dttType._id)
            .expect(httpStatus.OK)
            .then((res) => {
              expect(res.body.name).to.equal(dttType.name);
              done();
            })
            .catch(done);
        });
        it('should return not found', (done) => {
            request(app)
              .get('/api/dttTypes/56c787ccc67fc16ccc1a5e92')
              .expect(httpStatus.NOT_FOUND)
              .then((res) => {
                expect(res.body.message).to.equal('Not Found');
                done();
              })
              .catch(done);
        });
    });
  

    describe('# PUT /api/dttTypes/:userId', () => {
        it('should update user details', (done) => {
          dttType.name = 'bama';
          request(app)
            .put(`/api/dttTypes/${dttType._id}`)
            .send(dttType)
            .expect(httpStatus.OK)
            .then((res) => {
              expect(res.body.name).to.equal('bama');
              done();
            })
            .catch(done);
        });
      });

      describe('# Get /api/dttTypes/', () => {
        it('should search dttTypes and return array', (done) => {
          request(app)
            .get(`/api/dttTypes?name=${dttType.name}`)
            .expect(httpStatus.OK)
            .then((res) => {
                expect(res.body).to.be.an('array');
                done();
            })
            .catch(done);
        });
      });

      describe('# DELETE /api/dttTypes', () => {
        it('should delete the dttType', (done) => {
          request(app)
            .delete(`/api/dttTypes/${dttType._id}`)
            .expect(httpStatus.OK)
            .then((res) => {
              expect(res.body.name).to.equal(dttType.name);
              done();
            })
            .catch(done);
        });
      });
  
});