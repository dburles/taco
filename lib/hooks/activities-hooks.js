Activities.before.insert(function (userId, doc) {
    doc.updatedAt = Date.now();
    doc.updatedBy = userId;
});

Activities.before.update(function (userId, doc, fieldNames, modifier, options) {
    modifier.$set = modifier.$set || {};
    modifier.$set.updatedAt = Date.now();
});