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

  describe('## ProgressReport APIs', () => {
    let progressReport = {
      name: 'test',
    };
  
    describe('# POST /api/progressReports', () => {
      it('should create a new progressReport', (done) => {
        request(app)
          .post('/api/progressReports')
          .send(progressReport)
          .expect(httpStatus.OK)
          .then((res) => {
            expect(res.body.name).to.equal(progressReport.name);
            progressReport = res.body;
            done();
          })
          .catch(done);
      });
    });

    describe('# GET /api/progressReports', () => {
        it('should retrieve the progressReport', (done) => {
          request(app)
            .get('/api/progressReports/' + progressReport._id)
            .expect(httpStatus.OK)
            .then((res) => {
              expect(res.body.name).to.equal(progressReport.name);
              done();
            })
            .catch(done);
        });
        it('should return not found', (done) => {
            request(app)
              .get('/api/progressReports/56c787ccc67fc16ccc1a5e92')
              .expect(httpStatus.NOT_FOUND)
              .then((res) => {
                expect(res.body.message).to.equal('Not Found');
                done();
              })
              .catch(done);
        });
    });
  

    describe('# PUT /api/progressReports/:userId', () => {
        it('should update user details', (done) => {
          progressReport.name = 'bama';
          request(app)
            .put(`/api/progressReports/${progressReport._id}`)
            .send(progressReport)
            .expect(httpStatus.OK)
            .then((res) => {
              expect(res.body.name).to.equal('bama');
              done();
            })
            .catch(done);
        });
      });

      describe('# Get /api/progressReports/', () => {
        it('should search progressReports and return array', (done) => {
          request(app)
            .get(`/api/progressReports?name=${progressReport.name}`)
            .expect(httpStatus.OK)
            .then((res) => {
                expect(res.body).to.be.an('array');
                done();
            })
            .catch(done);
        });
      });

      describe('# DELETE /api/progressReports', () => {
        it('should delete the progressReport', (done) => {
          request(app)
            .delete(`/api/progressReports/${progressReport._id}`)
            .expect(httpStatus.OK)
            .then((res) => {
              expect(res.body.name).to.equal(progressReport.name);
              done();
            })
            .catch(done);
        });
      });
  
});