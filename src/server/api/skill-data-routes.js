import express from 'express';
import validate from 'express-validation';
import paramValidation from '../config/skill-data-validation';
import { SkillDataCtrl, AuthCtrl} from '../controllers';
const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/skillDatas - Get list of skillDatas */
  .get(AuthCtrl.verifyToken, (req,res,next) => SkillDataCtrl.list(req,res,next).then(skillDatas => res.json(skillDatas)))

  /** POST /api/skillDatas - Create new skillData */
  .post(AuthCtrl.verifyToken, validate(paramValidation.createSkillData), (req,res,next) => SkillDataCtrl.create(req,res,next).then(skillData => res.json(skillData)))
  //.post(AuthCtrl.verifyToken,SkillDataCtrl.create);
  // .post(validate(paramValidation.createUser), SkillDataCtrl.create);

router.route('/:id')
  /** GET /api/skillDatas/:id - Get skillData */
  .get(AuthCtrl.verifyToken, (req,res,next) => res.json(SkillDataCtrl.get(req,res,next)))

  /** PUT /api/skillDatas/:id - Update skillData */
  .put(AuthCtrl.verifyToken, (req,res,next) => SkillDataCtrl.update(req,res,next).then(skillData => res.json(skillData)))

  /** DELETE /api/skillDatas/:id - Delete skillData */
  .delete(AuthCtrl.verifyToken, (req,res,next) => SkillDataCtrl.remove(req,res,next).then(skillData => res.json(skillData)));

/** Load user when API with userId route parameter is hit */
router.param('id', SkillDataCtrl.load);

export default router;
