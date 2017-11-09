function buildQuery(req){
    if (Object.keys(req.query).length === 0) return {};
    var array = [];
    for (var key in req.query) {
        var obj = {};
        obj[key] = req.query[key];
        array.push(obj);
    }   
    //if one object, no need for array
    if(array.length == 1){
        return array[0];
    } 
    return {$and:array};

}

export default {buildQuery}