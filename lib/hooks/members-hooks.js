Members.before.insert(function (userId, doc) {
    doc.updatedAt = new Date();
    doc.updatedBy = userId;

    var contact = Contacts.findOne(doc.contactId);
    doc.contactName = contact.fullName();

    var transaction = Transactions.findOne(doc.transactionId);
    doc.transactionName = transaction.title;
    doc.transactionClient = transaction.client;
});