import express from 'express';
import validate from 'express-validation';
import paramValidation from '../config/user-validation';
import { DttTypeCtrl, AuthCtrl} from '../controllers';
const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/dttTypes - Get list of dttTypes */
  .get(DttTypeCtrl.list)

  /** POST /api/dttTypes - Create new dttType */
  .post(AuthCtrl.verifyToken,DttTypeCtrl.create);
  // .post(validate(paramValidation.createUser), DttTypeCtrl.create);

router.route('/:id')
  /** GET /api/dttTypes/:id - Get dttType */
  .get(DttTypeCtrl.get)

  /** PUT /api/dttTypes/:id - Update dttType */
  .put(DttTypeCtrl.update)

  /** DELETE /api/dttTypes/:id - Delete dttType */
  .delete(DttTypeCtrl.remove);

/** Load user when API with userId route parameter is hit */
router.param('id', DttTypeCtrl.load);

export default router;
