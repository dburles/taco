Contacts.before.insert(function (userId, doc) {
    doc.updatedAt = Date.now();
    doc.updatedBy = userId;
});

Contacts.before.update(function (userId, doc, fieldNames, modifier, options) {
    modifier.$set = modifier.$set || {};
    modifier.$set.updatedAt = Date.now();
    modifier.$set.updatedBy = userId;
});

Contacts.after.update(function (userId, doc, fieldNames, modifier) {
    if (doc.name !== this.previous.name) {
        Members.update({contactId: doc._id}, {$set:{contactName: doc.name}}, {multi: true});


        Members.find({contactId: doc._id}).forEach(function(member){
            var transaction = Transactions.find({_id:member.transactionId});
            //not working....
            //console.log(transaction);
            //if(transaction)
            //    transaction.updateClientNames();
        });

    }
});

