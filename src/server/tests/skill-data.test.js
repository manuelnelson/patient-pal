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

  describe('## SkillData APIs', () => {
    let skillData = {
      trialNumber: 2,
      skill: '59d7c865fe9206132c684c36',
      clientCurriculum: '59d7c865fe9206132c684c36'
    };
  
    describe('# POST /api/skillDatas', () => {
      it('should create a new skillData', (done) => {
        request(app)
          .post('/api/skillDatas')
          .send(skillData)
          .expect(httpStatus.OK)
          .then((res) => {
            expect(res.body.trialNumber).to.equal(skillData.trialNumber);
            skillData = res.body;
            done();
          })
          .catch(done);
      });
    });

    describe('# GET /api/skillDatas', () => {
        it('should retrieve the skillData', (done) => {
          request(app)
            .get('/api/skillDatas/' + skillData._id)
            .expect(httpStatus.OK)
            .then((res) => {
              expect(res.body.trialNumber).to.equal(skillData.trialNumber);
              done();
            })
            .catch(done);
        });
        it('should return not found', (done) => {
            request(app)
              .get('/api/skillDatas/56c787ccc67fc16ccc1a5e92')
              .expect(httpStatus.NOT_FOUND)
              .then((res) => {
                expect(res.body.message).to.equal('Not Found');
                done();
              })
              .catch(done);
        });
    });
  

    describe('# PUT /api/skillDatas/:userId', () => {
        it('should update user details', (done) => {
          skillData.trialNumber = 4;
          request(app)
            .put(`/api/skillDatas/${skillData._id}`)
            .send(skillData)
            .expect(httpStatus.OK)
            .then((res) => {
              expect(res.body.trialNumber).to.equal(skillData.trialNumber);
              done();
            })
            .catch(done);
        });
      });

      describe('# Get /api/skillDatas/', () => {
        it('should search skillDatas and return array', (done) => {
          request(app)
            .get(`/api/skillDatas?name=${skillData.trialNumber}`)
            .expect(httpStatus.OK)
            .then((res) => {
                expect(res.body).to.be.an('array');
                done();
            })
            .catch(done);
        });
      });

      describe('# DELETE /api/skillDatas', () => {
        it('should delete the skillData', (done) => {
          request(app)
            .delete(`/api/skillDatas/${skillData._id}`)
            .expect(httpStatus.OK)
            .then((res) => {
              expect(res.body.trialNumber).to.equal(skillData.trialNumber);
              done();
            })
            .catch(done);
        });
      });
  
});