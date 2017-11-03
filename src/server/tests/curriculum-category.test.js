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

  describe('## CurriculumCategory APIs', () => {
    let curriculumCategory = {
      name: 'test',
    };
  
    describe('# POST /api/curriculumCategorys', () => {
      it('should create a new curriculumCategory', (done) => {
        request(app)
          .post('/api/curriculumCategorys')
          .send(curriculumCategory)
          .expect(httpStatus.OK)
          .then((res) => {
            expect(res.body.name).to.equal(curriculumCategory.name);
            curriculumCategory = res.body;
            done();
          })
          .catch(done);
      });
    });

    describe('# GET /api/curriculumCategorys', () => {
        it('should retrieve the curriculumCategory', (done) => {
          request(app)
            .get('/api/curriculumCategorys/' + curriculumCategory._id)
            .expect(httpStatus.OK)
            .then((res) => {
              expect(res.body.name).to.equal(curriculumCategory.name);
              done();
            })
            .catch(done);
        });
        it('should return not found', (done) => {
            request(app)
              .get('/api/curriculumCategorys/56c787ccc67fc16ccc1a5e92')
              .expect(httpStatus.NOT_FOUND)
              .then((res) => {
                expect(res.body.message).to.equal('Not Found');
                done();
              })
              .catch(done);
        });
    });
  

    describe('# PUT /api/curriculumCategorys/:userId', () => {
        it('should update user details', (done) => {
          curriculumCategory.name = 'bama';
          request(app)
            .put(`/api/curriculumCategorys/${curriculumCategory._id}`)
            .send(curriculumCategory)
            .expect(httpStatus.OK)
            .then((res) => {
              expect(res.body.name).to.equal('bama');
              done();
            })
            .catch(done);
        });
      });

      describe('# Get /api/curriculumCategorys/', () => {
        it('should search curriculumCategorys and return array', (done) => {
          request(app)
            .get(`/api/curriculumCategorys?name=${curriculumCategory.name}`)
            .expect(httpStatus.OK)
            .then((res) => {
                expect(res.body).to.be.an('array');
                done();
            })
            .catch(done);
        });
      });

      describe('# DELETE /api/curriculumCategorys', () => {
        it('should delete the curriculumCategory', (done) => {
          request(app)
            .delete(`/api/curriculumCategorys/${curriculumCategory._id}`)
            .expect(httpStatus.OK)
            .then((res) => {
              expect(res.body.name).to.equal(curriculumCategory.name);
              done();
            })
            .catch(done);
        });
      });
  
});