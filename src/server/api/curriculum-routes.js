import express from 'express';
import validate from 'express-validation';
import paramValidation from '../config/curriculum-validation';
import { CurriculumCtrl, AuthCtrl} from '../controllers';
const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/curriculums - Get list of curriculums */
  .get(AuthCtrl.verifyToken, (req,res,next) => CurriculumCtrl.list(req,res,next).then(curriculums => res.json(curriculums))) 

  /** POST /api/curriculums - Create new curriculum */
  .post(AuthCtrl.verifyToken, validate(paramValidation.createCurriculum), (req,res,next) => CurriculumCtrl.create(req,res,next).then(curriculum => res.json(curriculum)))
  //.post(AuthCtrl.verifyToken,CurriculumCtrl.create);
  // .post(validate(paramValidation.createUser), CurriculumCtrl.create);

router.route('/:id')
  /** GET /api/curriculums/:id - Get curriculum */
  .get(AuthCtrl.verifyToken, (req,res,next) => res.json(CurriculumCtrl.get(req,res,next)))

  /** PUT /api/curriculums/:id - Update curriculum */
  .put(AuthCtrl.verifyToken, (req,res,next) => CurriculumCtrl.update(req,res,next).then(curriculum => res.json(curriculum)))

  /** DELETE /api/curriculums/:id - Delete curriculum */
  .delete(AuthCtrl.verifyToken, (req,res,next) => CurriculumCtrl.remove(req,res,next).then(curriculum => res.json(curriculum)));

router.route('/search/:keyword')
  /** GET /api/skills/search/:keyword - search skills */
  .get(CurriculumCtrl.search);
  /** Load user when API with userId route parameter is hit */
router.param('id', CurriculumCtrl.load);

export default router;
