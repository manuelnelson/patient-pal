import express from 'express';
import validate from 'express-validation';
import paramValidation from '../config/user-validation';
import { SkillDataCtrl, AuthCtrl} from '../controllers';
const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/skillDatas - Get list of skillDatas */
  .get(SkillDataCtrl.list)

  /** POST /api/skillDatas - Create new skillData */
  .post(AuthCtrl.verifyToken,SkillDataCtrl.create);
  // .post(validate(paramValidation.createUser), SkillDataCtrl.create);

router.route('/:id')
  /** GET /api/skillDatas/:id - Get skillData */
  .get(SkillDataCtrl.get)

  /** PUT /api/skillDatas/:id - Update skillData */
  .put(SkillDataCtrl.update)

  /** DELETE /api/skillDatas/:id - Delete skillData */
  .delete(SkillDataCtrl.remove);

/** Load user when API with userId route parameter is hit */
router.param('id', SkillDataCtrl.load);

export default router;
