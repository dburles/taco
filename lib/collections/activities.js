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
    title: {
        type: String,
        label: "Title",
        max: 100,
        optional: true
    },
    transactionId: {
        type: String,
        max: 30,
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
    updatedAt: {
        type: Date,
        optional: true
    },
    order: {
        type: Number,
        optional: true
    }
}));
