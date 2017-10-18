import {Appointment} from '../models';
import APIError from '../lib/APIError';
import httpStatus from 'http-status';
import Constants from '../lib/constants';
import {ProfessionalCtrl, OrganizationCtrl} from '../controllers';
import * as _ from 'lodash';
let stripe = require('stripe')('sk_test_6NSkvQScMlPpq0NdmHS4WiQf');

/**
* Get stripe customer based on organization id
* @returns {Customer}
*/
function getCustomer(req, res, next) {
    //get organization
    return OrganizationCtrl.getById(req,res,next, req.query.organizationId)
    .then(org => stripe.customers.retrieve(org.stripeCustomerId).then(customer => customer))
    .catch(e => next(e));

    //query customer
}

/**
* Creates a Stripe customer
* @returns {Customer}
*/
function createCustomer(req, res, next) {
   
    return stripe.customers.create({
        description: `Customer for ${req.locals.sessionUserEmail}`,
        email: req.locals.sessionUserEmail
    })
    .then((customer) => customer)
    .catch(e => next(e));
    
}

// Stripes Source is a payment source that is connected to a customer.
//https://stripe.com/docs/api/node#create_card
function createSource(req, res, next) {
    
     return stripe.customers.createSource(req.body.customer,{
         source: req.body.token,
     })
     .then((source) => {
         //update organization
         return OrganizationCtrl.getById(req,res,next, req.body.organizationId)
             .then(org => {                
                 return OrganizationCtrl.update({body:{stripeSourceId: source.id}, organization: org}, res, next)
                     .then(updatedOrg => source)
                     .catch(e => next(e));
             })
             .catch(e => next(e));
     })
     .catch(e => next(e));
     
 }
 
//  function createSubscription(req, res, next) {    
//      return stripe.customers.createSource(req.body.customer,{
//          source: req.body.token,
//      })
//      .then((source) => {
//          //update organization
//          return OrganizationCtrl.getById(req,res,next, req.body.organizationId)
//              .then(org => {                
//                  return OrganizationCtrl.update({body:{stripeSourceId: source.id}, organization: org}, res, next)
//                      .then(updatedOrg => source)
//                      .catch(e => next(e));
//              })
//              .catch(e => next(e));
//      })
//      .catch(e => next(e));     
//  }

function getSubscription(req,res,next){
    return stripe.subscriptions.retrieve(req.params.id)
        .then(subscription => subscription)
        .catch(e => next(e));
}

function updateSubscription(req,res,next){
    return stripe.subscriptions.update(req.query.subscriptionId, req.body)
        .then(subscription => subscription)
        .catch(e => next(e));

}

function createSubscription(req, res, next) {    
     return stripe.subscriptions.create({
         customer: req.body.customer,
         billing: 'send_invoice',
         "days_until_due": 31,
         items:[
             {
                 plan: "pl_default"
             }
         ]
     })
     .then((subscription) => subscription)
     .catch(e => next(e));
     
 }

export default { createCustomer, getCustomer, createSource, createSubscription, getSubscription, updateSubscription};
