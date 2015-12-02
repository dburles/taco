NumberHelpers = {
    randomNumber:function(min,max) {
        return Math.floor(Math.random()*(max-min+1)+min);
    },
    pmt: function(ir, np, pv, fv ) {
        /* ir - interest rate per month, np - number of periods (months), pv - present value, fv - future value (residual value) */
        fv = fv || 0;
        pmt = ( ir * ( pv * Math.pow ( (ir+1), np ) + fv ) ) / ( ( ir + 1 ) * ( Math.pow ( (ir+1), np) -1 ) );
        return pmt;
    },
    monthlyPayment: function(amount, rate, years){
        return Math.round(this.pmt(rate / 12 / 100, years * 12, amount));
    }
}

Number.prototype.formatMoney = function(c, d, t){
    var n = this,
        c = isNaN(c = Math.abs(c)) ? 2 : c,
        d = d == undefined ? "." : d,
        t = t == undefined ? "," : t,
        s = n < 0 ? "-" : "",
        i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "",
        j = (j = i.length) > 3 ? j % 3 : 0;
    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};