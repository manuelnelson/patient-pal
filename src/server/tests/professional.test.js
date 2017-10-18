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
// get organization to add as ID to professional
// before((done) => {
//     request(app)
//     .get('/api/organizations')
//     .expect(httpStatus.OK)
//     .then((res) => {
//         console.log(res.body);
//         organization = res.body._id;
//         done();
//     })

// })

after((done) => {
    // required because https://github.com/Automattic/mongoose/issues/1251#issuecomment-65793092
    mongoose.models = {};
    mongoose.modelSchemas = {};
    mongoose.connection.close();
    done();
});

  describe('## Professional APIs', () => {
    let professional = {
      email: 'test@test.com',
      password: 'p@ssw0rd!',
      role: 2,
      firstname: 'test',
      lastname: 'lastname',
      title: 'professional',
      organization: organization,
      status:1
    };
  
    describe('# POST /api/professionals', () => {
      it('should create a new professional', (done) => {
        request(app)
          .post('/api/professionals')
          .send(professional)
          .expect(httpStatus.OK)
          .then((res) => {
            expect(res.body.email).to.equal(professional.email);
            expect(res.body.firstname).to.equal(professional.firstname);
            expect(res.body.userId).is.not.equal(null);
            professional = res.body;
            done();
          })
          .catch(done);
      });
    });

    describe('# GET /api/professionals', () => {
        it('should retrieve the professional', (done) => {
          request(app)
            .get('/api/professionals/' + professional._id)
            .expect(httpStatus.OK)
            .then((res) => {
              expect(res.body.email).to.equal(professional.email);
              expect(res.body.firstname).to.equal(professional.firstname);
              expect(res.body.userId).is.not.equal(null);
              done();
            })
            .catch(done);
        });
        it('should return not found', (done) => {
            request(app)
              .get('/api/professionals/56c787ccc67fc16ccc1a5e92')
              .expect(httpStatus.NOT_FOUND)
              .then((res) => {
                expect(res.body.message).to.equal('Not Found');
                done();
              })
              .catch(done);
        });
    });
  

    describe('# PUT /api/professionals/:userId', () => {
        it('should update user details', (done) => {
          professional.firstname = 'bama';
          request(app)
            .put(`/api/professionals/${professional._id}`)
            .send(professional)
            .expect(httpStatus.OK)
            .then((res) => {
              expect(res.body.firstname).to.equal('bama');
              done();
            })
            .catch(done);
        });
      });

      describe('# Get /api/professionals/', () => {
        it('should search professionals and return array', (done) => {
          request(app)
            .get(`/api/professionals?firstname=${professional.firstname}`)
            .expect(httpStatus.OK)
            .then((res) => {
                expect(res.body).to.be.an('array');
                done();
            })
            .catch(done);
        });
      });

      describe('# DELETE /api/users', () => {
        it('should delete the professional by deleting the user', (done) => {
            //console.log(professional.userId)
          request(app)
            .delete(`/api/users/${professional.userId}`)
            .expect(httpStatus.OK)
            .then((res) => {
              expect(res.body.email).to.equal(professional.email);
              //expect(res.body.firstname).to.equal(professional.firstname);
              done();
            })
            .catch(done);
        });
      });
  
});