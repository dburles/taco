Transactions.before.insert(function (userId, doc) {
    doc.updatedAt = JSON.stringify(Date.now());
    doc.updatedBy = userId;
});

Transactions.after.insert(function (userId, doc) {
    SelectedContacts.find().forEach(function (contact) {
        Participants.insert({
            transactionId: doc._id,
            transactionName: doc.title,
            contactId: contact._id,
            contactName: contact.firstName + ' ' + contact.lastName
        });
    });
});