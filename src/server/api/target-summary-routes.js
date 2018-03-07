import express from 'express';
import validate from 'express-validation';
import paramValidation from '../config/user-validation';
import { TargetSummaryCtrl, AuthCtrl} from '../controllers';
const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/targetSummarys - Get list of targetSummarys */
  .get((req,res,next) => TargetSummaryCtrl.list(req,res,next).then(targetSummarys => res.json(targetSummarys)))

  /** POST /api/targetSummarys - Create new targetSummary */
  .post((req,res,next) => TargetSummaryCtrl.create(req,res,next).then(targetSummary => res.json(targetSummary)))
  //.post(AuthCtrl.verifyToken,TargetSummaryCtrl.create);
  // .post(validate(paramValidation.createUser), TargetSummaryCtrl.create);

router.route('/:id')
  /** GET /api/targetSummarys/:id - Get targetSummary */
  .get((req,res,next) => res.json(TargetSummaryCtrl.get(req,res,next)))

  /** PUT /api/targetSummarys/:id - Update targetSummary */
  .put((req,res,next) => TargetSummaryCtrl.update(req,res,next).then(targetSummary => res.json(targetSummary)))

  /** DELETE /api/targetSummarys/:id - Delete targetSummary */
  .delete((req,res,next) => TargetSummaryCtrl.remove(req,res,next).then(targetSummary => res.json(targetSummary)));

/** Load user when API with userId route parameter is hit */
router.param('id', TargetSummaryCtrl.load);

export default router;
