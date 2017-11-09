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

  describe('## masteredSkill APIs', () => {
    let masteredSkill = {
      name: 'test',
    };
  
    describe('# POST /api/masteredSkills', () => {
      it('should create a new masteredSkill', (done) => {
        request(app)
          .post('/api/masteredSkills')
          .send(masteredSkill)
          .expect(httpStatus.OK)
          .then((res) => {
            expect(res.body.name).to.equal(masteredSkill.name);
            masteredSkill = res.body;
            done();
          })
          .catch(done);
      });
    });

    describe('# GET /api/masteredSkills', () => {
        it('should retrieve the masteredSkill', (done) => {
          request(app)
            .get('/api/masteredSkills/' + masteredSkill._id)
            .expect(httpStatus.OK)
            .then((res) => {
              expect(res.body.name).to.equal(masteredSkill.name);
              done();
            })
            .catch(done);
        });
        it('should return not found', (done) => {
            request(app)
              .get('/api/masteredSkills/56c787ccc67fc16ccc1a5e92')
              .expect(httpStatus.NOT_FOUND)
              .then((res) => {
                expect(res.body.message).to.equal('Not Found');
                done();
              })
              .catch(done);
        });
    });
  

    describe('# PUT /api/masteredSkills/:userId', () => {
        it('should update user details', (done) => {
          masteredSkill.name = 'bama';
          request(app)
            .put(`/api/masteredSkills/${masteredSkill._id}`)
            .send(masteredSkill)
            .expect(httpStatus.OK)
            .then((res) => {
              expect(res.body.name).to.equal('bama');
              done();
            })
            .catch(done);
        });
      });

      describe('# Get /api/masteredSkills/', () => {
        it('should search masteredSkills and return array', (done) => {
          request(app)
            .get(`/api/masteredSkills?name=${masteredSkill.name}`)
            .expect(httpStatus.OK)
            .then((res) => {
                expect(res.body).to.be.an('array');
                done();
            })
            .catch(done);
        });
      });

      describe('# DELETE /api/masteredSkills', () => {
        it('should delete the masteredSkill', (done) => {
          request(app)
            .delete(`/api/masteredSkills/${masteredSkill._id}`)
            .expect(httpStatus.OK)
            .then((res) => {
              expect(res.body.name).to.equal(masteredSkill.name);
              done();
            })
            .catch(done);
        });
      });
  
});