
Meteor.publish("oneProfile", function(userId){
    var profiles = Profiles.find({_id:userId});
    if(profiles.count() < 1)
        Profiles.insert({
            _id:userId
        })
    //Meteor._sleepForMs(5000);
    return profiles;
})

