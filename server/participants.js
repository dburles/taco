Meteor.publish("participantsAll", function(){
    return Participants.find();
})
Meteor.publish("participantsForTransaction", function(transactionId){
    return Participants.find({
        transactionId: transactionId
    });
})

