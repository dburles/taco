Activities.before.insert(function (userId, doc) {
    doc.createdAt = Date.now();
    doc.createdBy = userId;
    doc.updatedAt = Date.now();
    doc.updatedBy = userId;

    if(doc.type.indexOf('Stage') > -1){
        doc.order = Date.now();
    }

    if(doc.type.indexOf('Step') > -1){
        doc.order = Date.now();
        var parentStage = Activities.findOne(doc.stageId);
        doc.stageName = parentStage.text;
        doc.taskCount = 0;
        doc.taskCompletedCount = 0;
        doc.status = 'Outstanding'
    }

    if(doc.type.indexOf('Task') > -1 ){
        doc.status = 'Outstanding';
        doc.taskCount = 0;
        doc.taskCompletedCount = 0;
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

//Activities.after.update(function (userId, doc, fieldNames, modifier) {
//    if (Meteor.isServer) {
//        if(this.previous.status !== 'Completed' && doc.status == 'Completed') {
//            //to finish...
//        }
//    }
//});