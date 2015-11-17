ApplicationHelpers = {
    transactionProfileOptions: function(){
        var team = Profile.Team();

        if(team.transactionProfiles) {
            var profileList =  team.transactionProfiles.map(function(val) {
                return {label: val.name, value: val.name}
            })
            return profileList;
        }
    },
    ClientProfiles: function(){
        var team = Profile.Team();
        //debugger;
        if(team)
            return team.contactProfiles;
        else
            return [];
    },
    Roles: function(){
        return this.ClientProfiles().map(function(value){
            return {name: pluralize(value.name,1)};
        })
    },

    LeadSourceOptions: function(){
        return Profile.Team().leadSourceTypes.map(function(val){
            return {label:val, value:val};
        })
    },



    MaritalStatuses: function(){
        return [
            {name: 'Single'},
            {name: 'Married'},
            {name: 'Defacto'}
        ]
    },

    MaritalStatusOptions: function(){
        return this.MaritalStatuses().map(function(item){
            return {label:item.name, value:item.name};
        })
    },

    AddressTypes: function(){
        return [
            {name: 'Current'},
            {name: 'Previous'},
            {name: 'Postal'}
        ]
    },

    AddressTypeOptions: function(){
        return this.AddressTypes().map(function(item){
            return {label:item.name, value:item.name};
        })
    },

    EmploymentTypes: function(){
        return [
            {name: 'Primary'},
            {name: 'Previous'},
            {name: 'Secondary'}
        ]
    },

    EmploymentTypeOptions: function(){
        return this.EmploymentTypes().map(function(item){
            return {label:item.name, value:item.name};
        })
    },

    Months: function(){
        return [
            {name: 'January'},
            {name: 'February'},
            {name: 'March'},
            {name: 'April'},
            {name: 'May'},
            {name: 'June'},
            {name: 'July'},
            {name: 'August'},
            {name: 'September'},
            {name: 'October'},
            {name: 'November'},
            {name: 'December'}
        ]
    },

    MonthOptions: function(){
        return this.Months().map(function(item){
            var month = item.name.substr(0,3);
            return {label:month, value:month};
        })
    },

    RecentYears: function(){
        var years = [];
        var year = new Date().getFullYear();
        for(var n=0; n<10;n++){
            years.push({name:(year - n).toString()});
        }
        return years;
    },

    RecentYearOptions: function(){
        return this.RecentYears().map(function(item){
            return {label:item.name, value:item.name};
        })
    }





}




