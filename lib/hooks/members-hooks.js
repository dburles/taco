Members.before.insert(function (userId, doc) {
    doc.updatedAt = new Date();
    doc.updatedBy = userId;
});