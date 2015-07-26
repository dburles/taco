$.fn.formatPhone = function() {
    this.on('blur', function(){
        var ph = $(this).val();
        ph = ph.replace(/\D/g,'');

        if(ph.substr(0,1) != '0' && ph.length == 8)
            ph = ph.substring(0,4) + " " + ph.substring(4,8);

        else if(ph.substr(0,2) == '04' && ph.length == 10)
            ph = ph.substring(0,4) + " " + ph.substring(4,7) + " " + ph.substring(7,11);

        else if((ph.substr(0,4) == '1300' || ph.substr(0,4) == '1800') && ph.length == 10)
            ph = ph.substring(0,4) + " " + ph.substring(4,7) + " " + ph.substring(7,11);

        else if(ph.substr(0,1) == '0' && ph.length == 10)
            ph = ph.substring(0,2) + " " + ph.substring(2,6) + " " + ph.substring(6,11);

        $(this).val(ph);
    })
};