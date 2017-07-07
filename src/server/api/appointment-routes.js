import express from 'express';
import validate from 'express-validation';
import paramValidation from '../config/user-validation';
import {ApptCtrl, AuthCtrl} from '../controllers';
const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/users - Get list of users */
  .get(ApptCtrl.list)

  /** POST /api/users - Create new user */
  //new professionals only created through user controller.
  .post(ApptCtrl.create);
  // .post(validate(paramValidation.createUser), ApptCtrl.create);

// router.route('/:email')
//   /** GET /api/users/:email - Get user */
//   .get(ApptCtrl.get)
//
//   /** PUT /api/users/:userId - Update user */
//   .put(validate(paramValidation.updateUser), ApptCtrl.update)
//
//   /** DELETE /api/users/:email - Delete user */
//   .delete(ApptCtrl.remove);

/** Load user when API with userId route parameter is hit */
router.param('id', ApptCtrl.load);

export default router;
