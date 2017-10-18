import express from 'express';
import validate from 'express-validation';
import paramValidation from '../config/client-curriculum-validation';
import { ClientCurriculumCtrl, AuthCtrl} from '../controllers';
const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/clientCurriculums - Get list of clientCurriculums */
  .get(AuthCtrl.verifyToken, (req,res,next) => ClientCurriculumCtrl.list(req,res,next).then(clientCurriculums => res.json(clientCurriculums)))

  /** POST /api/clientCurriculums - Create new clientCurriculum */
  .post(AuthCtrl.verifyToken, validate(paramValidation.createClientCurriculum), (req,res,next) => ClientCurriculumCtrl.create(req,res,next).then(clientCurriculum => res.json(clientCurriculum)))
  //.post(AuthCtrl.verifyToken,ClientCurriculumCtrl.create);
  // .post(validate(paramValidation.createUser), ClientCurriculumCtrl.create);

router.route('/:id')
  /** GET /api/clientCurriculums/:id - Get clientCurriculum */
  .get(AuthCtrl.verifyToken, (req,res,next) => res.json(ClientCurriculumCtrl.get(req,res,next)))

  /** PUT /api/clientCurriculums/:id - Update clientCurriculum */
  .put(AuthCtrl.verifyToken, (req,res,next) => ClientCurriculumCtrl.update(req,res,next).then(clientCurriculum => res.json(clientCurriculum)))

  /** DELETE /api/clientCurriculums/:id - Delete clientCurriculum */
  .delete(AuthCtrl.verifyToken, (req,res,next) => ClientCurriculumCtrl.remove(req,res,next).then(clientCurriculum => res.json(clientCurriculum)));

/** Load user when API with userId route parameter is hit */
router.param('id', ClientCurriculumCtrl.load);

export default router;
