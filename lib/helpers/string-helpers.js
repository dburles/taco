String.prototype.shorten = function(length){
    if(this.length <= length)
        return this;

    return this.substring(0,length - 3) + '...';
}
//String.prototype.nullIfEmpty = function(){
//    if(this)
//        return this;
//    else
//        return null;
//}