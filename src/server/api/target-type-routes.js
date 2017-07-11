import express from 'express';
import validate from 'express-validation';
import paramValidation from '../config/user-validation';
import { TargetTypeCtrl, AuthCtrl} from '../controllers';
const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/targetTypes - Get list of targetTypes */
  .get(TargetTypeCtrl.list)

  /** POST /api/targetTypes - Create new targetType */
  .post(AuthCtrl.verifyToken,TargetTypeCtrl.create);
  // .post(validate(paramValidation.createUser), TargetTypeCtrl.create);

router.route('/:id')
  /** GET /api/targetTypes/:id - Get targetType */
  .get(TargetTypeCtrl.get)

  /** PUT /api/targetTypes/:id - Update targetType */
  .put(TargetTypeCtrl.update)

  /** DELETE /api/targetTypes/:id - Delete targetType */
  .delete(TargetTypeCtrl.remove);

/** Load user when API with userId route parameter is hit */
router.param('id', TargetTypeCtrl.load);

export default router;
