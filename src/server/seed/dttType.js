import { DttType } from '../models';


function any() {
    return DttType.find();
}

function insert(name) {
    return new DttType({
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

function run(dttTypes){
    let promiseArray = [];
    if(dttTypes.length == 0){
        Promise.all(
            docArray
                .map(targetType => insert(targetType))
        ).then(()=> console.log('Discrete Trial Teaching Seed Complete'))
    }
}

export default {any, run}
