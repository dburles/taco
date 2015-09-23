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

    deleteActivity: function (activity) {
        var activity = Activities.findOne(activity);

        //for tasks, reduce parent taskcount...

        if(activity.type && activity.type.indexOf('Task') > -1){
            Activities.update({_id: activity.stepId}, {$inc: {taskCount: -1}});
        }

        Activities.remove({_id: activity._id});
    },

    convertToTask: function (comment) {
        Activities.update({_id: comment._id},{$addToSet:{type:'Task'}});
    }
})