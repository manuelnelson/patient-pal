import express from 'express';
import validate from 'express-validation';
import paramValidation from '../config/user-validation';
import { MasteredSkillCtrl, AuthCtrl} from '../controllers';
const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/masteredSkills - Get list of masteredSkills */
  .get((req,res,next) => MasteredSkillCtrl.list(req,res,next).then(masteredSkills => res.json(masteredSkills)))

  /** POST /api/masteredSkills - Create new masteredSkill */
  .post((req,res,next) => MasteredSkillCtrl.create(req,res,next).then(masteredSkill => res.json(masteredSkill)))
  //.post(AuthCtrl.verifyToken,MasteredSkillCtrl.create);
  // .post(validate(paramValidation.createUser), MasteredSkillCtrl.create);

router.route('/:id')
  /** GET /api/masteredSkills/:id - Get masteredSkill */
  .get((req,res,next) => res.json(MasteredSkillCtrl.get(req,res,next)))

  /** PUT /api/masteredSkills/:id - Update masteredSkill */
  .put((req,res,next) => MasteredSkillCtrl.update(req,res,next).then(masteredSkill => res.json(masteredSkill)))

  /** DELETE /api/masteredSkills/:id - Delete masteredSkill */
  .delete((req,res,next) => MasteredSkillCtrl.remove(req,res,next).then(masteredSkill => res.json(masteredSkill)));

/** Load user when API with userId route parameter is hit */
router.param('id', MasteredSkillCtrl.load);

export default router;
