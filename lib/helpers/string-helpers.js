String.prototype.shorten = function(length){
    if(this.length <= length)
        return this;

    return this.substring(0,length - 3) + '...';
}