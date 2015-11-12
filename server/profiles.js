
Meteor.publish("profile", function(profileId){
    var profiles = Profiles.find({_id:profileId});
    return profiles;
})

Meteor.publish("profileContacts", function(profileId){
    var docs = ProfileContacts.find({profileId:profileId});
    return docs;
})

Meteor.publish("profileProperties", function(profileId){
    var docs = ProfileProperties.find({profileId:profileId});
    return docs;
})

Meteor.publish("profileLiabilities", function(profileId){
    var docs = ProfileLiabilities.find({profileId:profileId});
    return docs;
})

Meteor.publish("profileIncomes", function(profileId){
    var docs = ProfileIncomes.find({profileId:profileId});
    return docs;
})

Meteor.publish("profileKids", function(profileId){
    var docs = ProfileKids.find({profileId:profileId});
    return docs;
})

Meteor.publish("profileMortgages", function(transactionId){
    var docs = ProfileMortgages.find({transactionId:transactionId});
    return docs;
})

Meteor.publish("profileAddresses", function(profileId){
    var docs = ProfileAddresses.find({profileId:profileId});
    return docs;
})

Meteor.publish("profileEmployments", function(profileId){
    var docs = ProfileEmployments.find({profileId:profileId});
    return docs;
})

