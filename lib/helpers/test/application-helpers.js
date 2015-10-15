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
    //LeadSources: function(){
    //    return [
    //        {name: 'Client Referral'},
    //        {name: 'Business Referral'},
    //        {name: 'Personal Referral'},
    //        {name: 'Local Marketing'},
    //        {name: 'Head Office'}
    //    ];
    //},
    LeadSourceOptions: function(){
        return Profile.Team().leadSourceTypes.map(function(val){
            return {label:val, value:val};
        })
    }
    //TransactionTypeOptions: function(){
    //    return Profile.Team().transactionTypes.map(function(val){
    //        return {label:val.name, value:val.name};
    //    })
    //}

}




