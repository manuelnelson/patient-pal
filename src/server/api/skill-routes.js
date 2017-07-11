import express from 'express';
import validate from 'express-validation';
import paramValidation from '../config/user-validation';
import { SkillCtrl, AuthCtrl} from '../controllers';
const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/skills - Get list of skills */
  .get(SkillCtrl.list)

  /** POST /api/skills - Create new skill */
  .post(AuthCtrl.verifyToken,SkillCtrl.create);
  // .post(validate(paramValidation.createUser), SkillCtrl.create);

router.route('/:id')
  /** GET /api/skills/:id - Get skill */
  .get(SkillCtrl.get)

  /** PUT /api/skills/:id - Update skill */
  .put(SkillCtrl.update)

  /** DELETE /api/skills/:id - Delete skill */
  .delete(SkillCtrl.remove);

/** Load user when API with userId route parameter is hit */
router.param('id', SkillCtrl.load);

export default router;
