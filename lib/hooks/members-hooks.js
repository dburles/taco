Members.before.insert(function (userId, doc) {
    doc.updatedAt = new Date();
    doc.updatedBy = userId;

    var contact = Contacts.findOne(doc.contactId);
    if(contact)
        doc.contactName = contact.name;

    var transaction = Transactions.findOne(doc.transactionId);
    if(transaction){
        doc.transactionName = transaction.title;
        doc.transactionClient = transaction.client;
    }
});

Members.after.insert(function (userId, doc) {
    //update name of transaction client...
    if(doc.role == 'Client'){
        var transaction = Transactions.findOne(doc.transactionId);
        if(transaction){
            transaction.updateClientNames();
        }
    }
});

Members.after.remove(function (userId, doc) {
    //update name of transaction client...
    if(doc.role == 'Client'){
        var transaction = Transactions.findOne(doc.transactionId);
        if(transaction){
            transaction.updateClientNames();
        }
    }
});

Members.after.update(function (userId, doc, fieldNames, modifier, options) {

});