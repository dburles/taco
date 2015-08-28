Meteor.publish("members", function(){
    return Members.find();
})
Meteor.publish("membersForTransaction", function(transactionId){
    return Members.find({
        transactionId: transactionId
    });
})
Meteor.publish("membersForContact", function(contactId){
    //Meteor._sleepForMs(3000);
    return Members.find({
        contactId: contactId
    });
})

