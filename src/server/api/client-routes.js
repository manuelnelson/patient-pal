import express from 'express';
import validate from 'express-validation';
import paramValidation from '../config/client-validation';
import { ClientCtrl, AuthCtrl} from '../controllers';
const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/clients - Get list of clients */
  .get(AuthCtrl.verifyToken, (req,res,next) => ClientCtrl.list(req,res,next).then(clients => res.json(clients)))

  /** POST /api/clients - Create new client */
  .post(AuthCtrl.verifyToken, validate(paramValidation.createClient), (req,res,next) => ClientCtrl.create(req,res,next).then(client => res.json(client)))
  //.post(AuthCtrl.verifyToken,ClientCtrl.create);
  // .post(validate(paramValidation.createUser), ClientCtrl.create);

router.route('/:userId')
  /** GET /api/clients/:id - Get client */
  .get(AuthCtrl.verifyToken, (req,res,next) => res.json(ClientCtrl.get(req,res,next)))

  /** PUT /api/clients/:id - Update client */
  .put(AuthCtrl.verifyToken, (req,res,next) => ClientCtrl.update(req,res,next).then(client => res.json(client)))

  /** DELETE /api/clients/:id - Delete client */
  .delete(AuthCtrl.verifyToken, (req,res,next) => ClientCtrl.remove(req,res,next).then(client => res.json(client)));

router.route('/:userId/appointments')
  .get(AuthCtrl.verifyToken, (req,res,next) => ClientCtrl.getAppointments(req,res,next).then(appointments => res.json(appointments)))

/** Load user when API with userId route parameter is hit */
router.param('userId', ClientCtrl.load); 


export default router;
