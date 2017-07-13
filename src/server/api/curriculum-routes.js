import express from 'express';
import validate from 'express-validation';
import paramValidation from '../config/user-validation';
import { CurriculumCtrl, AuthCtrl} from '../controllers';
const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/curriculums - Get list of curriculums */
  .get(CurriculumCtrl.list)

  /** POST /api/curriculums - Create new curriculum */
  .post(AuthCtrl.verifyToken,CurriculumCtrl.create);
  // .post(validate(paramValidation.createUser), CurriculumCtrl.create);

router.route('/:id')
  /** GET /api/curriculums/:id - Get curriculum */
  .get(CurriculumCtrl.get)

  /** PUT /api/curriculums/:id - Update curriculum */
  .put(CurriculumCtrl.update)

  /** DELETE /api/curriculums/:id - Delete curriculum */
  .delete(CurriculumCtrl.remove);

router.route('/search/:keyword')
    /** GET /api/skills/search/:keyword - search skills */
    .get(CurriculumCtrl.search);

/** Load user when API with userId route parameter is hit */
router.param('id', CurriculumCtrl.load);

export default router;
