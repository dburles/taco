Meteor.publish("allTransactions", function(){
    return Transactions.find();
})