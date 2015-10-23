SupplierDocuments.before.insert(function (userId, doc) {
    //doc.updatedAt = new Date();
    //doc.updatedBy = userId;
    if(!doc.order)
        doc.order = Date.now();
});

SupplierDocuments.after.insert(function (userId, doc) {
    //SelectedContacts.find().forEach(function (contact) {
    //    Members.insert({
    //        supplierDocumentId: doc._id,
    //        supplierDocumentName: doc.text,
    //        contactId: contact._id,
    //        contactName: contact.firstName + ' ' + contact.lastName,
    //        role: 'Client'
    //    });
    //});
});