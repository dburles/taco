Meteor.publish("activities", function(){
    return Activities.find();
})
Meteor.publish("clientDocuments", function(transactionId){
    return Activities.find({
        transactionId: transactionId,
        type: 'Client Document'
    });
})

Meteor.publish("stagesForTransaction", function(transactionId){
    return Activities.find({
        transactionId: transactionId,
        type: 'Stage'
    });
})

Meteor.publish("stepsForStage", function(stageId){

    //Meteor._sleepForMs(3000);
    return Activities.find({
        stageId: stageId,
        type: 'Step'
    });
})

Meteor.publish("stepsForTransaction", function(transactionId){
    return Activities.find({
        transactionId: transactionId,
        type: 'Step'
    });
})

//Meteor.publish("stepsForTransactionByType", function(transactionId, type){
//
//    return Activities.find({
//        transactionId: transactionId,
//        type: type
//    });
//})

Meteor.publish("sharedStepsForTransaction", function(transactionId){

    return Activities.find({
        transactionId: transactionId,
        $or:[{sharing:'Shared'},{sharing:'Shared All'}]
    });
})

Meteor.publish("stepsForStageName", function(transactionId, stageName){

    var doc = Activities.findOne({transactionId: transactionId, text:stageName});
    if(!doc){
        console.log('Cant find stage')
        return;
    }

    var stageId = doc._id;

    return Activities.find({
        stageId: stageId
    });
})

Meteor.publish("activitiesForStep", function(stepId){


    return Activities.find({
        stepId: stepId
    });
})

Meteor.publish("tasksSearch", function(search, view){

    var searchObj = {
        type: 'Step',
        due: {$exists:true}
    }

    return Activities.find(searchObj);
})




