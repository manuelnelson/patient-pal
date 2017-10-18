import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../lib/APIError';
import validator from 'validator';
import bcrypt from 'bcrypt-nodejs';
import {BillingCtrl} from '../controllers';

const organizationSchema = new mongoose.Schema({
    name:{
        type: String,
    },
    email: {
        type: String
    },
    stripeCustomerId:{
        type: String
    },    
    stripeSourceId: {
        type: String        
    },
    stripeSubscriptionId: {
        type: String        
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

/**
* Statics
*/
organizationSchema.statics = {
    /**
    * Get organization
    * @param {ObjectId} id - The objectId of organization.
    * @returns {Promise<organization, APIError>}
    */
    get(id) {
        return this.findById(id)
        .exec()
        .then((organization) => {
            if (organization) {
                return organization;
            }
            else{
                const err = new APIError('No such organization exists!', httpStatus.NOT_FOUND);
                return Promise.reject(err);
            }
        });
    },

    /**
    * List organizations in descending order of 'createdAt' timestamp.
    * @param {number} skip - Number of organizations to be skipped.
    * @param {number} limit - Limit number of organizations to be returned.
    * @returns {Promise<organization[]>}
    */
    list({ skip = 0, limit = 50 } = {}) {
        return this.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .exec();
    }
};

/* before we create an organization, we need to make sure we have an account and subscription for it through stripe. */
organizationSchema.pre('save', function(next){
    // we do not want to lose the correct context of the keyword `this`, so let's cache it in a variable called organization
    let organization = this;
    /* if stripe customer doesn't exists, let's create it*/    
    if (!organization.stripeCustomerId){
        BillingCtrl.createCustomer({locals: {sessionUserEmail: organization.email}},{},next).then(customer => {
            this.stripeCustomerId = customer.id;
            let req = {body: {
                customer:customer.id,
            }};
            //create subscription
            BillingCtrl.createSubscription(req,{},next).then(subscription =>{
                this.stripeSubscriptionId = subscription.id;
                next();
            })
        })
    }
    else{
        next();
    }

});


export default mongoose.model('Organization', organizationSchema);
