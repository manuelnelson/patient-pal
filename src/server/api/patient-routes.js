import express from 'express';
import validate from 'express-validation';
import paramValidation from '../config/user-validation';
import { PatientCtrl, AuthCtrl} from '../controllers';
const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/users - Get list of users */
  .get(PatientCtrl.list)

  /** POST /api/users - Create new user */
  .post(AuthCtrl.verifyToken,PatientCtrl.create);
  // .post(validate(paramValidation.createUser), PatientCtrl.create);

router.route('/:userId')
  /** GET /api/users/:userId - Get user */
  .get(PatientCtrl.get)

  /** PUT /api/users/:userId - Update user */
  .put(PatientCtrl.update)

  /** DELETE /api/users/:userId - Delete user */
  .delete(PatientCtrl.remove);

/** Load user when API with userId route parameter is hit */
router.param('userId', PatientCtrl.load);

export default router;
