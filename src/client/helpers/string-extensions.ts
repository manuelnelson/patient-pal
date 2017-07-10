declare global  {
    interface String{
        ensureSpacingInTime(this: string): string;
    }
}

//JS dates don't like 8:00pm, but respects 8:00pm for example...this guarantees spacing
//there and not making user worry about it during input
String.prototype.ensureSpacingInTime = function(this : string){
    let ampm = /([am|pm|AM|PM])/;
    const ndx = ampm.exec(this).index;
    let timeString = this.slice(0,ndx) + " " + this.slice(ndx, this.length);
    return timeString.replace("  ", " ");
}

export {}
