import express from 'express';
import validate from 'express-validation';
import paramValidation from '../config/user-validation';
import { AppointmentCtrl, AuthCtrl} from '../controllers';
const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/appointments - Get list of appointments */
  .get(AppointmentCtrl.list)

  /** POST /api/appointments - Create new appointment */
  .post(AuthCtrl.verifyToken,AppointmentCtrl.create);
  // .post(validate(paramValidation.createUser), AppointmentCtrl.create);

router.route('/:id')
  /** GET /api/appointments/:id - Get appointment */
  .get(AppointmentCtrl.get)

  /** PUT /api/appointments/:id - Update appointment */
  .put(AppointmentCtrl.update)

  /** DELETE /api/appointments/:id - Delete appointment */
  .delete(AppointmentCtrl.remove);

/** Load user when API with userId route parameter is hit */
router.param('id', AppointmentCtrl.load);

export default router;
