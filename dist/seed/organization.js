'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _models = require('../models');

function noEmail() {
    return _models.Organization.find({ email: { $exists: false } });
}

function update(organization) {
    return _models.Professional.findOne({ organization: organization._id }).exec().then(function (professional) {
        console.log('tet');
        console.log(professional);
        if (professional) {
            organization.email = professional.email;
            return organization.save().then(function (savedOrganization) {
                return savedOrganization;
            });
        } else {
            return organization.remove().then(function (x) {
                return x;
            });
        }
    }).catch(function (e) {
        return console.log(e);
    });
}

function run(organizations) {
    var promiseArray = [];
    console.log(organizations);
    if (organizations.length != 0) {
        Promise.all(organizations.map(function (organization) {
            return update(organization);
        })).then(function () {
            return console.log('Stripe Information Added');
        });
    }
}

exports.default = { noEmail: noEmail, run: run };
//# sourceMappingURL=organization.js.map