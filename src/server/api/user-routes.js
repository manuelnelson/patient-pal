import express from 'express';
import validate from 'express-validation';
import paramValidation from '../config/user-validation';
import {UserCtrl, AuthCtrl} from '../controllers';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/users - Get list of users */
  .get(AuthCtrl.verifyToken, UserCtrl.list)

  /** POST /api/users - Create new user */
  //.post(UserCtrl.create);
  .post(validate(paramValidation.createUser), UserCtrl.create);

router.route('/:userId')
  /** GET /api/users/:userId - Get user */
  .get(AuthCtrl.verifyToken, UserCtrl.get)

  /** PUT /api/users/:userId - Update user */
  .put(AuthCtrl.verifyToken, validate(paramValidation.updateUser), UserCtrl.update)

  /** DELETE /api/users/:userId - Delete user */
  .delete(AuthCtrl.verifyToken, UserCtrl.remove);

/** Load user when API with userId route parameter is hit */
router.param('userId', UserCtrl.load);

export default router;
