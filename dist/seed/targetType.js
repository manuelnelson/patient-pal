"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _models = require("../models");

function any() {
    return _models.TargetType.find();
}

function insert(name) {
    return new _models.TargetType({
        name: name
    }).save().then(function (newTargetType) {
        return newTargetType;
    });
}
var docArray = ["Anecdotal", "DTT", "Duration", "Echoic", "Fluency/Rate", "Frequency", "Quantity", "Task Analysis", "Whole/Partial Interval"];
function run(targets) {
    var promiseArray = [];
    if (targets.length == 0) {
        Promise.all(docArray.map(function (targetType) {
            return insert(targetType);
        })).then(function () {
            return console.log('Target Type Seed Complete');
        });
    }
}

exports.default = { any: any, run: run };
//# sourceMappingURL=targetType.js.map