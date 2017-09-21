import express from 'express';
import validate from 'express-validation';
import paramValidation from '../config/user-validation';
import { ProfessionalCtrl, AuthCtrl} from '../controllers';
const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/users - Get list of users */
  .get(ProfessionalCtrl.list)

  /** POST /api/users - Create new user */
  //new professionals only created through user controller.
  .post(ProfessionalCtrl.create); 
  // .post(validate(paramValidation.createUser), ProfessionalCtrl.create);

router.route('/:userId')
  /** GET /api/users/:email - Get user */
  .get(ProfessionalCtrl.get)

  /** PUT /api/users/:userId - Update user */
  .put(ProfessionalCtrl.update)

  /** DELETE /api/users/:email - Delete user */
  .delete(ProfessionalCtrl.remove);

router.route('/:userId/appointments')
    .get(ProfessionalCtrl.getAppointments)
/** Load user when API with userId route parameter is hit */
router.param('userId', ProfessionalCtrl.load);

export default router;
