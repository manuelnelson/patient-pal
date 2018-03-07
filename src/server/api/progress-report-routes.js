import express from 'express';
import validate from 'express-validation';
import paramValidation from '../config/user-validation';
import { ProgressReportCtrl, AuthCtrl} from '../controllers';
const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/progressReports - Get list of progressReports */
  .get((req,res,next) => ProgressReportCtrl.list(req,res,next).then(progressReports => res.json(progressReports)))

  /** POST /api/progressReports - Create new progressReport */
  .post((req,res,next) => ProgressReportCtrl.create(req,res,next).then(progressReport => res.json(progressReport)))
  //.post(AuthCtrl.verifyToken,ProgressReportCtrl.create);
  // .post(validate(paramValidation.createUser), ProgressReportCtrl.create);

router.route('/:id')
  /** GET /api/progressReports/:id - Get progressReport */
  .get((req,res,next) => res.json(ProgressReportCtrl.get(req,res,next)))

  /** PUT /api/progressReports/:id - Update progressReport */
  .put((req,res,next) => ProgressReportCtrl.update(req,res,next).then(progressReport => res.json(progressReport)))

  /** DELETE /api/progressReports/:id - Delete progressReport */
  .delete((req,res,next) => ProgressReportCtrl.remove(req,res,next).then(progressReport => res.json(progressReport)));

/** Load user when API with userId route parameter is hit */
router.param('id', ProgressReportCtrl.load);

export default router;
