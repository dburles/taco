Participants = new Meteor.Collection("participants");

//Roles.deny({
//    insert: function (userId, doc) {
//        doc.createdAt = new Date();
//        return false;
//    }
//})
//
//Roles.allow({
//    insert: function (userId, doc) {
//        return true;
//    }
//})
//
//Roles.allow({
//    remove: function (userId, doc) {
//        return true;
//    }
//})

Participants.attachSchema(new SimpleSchema({
    role: {
        type: String,
        label: "Role",
        max: 30,
        optional: true
    },
    transactionId: {
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
    contactId: {
        type: String,
        label: "C",
        max: 30,
        optional: true
    },
    contactName: {
        type: String,
        label: "Name",
        max: 50,
        optional: true
    }
}));
