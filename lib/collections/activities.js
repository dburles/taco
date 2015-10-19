SelectedActivities = new Mongo.Collection(null);

Activities = new Mongo.Collection("activities");

//Activities.deny({
//    insert: function (userId, doc) {
//        doc.createdAt = new Date();
//        return false;
//    }
//})
//
//Activities.allow({
//    insert: function (userId, doc) {
//        return true;
//    }
//})
//
//Activities.allow({
//    remove: function (userId, doc) {
//        return true;
//    }
//})

Activities.attachSchema(new SimpleSchema({
    text: {
        type: String,
        max: 500,
        optional: true
    },
    assignedTo: {
        type: String,
        max: 30,
        optional: true
    },
    transactionId: {
        type: String,
        optional: true
    },
    stageId: {
        type: String,
        optional: true
    },
    stageName: {
        type: String,
        label: "Stage",
        max: 100,
        optional: true
    },
    stepId: {
        type: String,
        optional: true
    },
    parentId: {
        type: String,
        max: 30,
        optional: true
    },

    transactionName: {
        type: String,
        label: "Transaction",
        max: 100,
        optional: true
    },
    type: {
        type: [String],
        max: 50,
        optional: true
    },
    status: {
        type: String,
        max: 30,
        optional: true
    },
    completed: {
        type: Boolean,
        optional: true
    },
    due: {
        type: Date,
        optional: true
    },
    createdAt: {
        type: Date,
        optional: true
    },
    updatedAt: {
        type: Date,
        optional: true
    },
    order: {
        type: Number,
        optional: true
    },
    taskCount: {
        type: Number,
        optional: true
    },
    taskCompletedCount: {
        type: Number,
        optional: true
    },
    importProfile: {
        type: [String],
        max: 50,
        optional: true,
        autoform: {
            type: "select-checkbox",
            options: function () {
                return ApplicationHelpers.transactionProfileOptions();
            }
        }
    },
    excludeProfile: {
        type: [String],
        max: 50,
        optional: true,
        autoform: {
            type: "select-checkbox",
            options: function () {
                return ApplicationHelpers.transactionProfileOptions();
            }
        }


    },

    choices: {
        type: [Object],
        optional: true
    },

    "choices.$.text": {
        type: String,
        max: 15,
        optional:false
    },

    "choices.$.isDefault": {
        type: Boolean
    },

    //sharing....

    sharing:{
        type:Object,
        optional:true
    },
    'sharing.shared':{
        type:Boolean,
        label: 'This item is shared',
        optional:true
    },
    'sharing.subitems':{
        type:Boolean,
        label: 'Subitems under this are shared',
        optional:true
    },
    'sharing.applyExisting':{
        type:Boolean,
        label: 'Apply to existing subitems',
        optional:true
    }

}));


Activities.helpers({
    hasType: function(typeName) {
        return this.type.indexOf(typeName) > -1;
    }
});

