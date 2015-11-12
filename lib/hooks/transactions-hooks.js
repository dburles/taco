Transactions.before.insert(function (userId, doc) {
    doc.updatedAt = new Date();
    doc.updatedBy = userId;
});

Transactions.after.insert(function (userId, doc) {

    //grab selected contacts, and create members to the transaction...

    SelectedContacts.find().forEach(function (contact) {
        Members.insert({
            transactionId: doc._id,
            transactionName: doc.text,
            contactId: contact._id,
            contactName: contact.firstName + ' ' + contact.lastName,
            role: 'Client'
        });
    });

    //create a mortgage profile...

    ProfileMortgages.insert({
        _id: doc._id
    })
});