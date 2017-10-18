import express from 'express';
import validate from 'express-validation';
import paramValidation from '../config/user-validation';
import { AppointmentCtrl, AuthCtrl} from '../controllers';
const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/appointments - Get list of appointments */
  .get(AuthCtrl.verifyToken, (req,res,next) => AppointmentCtrl.list(req,res,next).then(appointments => res.json(appointments)))

  /** POST /api/appointments - Create new appointment */
  .post(AuthCtrl.verifyToken, (req,res,next) => AppointmentCtrl.create(req,res,next).then(appointment => res.json(appointment)))
  //.post(AuthCtrl.verifyToken,AppointmentCtrl.create);
  // .post(validate(paramValidation.createUser), AppointmentCtrl.create);

router.route('/:id')
  /** GET /api/appointments/:id - Get appointment */
  .get(AuthCtrl.verifyToken, (req,res,next) => res.json(AppointmentCtrl.get(req,res,next)))

  /** PUT /api/appointments/:id - Update appointment */
  .put(AuthCtrl.verifyToken, (req,res,next) => AppointmentCtrl.update(req,res,next).then(appointment => res.json(appointment)))

  /** DELETE /api/appointments/:id - Delete appointment */
  .delete(AuthCtrl.verifyToken, (req,res,next) => AppointmentCtrl.remove(req,res,next).then(appointment => res.json(appointment)));

/** Load user when API with userId route parameter is hit */
router.param('id', AppointmentCtrl.load);

export default router;
