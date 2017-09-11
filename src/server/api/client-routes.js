import express from 'express';
import validate from 'express-validation';
import paramValidation from '../config/user-validation';
import { ClientCtrl, AuthCtrl} from '../controllers';
const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/users - Get list of users */
  .get(ClientCtrl.list)

  /** POST /api/users - Create new user */
  .post(AuthCtrl.verifyToken,ClientCtrl.create);
  // .post(validate(paramValidation.createUser), ClientCtrl.create);

router.route('/:userId')
  /** GET /api/users/:userId - Get user */
  .get(ClientCtrl.get)

  /** PUT /api/users/:userId - Update user */
  .put(ClientCtrl.update)

  /** DELETE /api/users/:userId - Delete user */
  .delete(ClientCtrl.remove);

router.route('/:userId/appointments')
  .get(ClientCtrl.getAppointments)

/** Load user when API with userId route parameter is hit */
router.param('userId', ClientCtrl.load); 

export default router;
