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
  describe('## Appointment APIs', () => {
    let appointment = {
      startDate: '11/09/2017', 
      endDate: '11/10/2017', 
      location: 'home'    
    };

    describe('# POST /api/appointments', () => {
      it('should create a new appointment', (done) => {
        request(app)
          .post('/api/appointments')
          .send(appointment)
          .expect(httpStatus.OK)
          .then((res) => {
            expect(res.body.name).to.equal(appointment.name);
            appointment = res.body;
            done();
          })
          .catch(done);
      });
    });
      

    describe('# GET /api/appointments', () => {
        it('should retrieve the appointment', (done) => {
          request(app)
            .get('/api/appointments/' + appointment._id)
            .expect(httpStatus.OK)
            .then((res) => {
              expect(res.body.name).to.equal(appointment.name);
              done();
            })
            .catch(done);
        });
        it('should return not found', (done) => {
            request(app)
              .get('/api/appointments/56c787ccc67fc16ccc1a5e92')
              .expect(httpStatus.NOT_FOUND)
              .then((res) => {
                expect(res.body.message).to.equal('Not Found');
                done();
              })
              .catch(done);
        });
    });
  

    describe('# PUT /api/appointments/:userId', () => {
        it('should update user details', (done) => {
          appointment.location = 'bama';
          request(app)
            .put(`/api/appointments/${appointment._id}`)
            .send(appointment)
            .expect(httpStatus.OK)
            .then((res) => {
              expect(res.body.location).to.equal('bama');
              done();
            })
            .catch(done);
        });
      });

      describe('# Get /api/appointments/', () => {
        it('should search appointments and return array', (done) => {
          request(app)
            .get(`/api/appointments?location=${appointment.location}`)
            .expect(httpStatus.OK)
            .then((res) => {
                expect(res.body).to.be.an('array');
                done();
            })
            .catch(done);
        });
      });

      describe('# DELETE /api/appointments', () => {
        it('should delete the appointment', (done) => {
          request(app)
            .delete(`/api/appointments/${appointment._id}`)
            .expect(httpStatus.OK)
            .then((res) => {
              expect(res.body.location).to.equal(appointment.location);
              done();
            })
            .catch(done);
        });
      });
  
});