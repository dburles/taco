
Meteor.publish("profile", function(profileId){
    var profiles = Profiles.find({_id:profileId});
    return profiles;
})

Meteor.publish("profileContacts", function(profileId){
    var docs = ProfileContacts.find({profileId:profileId});
    return docs;
})

