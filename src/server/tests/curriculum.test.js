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

  describe('## Curriculum APIs', () => {
    let curriculum = {
      name: 'test',
      skills: ['59ca7f03298d4e2f1c3db5ef','59ca7f03298d4e2f1c3db5ea'],
      organization: organization
    };
  
    describe('# POST /api/curriculums', () => {
      it('should create a new curriculum', (done) => {
        request(app)
          .post('/api/curriculums')
          .send(curriculum)
          .expect(httpStatus.OK)
          .then((res) => {
            expect(res.body.name).to.equal(curriculum.name);
            curriculum = res.body;
            done();
          })
          .catch(done);
      });
    });

    describe('# GET /api/curriculums', () => {
        it('should retrieve the curriculum', (done) => {
          request(app)
            .get('/api/curriculums/' + curriculum._id)
            .expect(httpStatus.OK)
            .then((res) => {
              expect(res.body.name).to.equal(curriculum.name);
              done();
            })
            .catch(done);
        });
        it('should return not found', (done) => {
            request(app)
              .get('/api/curriculums/56c787ccc67fc16ccc1a5e92')
              .expect(httpStatus.NOT_FOUND)
              .then((res) => {
                expect(res.body.message).to.equal('Not Found');
                done();
              })
              .catch(done);
        });
    });
  

    describe('# PUT /api/curriculums/:userId', () => {
        it('should update user details', (done) => {
          curriculum.name = 'bama';
          request(app)
            .put(`/api/curriculums/${curriculum._id}`)
            .send(curriculum)
            .expect(httpStatus.OK)
            .then((res) => {
              expect(res.body.name).to.equal('bama');
              done();
            })
            .catch(done);
        });
      });

      describe('# Get /api/curriculums/', () => {
        it('should search curriculums and return array', (done) => {
          request(app)
            .get(`/api/curriculums?name=${curriculum.name}`)
            .expect(httpStatus.OK)
            .then((res) => {
                expect(res.body).to.be.an('array');
                done();
            })
            .catch(done);
        });
      });

      describe('# DELETE /api/curriculums', () => {
        it('should delete the curriculum', (done) => {
          request(app)
            .delete(`/api/curriculums/${curriculum._id}`)
            .expect(httpStatus.OK)
            .then((res) => {
              expect(res.body.name).to.equal(curriculum.name);
              done();
            })
            .catch(done);
        });
      });
  
});