import express from 'express';
import validate from 'express-validation';
import paramValidation from '../config/user-validation';
import authCtrl from '../controllers/auth-controller';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/login')
  /** POST /api/auth/login - Create new user */
  .post(validate(paramValidation.login), authCtrl.login);

// router.route('/:userId')
//   /** GET /api/users/:userId - Get user */
//   .get(authCtrl.get)
//
//   /** PUT /api/users/:userId - Update user */
//   .put(validate(paramValidation.updateUser), authCtrl.update)
//
//   /** DELETE /api/users/:userId - Delete user */
//   .delete(authCtrl.remove);
//
// /** Load user when API with userId route parameter is hit */
// router.param('userId', authCtrl.load);

export default router;
