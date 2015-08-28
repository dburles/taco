Contacts.before.insert(function (userId, doc) {
    doc.updatedAt = Date.now();
    doc.updatedBy = userId;
});

Contacts.before.update(function (userId, doc, fieldNames, modifier, options) {
    modifier.$set = modifier.$set || {};
    modifier.$set.updatedAt = Date.now();
});