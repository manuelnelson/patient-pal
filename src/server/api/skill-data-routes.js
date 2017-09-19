import express from 'express';
import validate from 'express-validation';
import paramValidation from '../config/user-validation';
import { SkillDataCtrl, AuthCtrl} from '../controllers';
const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/skillDatas - Get list of skillDatas */
  .get((req,res,next) => SkillDataCtrl.list(req,res,next).then(skillDatas => res.json({skillDatas: skillDatas})))

  /** POST /api/skillDatas - Create new skillData */
  .post((req,res,next) => {
    SkillDataCtrl.create(req,res,next).then(skill => res.json(skill))
  });

  // .post(validate(paramValidation.createUser), SkillDataCtrl.create);

router.route('/:id')
  /** GET /api/skillDatas/:id - Get skillData */
  .get((req,res,next) => {
    SkillDataCtrl.get(req,res,next).then(skill => res.json(skill))
  })

  /** PUT /api/abouts/:id - Update home */
  // .put((req,res,next) => {
  //   SkillDataCtrl.update(req,res,next).then(skill => res.json(skill))
  // })

  /** DELETE /api/abouts/:id - Delete home */
  // .delete((req,res,next) => {
  //     SkillDataCtrl.remove(req,res,next).then(skill => res.json(skill))
  // });

/** Load user when API with userId route parameter is hit */
router.param('id', SkillDataCtrl.load);

export default router;
