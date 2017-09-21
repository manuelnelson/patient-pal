import express from 'express';
import validate from 'express-validation';
import paramValidation from '../config/user-validation';
import { OrganizationCtrl, AuthCtrl} from '../controllers';
const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/organizations - Get list of organizations */
  .get((req,res,next) => OrganizationCtrl.list(req,res,next).then(organizations => res.json({data: organizations})))

  /** POST /api/organizations - Create new organization */
  .post((req,res,next) => OrganizationCtrl.create(req,res,next).then(organization => res.json({data: organization})))
  //.post(AuthCtrl.verifyToken,OrganizationCtrl.create);
  // .post(validate(paramValidation.createUser), OrganizationCtrl.create);

router.route('/:id')
  /** GET /api/organizations/:id - Get organization */
  .get((req,res,next) => OrganizationCtrl.get(req,res,next).then(organization => res.json({data: organization})))

  /** PUT /api/organizations/:id - Update organization */
  .put((req,res,next) => OrganizationCtrl.update(req,res,next).then(organization => res.json({data: organization})))

  /** DELETE /api/organizations/:id - Delete organization */
  .delete((req,res,next) => OrganizationCtrl.remove(req,res,next).then(organization => res.json({data: organization})));

/** Load user when API with userId route parameter is hit */
router.param('id', OrganizationCtrl.load);

export default router;
