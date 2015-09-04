Meteor.publish("activities", function(){
    return Activities.find();
})
Meteor.publish("clientDocuments", function(transactionId){
    return Activities.find({
        transactionId: transactionId,
        type: 'Client Document'
    });
})

Meteor.publish("stagesForTransaction", function(transactionId){
    return Activities.find({
        transactionId: transactionId,
        type: 'Stage'
    });
})



