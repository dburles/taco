Meteor.publish("mortgages", function(){
    return Mortgages.find();
})

Meteor.publish("mortgagesForTransaction", function(transactionId){
    return Mortgages.find({transactionId:transactionId});
})
