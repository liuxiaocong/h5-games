/**
 * Created by a on 14-2-3.
 */
Array.prototype.unique   =   function()
{
    var   a   =   {};
    for(var   i=0;   i<this.length;   i++){
        if(typeof a[this[i]] == "undefined")
            a[this[i]] = 1;
    }
    this.length = 0;
    for(var i in a)
        this[this.length] = i;
    return this;
}