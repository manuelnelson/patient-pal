import {TargetType} from '../models';

function any() {
    return TargetType.find();
}

function insert(name) {
    return new TargetType({
        name: name
    })
    .save()
    .then(newTargetType => newTargetType)
}
let docArray = [
    "Anecdotal",
    "DTT",
    "Duration",
    "Echoic",
    "Fluency/Rate",
    "Frequency",
    "Quantity",
    "Task Analysis",
    "Whole/Partial Interval"
]
function run(targets) {
    let promiseArray = [];
    if(targets.length == 0){
        Promise.all(
            docArray
                .map(targetType => insert(targetType))
        ).then(()=> console.log('Target Type Seed Complete'))
    }
}

export default {any, run}
