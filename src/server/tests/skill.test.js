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

  describe('## Skill APIs', () => {
    let skill = {
      targetName: 'test',
      goalName: 'test',
      stimulus: 'test',
      numberOfTrials: 2,
      targetType: '59d7c865fe9206132c684c36',
      masteryType: 1,
      organization: '59d7c865fe9206132c684c36'
    };
  
    describe('# POST /api/skills', () => {
      it('should create a new skill', (done) => {
        request(app)
          .post('/api/skills')
          .send(skill)
          .expect(httpStatus.OK)
          .then((res) => {
            expect(res.body.targetName).to.equal(skill.targetName);
            skill = res.body;
            done();
          })
          .catch(done);
      });
    });

    describe('# GET /api/skills', () => {
        it('should retrieve the skill', (done) => {
          request(app)
            .get('/api/skills/' + skill._id)
            .expect(httpStatus.OK)
            .then((res) => {
              expect(res.body.targetName).to.equal(skill.targetName);
              done();
            })
            .catch(done);
        });
        it('should return not found', (done) => {
            request(app)
              .get('/api/skills/56c787ccc67fc16ccc1a5e92')
              .expect(httpStatus.NOT_FOUND)
              .then((res) => {
                expect(res.body.message).to.equal('Not Found');
                done();
              })
              .catch(done);
        });
    });
  

    describe('# PUT /api/skills/:userId', () => {
        it('should update user details', (done) => {
          skill.targetName = 'bama';
          request(app)
            .put(`/api/skills/${skill._id}`)
            .send(skill)
            .expect(httpStatus.OK)
            .then((res) => {
              expect(res.body.targetName).to.equal('bama');
              done();
            })
            .catch(done);
        });
      });

      describe('# Get /api/skills/', () => {
        it('should search skills and return array', (done) => {
          request(app)
            .get(`/api/skills?name=${skill.targetName}`)
            .expect(httpStatus.OK)
            .then((res) => {
                expect(res.body).to.be.an('array');
                done();
            })
            .catch(done);
        });
      });

      describe('# DELETE /api/skills', () => {
        it('should delete the skill', (done) => {
          request(app)
            .delete(`/api/skills/${skill._id}`)
            .expect(httpStatus.OK)
            .then((res) => {
              expect(res.body.targetName).to.equal(skill.targetName);
              done();
            })
            .catch(done);
        });
      });
  
});