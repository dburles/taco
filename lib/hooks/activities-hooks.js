Activities.before.insert(function (userId, doc) {
    doc.createdAt = Date.now();
    doc.createdBy = userId;
    doc.updatedAt = Date.now();
    doc.updatedBy = userId;

    if(doc.type.indexOf('Step') > -1){
        var parentStage = Activities.findOne(doc.stageId);
        doc.stageName = parentStage.title;
    }

    if(doc.transactionId){
        var parentTransaction = Transactions.findOne(doc.transactionId);
        doc.client = parentTransaction.client;
    }



});

Activities.before.update(function (userId, doc, fieldNames, modifier, options) {
    modifier.$set = modifier.$set || {};
    modifier.$set.updatedAt = Date.now();
});