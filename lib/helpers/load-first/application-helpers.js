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
    }



}




