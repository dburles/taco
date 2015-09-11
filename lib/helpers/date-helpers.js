DateHelpers = {
    beforeToday: function(date){
        var today = new Date();
        today.setHours(0,0,0,0);
        return date < today;
    }





}