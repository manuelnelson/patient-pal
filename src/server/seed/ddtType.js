import { DdtType } from '../models';


function any() {
    return DdtType.find();
}

function insert(name) {
    return new DdtType({
        name: name
    })
    .save()
    .then(newTargetType => newTargetType)
}
let docArray = [
    "Independent",
    "Positional",
    "Gestural Prompt",
    "Spontaneous",
    "Verbal Prompt",
    "Modeling",
    "No Response",
    "Role Play"
]

function run(ddtTypes){
    let promiseArray = [];
    if(ddtTypes.length == 0){
        Promise.all(
            docArray
                .map(targetType => insert(targetType))
        ).then(()=> console.log('Discrete Trial Teaching Seed Complete'))
    }
}

export default {any, run}
