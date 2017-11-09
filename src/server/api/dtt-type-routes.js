import express from 'express';
import validate from 'express-validation';
import paramValidation from '../config/user-validation';
import { DttTypeCtrl, AuthCtrl} from '../controllers';
const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/dttTypes - Get list of dttTypes */
  .get( (req,res,next) => DttTypeCtrl.list(req,res,next).then(dttTypes => res.json(dttTypes)))

  /** POST /api/dttTypes - Create new dttType */
  .post(AuthCtrl.verifyToken, (req,res,next) => DttTypeCtrl.create(req,res,next).then(dttType => res.json(dttType)))
  //.post(AuthCtrl.verifyToken,DttTypeCtrl.create);
  // .post(validate(paramValidation.createUser), DttTypeCtrl.create);

router.route('/:id')
  /** GET /api/dttTypes/:id - Get dttType */
  .get(AuthCtrl.verifyToken, (req,res,next) => res.json(DttTypeCtrl.get(req,res,next)))

  /** PUT /api/dttTypes/:id - Update dttType */
  .put(AuthCtrl.verifyToken, (req,res,next) => DttTypeCtrl.update(req,res,next).then(dttType => res.json(dttType)))

  /** DELETE /api/dttTypes/:id - Delete dttType */
  .delete(AuthCtrl.verifyToken, (req,res,next) => DttTypeCtrl.remove(req,res,next).then(dttType => res.json(dttType)));

/** Load user when API with userId route parameter is hit */
router.param('id', DttTypeCtrl.load);

export default router;
