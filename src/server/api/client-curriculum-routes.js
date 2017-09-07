import express from 'express';
import validate from 'express-validation';
import paramValidation from '../config/user-validation';
import { ClientCurriculumCtrl, AuthCtrl} from '../controllers';
const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/clientCurriculums - Get list of clientCurriculums */
  .get(ClientCurriculumCtrl.list)

  /** POST /api/clientCurriculums - Create new clientCurriculum */
  .post(AuthCtrl.verifyToken,ClientCurriculumCtrl.create);
  // .post(validate(paramValidation.createUser), ClientCurriculumCtrl.create);

router.route('/:id')
  /** GET /api/clientCurriculums/:id - Get clientCurriculum */
  .get(ClientCurriculumCtrl.get)

  /** PUT /api/clientCurriculums/:id - Update clientCurriculum */
  .put(ClientCurriculumCtrl.update)

  /** DELETE /api/clientCurriculums/:id - Delete clientCurriculum */
  .delete(ClientCurriculumCtrl.remove);

router.route('/client/:clientId')
  /** GET /api/clientCurriculums/:id - Get clientCurriculum */
  .get(ClientCurriculumCtrl.getByClient)

  /** Load user when API with userId route parameter is hit */
router.param('id', ClientCurriculumCtrl.load);

export default router;
