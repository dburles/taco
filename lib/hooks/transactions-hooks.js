Transactions.before.insert(function (userId, doc) {
    doc.updatedAt = new Date();
    doc.updatedBy = userId;
});

Transactions.after.insert(function (userId, doc) {
    SelectedContacts.find().forEach(function (contact) {
        Members.insert({
            transactionId: doc._id,
            transactionName: doc.title,
            contactId: contact._id,
            contactName: contact.firstName + ' ' + contact.lastName
        });
    });
});