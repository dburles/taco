Meteor.publish("teams", function(){
    return Teams.find();
})

Meteor.publish("teamsForUser", function(){
    var thisContact =  Contacts.findOne({_id:this.userId});
    if(thisContact && thisContact.user){
        var teamNames = thisContact.user.teams;
        return Teams.find({name:{$in:teamNames}});
    }
})
