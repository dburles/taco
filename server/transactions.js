Meteor.publish("allTransactions", function(){
    return Transactions.find();
})

Meteor.publish("oneTransaction", function(id){
    return Transactions.find({_id:id});
})