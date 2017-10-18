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

  describe('## ClientCurriculum APIs', () => {
    //tests require appointment, client, and professional, so query first

    let clientCurriculum = {};
    describe('# GET /api/appointment', () => {
      it('should get an appointment to create a client curriculum', (done) => {
        request(app)
        .get('/api/appointments')
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.be.an('array');        
          let appt = res.body[0];
          clientCurriculum = {
            appointment: appt._id,
            client: appt.client._id,
          };
          done();          
        })
        .catch(done);
      });
    });
  
    describe('# GET /api/curriculums', () => {
      it('should get a curriculum to create a client curriculum', (done) => {
        request(app)
        .get('/api/curriculums')
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.be.an('array');        
          let curriculum = res.body[0];
          clientCurriculum.curriculum = curriculum._id;
          clientCurriculum.completed = false;
          done();          
        })
        .catch(done);
      });
    });

    describe('# POST /api/clientcurriculums', () => {
      it('should create a new clientCurriculum', (done) => {
        console.log(clientCurriculum)
        request(app)
          .post('/api/clientcurriculums')
          .send(clientCurriculum)
          .expect(httpStatus.OK)
          .then((res) => {
            expect(res.body.completed).to.equal(clientCurriculum.completed);
            clientCurriculum = res.body;
            done();
          })
          .catch(done);
      });
    });

    describe('# GET /api/clientcurriculums', () => {
        it('should retrieve the clientCurriculum', (done) => {
          request(app)
            .get('/api/clientcurriculums/' + clientCurriculum._id)
            .expect(httpStatus.OK)
            .then((res) => {
              expect(res.body.completed).to.equal(clientCurriculum.completed);
              done();
            })
            .catch(done);
        });
        it('should return not found', (done) => {
            request(app)
              .get('/api/clientcurriculums/56c787ccc67fc16ccc1a5e92')
              .expect(httpStatus.NOT_FOUND)
              .then((res) => {
                expect(res.body.message).to.equal('Not Found');
                done();
              })
              .catch(done);
        });
    });
  

    describe('# PUT /api/clientcurriculums/:userId', () => {
        it('should update user details', (done) => {
          clientCurriculum.completed = true;
          request(app)
            .put(`/api/clientcurriculums/${clientCurriculum._id}`)
            .send(clientCurriculum)
            .expect(httpStatus.OK)
            .then((res) => {
              expect(res.body.completed).to.equal(true);
              done();
            })
            .catch(done);
        });
      });

      describe('# Get /api/clientcurriculums/', () => {
        it('should search clientcurriculums and return array', (done) => {
          request(app)
            .get(`/api/clientcurriculums?completed=${clientCurriculum.completed}`)
            .expect(httpStatus.OK)
            .then((res) => {
                expect(res.body).to.be.an('array');
                done();
            })
            .catch(done);
        });
      });

      describe('# DELETE /api/clientcurriculums', () => {
        it('should delete the clientCurriculum', (done) => {
          request(app)
            .delete(`/api/clientcurriculums/${clientCurriculum._id}`)
            .expect(httpStatus.OK)
            .then((res) => {
              expect(res.body.completed).to.equal(clientCurriculum.completed);
              done();
            })
            .catch(done);
        });
      });
  
});