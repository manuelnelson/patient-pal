import express from 'express';
import validate from 'express-validation';
import paramValidation from '../config/user-validation';
import { CurriculumCategoryCtrl, AuthCtrl} from '../controllers';
const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/curriculumcategories - Get list of curriculumcategories */
  .get((req,res,next) => CurriculumCategoryCtrl.list(req,res,next).then(curriculumcategories => res.json(curriculumcategories)))

  /** POST /api/curriculumcategories - Create new curriculumCategory */
  .post((req,res,next) => CurriculumCategoryCtrl.create(req,res,next).then(curriculumCategory => res.json(curriculumCategory)))
  //.post(AuthCtrl.verifyToken,CurriculumCategoryCtrl.create);
  // .post(validate(paramValidation.createUser), CurriculumCategoryCtrl.create);

router.route('/:id')
  /** GET /api/curriculumcategories/:id - Get curriculumCategory */
  .get((req,res,next) => res.json(CurriculumCategoryCtrl.get(req,res,next)))

  /** PUT /api/curriculumcategories/:id - Update curriculumCategory */
  .put((req,res,next) => CurriculumCategoryCtrl.update(req,res,next).then(curriculumCategory => res.json(curriculumCategory)))

  /** DELETE /api/curriculumcategories/:id - Delete curriculumCategory */
  .delete((req,res,next) => CurriculumCategoryCtrl.remove(req,res,next).then(curriculumCategory => res.json(curriculumCategory)));

router.route('/search/:keyword')
  /** GET /api/skills/search/:keyword - search skills */
  .get(AuthCtrl.verifyToken, (req,res,next) => CurriculumCategoryCtrl.search(req,res,next).then(skills => res.json(skills)));


/** Load user when API with userId route parameter is hit */
router.param('id', CurriculumCategoryCtrl.load);

export default router;
