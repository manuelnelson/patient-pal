import express from 'express';
import validate from 'express-validation';
import paramValidation from '../config/skill-validation';
import { SkillCtrl, AuthCtrl} from '../controllers';
const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/skills - Get list of skills */
  .get(AuthCtrl.verifyToken, (req,res,next) => SkillCtrl.list(req,res,next).then(skills => res.json(skills)))

  /** POST /api/skills - Create new skill */
  .post(AuthCtrl.verifyToken, validate(paramValidation.createSkill), (req,res,next) => SkillCtrl.create(req,res,next).then(skill => res.json(skill)))
  //.post(AuthCtrl.verifyToken,SkillCtrl.create);
  // .post(validate(paramValidation.createUser), SkillCtrl.create);

router.route('/:id')
  /** GET /api/skills/:id - Get skill */
  .get(AuthCtrl.verifyToken, (req,res,next) => res.json(SkillCtrl.get(req,res,next)))

  /** PUT /api/skills/:id - Update skill */
  .put(AuthCtrl.verifyToken, (req,res,next) => SkillCtrl.update(req,res,next).then(skill => res.json(skill)))

  /** DELETE /api/skills/:id - Delete skill */
  .delete(AuthCtrl.verifyToken, (req,res,next) => SkillCtrl.remove(req,res,next).then(skill => res.json(skill)));

router.route('/search/:keyword')
  /** GET /api/skills/search/:keyword - search skills */
  .get(AuthCtrl.verifyToken, (req,res,next) => SkillCtrl.search(req,res,next).then(skills => res.json(skills)));

/** Load user when API with userId route parameter is hit */
router.param('id', SkillCtrl.load);

export default router;
