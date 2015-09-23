DateHelpers = {
    compareDates: function(d1, d2){
    //debugger;

        if(!d1 || !d2) {
            //console.log('Compare dates failed');
            return false;
        }

        var same = (d1.getYear() == d2.getYear() &&
        d1.getMonth() == d2.getMonth() &&
        d1.getDate() == d2.getDate());

        //console.log('Comparing ' + d1 + ' with ' + d2 + '. Same is ' + same);

        return same;
    },
    beforeToday: function(date){
        var today = new Date();
        today.setHours(0,0,0,0);
        var before = (date < today)
        //console.log('Datehelpers:beforeToday returns ' + before + ' for date ' + date);
        return before;
    },
    colourForDate: function(date){
        var today = new Date();

        if(!date)
            return 'steel'
        else if(this.compareDates(date, today))
            return "orange"
        else if(this.beforeToday(date))
            return 'red';
        else
            return 'blue';
    }





}