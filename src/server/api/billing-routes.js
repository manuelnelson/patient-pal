import express from 'express';
import validate from 'express-validation';
import paramValidation from '../config/user-validation';
import { BillingCtrl, AuthCtrl} from '../controllers';
const router = express.Router(); // eslint-disable-line new-cap

router.route('/customers')
  // /** GET /api/billing/client - Get list of organizations */
  .get(AuthCtrl.verifyToken, (req,res,next) => BillingCtrl.getCustomer(req,res,next).then(customer => res.json(customer)))

  /** POST /api/billing/customers - Create new organization */
  .post(AuthCtrl.verifyToken,(req,res,next) => BillingCtrl.createCustomer(req,res,next).then(customer => res.json(customer)))

router.route('/sources')

  /** POST /api/billing/customers - Create new organization */
  .post(AuthCtrl.verifyToken,(req,res,next) => BillingCtrl.createSource(req,res,next).then(customer => res.json(customer)))

router.route('/subscriptions')  
    /** POST /api/billing/subscriptions - Create new subscription */
    .post(AuthCtrl.verifyToken,(req,res,next) => BillingCtrl.createSubscription(req,res,next).then(subscription => res.json(subscription)))
router.route('/subscriptions/:id')
    /** GET /api/subscriptions/:id - Get subscription */
    .get(AuthCtrl.verifyToken, (req,res,next) => BillingCtrl.getSubscription(req,res,next).then(customer => res.json(customer)))

    /** PUT /api/subscriptions/:id - Update subscription */
    .put(AuthCtrl.verifyToken, (req,res,next) => BillingCtrl.updateSubscription(req,res,next).then(organization => res.json(organization)))

//   /** DELETE /api/organizations/:id - Delete organization */
//   .delete(AuthCtrl.verifyToken, (req,res,next) => OrganizationCtrl.remove(req,res,next).then(organization => res.json(organization)));

/** Load user when API with userId route parameter is hit */
// router.param('id', OrganizationCtrl.load);

export default router;
