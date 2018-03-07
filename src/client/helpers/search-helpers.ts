
function sortFn(x:String, y:String, ascendingOrder:boolean){
    if(x > y)
        return ascendingOrder ? 1 : -1;
    if(x < y)
        return ascendingOrder ? -1 : 1;
    return 0;
}

export {sortFn}
