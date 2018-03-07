import mongoose from 'mongoose';
import request from 'supertest-as-promised';
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

  describe('## TargetSummary APIs', () => {
    let targetSummary = {
      name: 'test',
    };
  
    describe('# POST /api/targetSummarys', () => {
      it('should create a new targetSummary', (done) => {
        request(app)
          .post('/api/targetSummarys')
          .send(targetSummary)
          .expect(httpStatus.OK)
          .then((res) => {
            expect(res.body.name).to.equal(targetSummary.name);
            targetSummary = res.body;
            done();
          })
          .catch(done);
      });
    });

    describe('# GET /api/targetSummarys', () => {
        it('should retrieve the targetSummary', (done) => {
          request(app)
            .get('/api/targetSummarys/' + targetSummary._id)
            .expect(httpStatus.OK)
            .then((res) => {
              expect(res.body.name).to.equal(targetSummary.name);
              done();
            })
            .catch(done);
        });
        it('should return not found', (done) => {
            request(app)
              .get('/api/targetSummarys/56c787ccc67fc16ccc1a5e92')
              .expect(httpStatus.NOT_FOUND)
              .then((res) => {
                expect(res.body.message).to.equal('Not Found');
                done();
              })
              .catch(done);
        });
    });
  

    describe('# PUT /api/targetSummarys/:userId', () => {
        it('should update user details', (done) => {
          targetSummary.name = 'bama';
          request(app)
            .put(`/api/targetSummarys/${targetSummary._id}`)
            .send(targetSummary)
            .expect(httpStatus.OK)
            .then((res) => {
              expect(res.body.name).to.equal('bama');
              done();
            })
            .catch(done);
        });
      });

      describe('# Get /api/targetSummarys/', () => {
        it('should search targetSummarys and return array', (done) => {
          request(app)
            .get(`/api/targetSummarys?name=${targetSummary.name}`)
            .expect(httpStatus.OK)
            .then((res) => {
                expect(res.body).to.be.an('array');
                done();
            })
            .catch(done);
        });
      });

      describe('# DELETE /api/targetSummarys', () => {
        it('should delete the targetSummary', (done) => {
          request(app)
            .delete(`/api/targetSummarys/${targetSummary._id}`)
            .expect(httpStatus.OK)
            .then((res) => {
              expect(res.body.name).to.equal(targetSummary.name);
              done();
            })
            .catch(done);
        });
      });
  
});