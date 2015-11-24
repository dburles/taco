TaxHelpers = {
    calculateTax: function(grossIncome){
        if(grossIncome <= 18200)
            return 0;
        else if(grossIncome <= 37000)
            return (grossIncome - 18200) * .19;
        else if(grossIncome <= 80000)
            return 3572 + (grossIncome - 37000) * .325;
        else if(grossIncome <= 180000)
            return 17547 + (grossIncome - 80000) * .37;
        else
            return 54547 + (grossIncome - 180000) * .45;
    },
    calculateMedicare: function(grossIncome){
        return grossIncome * .02;
    },
    calculateNetIncome: function(grossIncome){
        return grossIncome - this.calculateTax(grossIncome) - this.calculateMedicare(grossIncome);
    },
    grossUp: function(netIncome){
        for(var gross=netIncome; gross < netIncome * 2; gross += 10){
            if(Math.abs(calculateNetIncome(gross) - netIncome) <= 10)
                return gross;
        }
    }
}