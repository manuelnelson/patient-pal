import express from 'express';
import validate from 'express-validation';
import paramValidation from '../config/user-validation';
import { TargetTypeCtrl, AuthCtrl} from '../controllers';
const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/targetTypes - Get list of targetTypes */
  .get(AuthCtrl.verifyToken, (req,res,next) => TargetTypeCtrl.list(req,res,next).then(targetTypes => res.json(targetTypes)))

  /** POST /api/targetTypes - Create new targetType */
  .post(AuthCtrl.verifyToken, (req,res,next) => TargetTypeCtrl.create(req,res,next).then(targetType => res.json(targetType)))
  //.post(AuthCtrl.verifyToken,TargetTypeCtrl.create);
  // .post(validate(paramValidation.createUser), TargetTypeCtrl.create);

router.route('/:id')
  /** GET /api/targetTypes/:id - Get targetType */
  .get(AuthCtrl.verifyToken, (req,res,next) => res.json(TargetTypeCtrl.get(req,res,next)))

  /** PUT /api/targetTypes/:id - Update targetType */
  .put(AuthCtrl.verifyToken, (req,res,next) => TargetTypeCtrl.update(req,res,next).then(targetType => res.json(targetType)))

  /** DELETE /api/targetTypes/:id - Delete targetType */
  .delete(AuthCtrl.verifyToken, (req,res,next) => TargetTypeCtrl.remove(req,res,next).then(targetType => res.json(targetType)));

/** Load user when API with userId route parameter is hit */
router.param('id', TargetTypeCtrl.load);

export default router;
