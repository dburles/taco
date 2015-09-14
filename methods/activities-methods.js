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
    }
})