Meteor.methods({
    completeTask: function (task) {
        Activities.update({_id: task._id}, {$set: {status: 'Completed'}});
        Activities.update({_id: task.stepId}, {$inc: {taskCompletedCount: 1}});

        var step = Activities.findOne(task.stepId)
        if(step && step.taskCompletedCount == step.taskCount)
            Activities.update({_id: step._id}, {$set: {status: 'Completed'}});
    },

    uncompleteTask: function (task) {
        Activities.update({_id: task._id}, {$set: {status: 'Outstanding'}});
        Activities.update({_id: task.stepId}, {$inc: {taskCompletedCount: -1}});

        var step = Activities.findOne(task.stepId)
        if(step && step.taskCompletedCount < step.taskCount)
            Activities.update({_id: step._id}, {$set: {status: 'Outstanding'}});
    },

    assignStep: function (stepId, contactId) {
        Activities.update({_id: stepId}, {$set: {assignedTo: contactId}});
    },

    notApplicable: function (task) {
        Activities.update({_id: task._id}, {$set: {status: 'Not Applicable'}});
        Activities.update({_id: task.stepId}, {$inc: {taskCompletedCount: 1}});

        var step = Activities.findOne(task.stepId)
        if(step && step.taskCompletedCount == step.taskCount)
            Activities.update({_id: step._id}, {$set: {status: 'Completed'}});
    },

    toggleStepStatus: function (step) {
        if(step.status == 'Completed')
            Activities.update({_id: step._id},{$set:{status:'Not Applicable'}});
        if(step.status == 'Not Applicable')
            Activities.update({_id: step._id},{$set:{status:'Outstanding'}});
        if(!step.status || step.status == 'Outstanding')
            Activities.update({_id: step._id},{$set:{status:'Completed'}});
    },

    deleteActivity: function (activity) {
        var activity = Activities.findOne(activity);

        //for tasks, reduce parent taskcount...

        if(activity.type && activity.type.indexOf('Task') > -1){
            Activities.update({_id: activity.stepId}, {$inc: {taskCount: -1}});
        }

        Activities.remove({_id: activity._id});
    },

    convertToTask: function (comment) {
        Activities.update({_id: comment._id},{
            $addToSet:{type:'Task'},
            $set:{status:'Outstanding'}
        });
        Activities.update({_id: comment._id},{$pull:{type:'Comment'}});

        Activities.update({_id: comment.stepId}, {$inc: {taskCount: 1}});
    },

    promoteToStep: function (task) {
        var parent = Activities.findOne(task.stepId);

        Activities.update({_id: task._id},{
            $addToSet:{type:'Step'},
            $set:{
                stepId:null,
                order:parent.order + 100
            }
        });
        Activities.update({_id: task._id},{$pull:{type:'Task'}});

        Activities.update({_id: task.stepId}, {$inc: {taskCount: -1}});
    },

    importantActivity: function (activity) {
        if(activity.type.indexOf('Important') < 0)
            Activities.update({_id: activity._id},{$addToSet:{type:'Important'}});
        else
            Activities.update({_id: activity._id},{$pull:{type:'Important'}});
    },

    shareActivity: function (activity) {
        if(activity.type == null)
            Activities.update({_id: activity._id},{$set:{type:[]}});

        if(activity.type.indexOf('Public') < 0)
            Activities.update({_id: activity._id},{$addToSet:{type:'Public'}});
        else
            Activities.update({_id: activity._id},{$pull:{type:'Public'}});
    }

})