Contacts.before.insert(function (userId, doc) {
    doc.updatedAt = JSON.stringify(Date.now());
    doc.updatedBy = userId;
});