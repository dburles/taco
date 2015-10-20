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

Activities.after.update(function (userId, doc, fieldNames, modifier) {

    //step must be shared if lower level is shared

    if(doc.sharing == 'Shared' && this.previous.sharing != 'Shared' && ActivitiesHelpers.isDetail(doc)){
        if(ActivitiesHelpers.parentStep(doc).sharing == 'None')
            Activities.update({_id:doc.stepId},{$set:{sharing:'Shared'}});
    }

    //step level cascades sharing for lower level activities

    if(Meteor.isServer){
        if(doc.sharing == 'Shared All' && this.previous.sharing != 'Shared All' && ActivitiesHelpers.hasType(doc, 'Step')){
            Activities.update({stepId:doc._id},{$set:{sharing:'Shared'}}, {multi: true});
        }
        if(doc.sharing == 'None' && this.previous.sharing != 'None' && ActivitiesHelpers.hasType(doc, 'Step')){
            Activities.update({stepId:doc._id},{$set:{sharing:'None'}}, {multi: true});
        }
    }



});