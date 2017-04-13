import express from 'express';
import validate from 'express-validation';
import paramValidation from '../config/user-validation';
import patientCtrl from '../controllers/patient-controller';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/users - Get list of users */
  .get(patientCtrl.list)

  /** POST /api/users - Create new user */
  .post(patientCtrl.create);
  // .post(validate(paramValidation.createUser), patientCtrl.create);

router.route('/:patientId')
  /** GET /api/users/:userId - Get user */
  .get(patientCtrl.get)

  /** PUT /api/users/:userId - Update user */
  .put(validate(paramValidation.updateUser), patientCtrl.update)

  /** DELETE /api/users/:userId - Delete user */
  .delete(patientCtrl.remove);

/** Load user when API with userId route parameter is hit */
router.param('patientId', patientCtrl.load);

export default router;
