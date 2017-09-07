"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _models = require("../models");

function any() {
    return _models.DttType.find();
}

function insert(name) {
    return new _models.DttType({
        name: name
    }).save().then(function (newTargetType) {
        return newTargetType;
    });
}
var docArray = ["Independent", "Positional", "Gestural Prompt", "Spontaneous", "Verbal Prompt", "Modeling", "No Response", "Role Play"];

function run(dttTypes) {
    var promiseArray = [];
    if (dttTypes.length == 0) {
        Promise.all(docArray.map(function (targetType) {
            return insert(targetType);
        })).then(function () {
            return console.log('Discrete Trial Teaching Seed Complete');
        });
    }
}

exports.default = { any: any, run: run };
//# sourceMappingURL=dttType.js.map