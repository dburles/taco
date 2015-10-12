Template.transactionModal.helpers({
    //profileOptions: function(){
    //    var allTypes = Profile.Team().transactionTypes;
    //    var allTypesArray = allTypes.map(function(item){
    //        return item.name;
    //    });
    //
    //    var myTypes = this.transaction.transactionTypes || [];
    //
    //    var profiles = [];
    //
    //    allTypes.forEach(function(typeItem){
    //        if(typeItem.profiles){                            //need help here, should cascade checkboxes:  && myTypes.indexOf(typeItem.name) > -1){
    //            typeItem.profiles.forEach(function(profile){
    //                profiles.push({label:profile, value:profile})
    //            })
    //        }
    //    })
    //    return profiles;
    //},
    //profileOptionsForType: function(){
    //    var profilesArray = [];
    //    debugger;
    //    this.profiles.forEach(function(typeItem){
    //        profilesArray.push({label:typeItem, value:typeItem})
    //    })
    //    return profilesArray;
    //},
    //availableTransactionTypes: function(){
    //    return Profile.Team().transactionTypes;
    //}
});

Template.transactionModal.events({
    'click #cancelTransaction': function (e, t) {
        event.preventDefault();
        AutoForm.resetForm('transactionForm');
        Modal.hide("transactionModal");
    },
    'click #saveTransaction': function (e, t) {

    }
});



//Template.transactionModal.helpers({
//    profileOptions: function(){
//        var allTypes = Profile.Team().transactionTypes;
//        var allTypesArray = allTypes.map(function(item){
//            return item.name;
//        });
//
//        var myTypes = this.transaction.transactionTypes || [];
//
//        var profiles = [];
//
//        allTypes.forEach(function(typeItem){
//            if(typeItem.profiles){                            //need help here, should cascade checkboxes:  && myTypes.indexOf(typeItem.name) > -1){
//                typeItem.profiles.forEach(function(profile){
//                    profiles.push({label:profile, value:profile})
//                })
//            }
//        })
//        return profiles;
//    }
//});