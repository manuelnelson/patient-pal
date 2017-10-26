import express from 'express';
import validate from 'express-validation';
import paramValidation from '../config/user-validation';
import { AuthCtrl } from '../controllers';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/login')
  /** POST /api/auth/login - Create new user */
  .post(validate(paramValidation.login), AuthCtrl.login)


router.route('/update/:email')
    //TODO: require hash from email to update password
  .put(AuthCtrl.updatePassword);

router.route('/forgot-password')
  //TODO: require hash from email to update password
  .post((req,res,next) => AuthCtrl.forgotPassword(req,res,next).then(message => {if(message) res.json(message)}));
// router.route('/:userId')
//   /** GET /api/users/:userId - Get user */
//   .get(AuthCtrl.get)
//
//   /** PUT /api/users/:userId - Update user */
//   .put(validate(paramValidation.updateUser), AuthCtrl.update)
//
//   /** DELETE /api/users/:userId - Delete user */
//   .delete(AuthCtrl.remove);
//
// /** Load user when API with userId route parameter is hit */
// router.param('userId', AuthCtrl.load);

export default router;
