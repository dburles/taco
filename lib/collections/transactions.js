Transactions = new Meteor.Collection("transactions");

//Transactions.deny({
//    insert: function (userId, doc) {
//        doc.createdAt = new Date();
//        return false;
//    }
//})
//
//Transactions.allow({
//    insert: function (userId, doc) {
//        return true;
//    }
//})
//
//Transactions.allow({
//    remove: function (userId, doc) {
//        return true;
//    }
//})

transactionsSchema = new SimpleSchema({
    client: {
        type: String,
        label: "Client Name/s",
        max: 300,
        optional: false
    },
    title: {
        type: String,
        label: "Title",
        max: 100,
        optional: false
    },
    description: {
        type: String,
        label: "Description",
        max: 500,
        optional: true,
        autoform: {
            afFieldInput: {
                type: 'textarea',
                rows: 4
            }
        }
    }
});

Transactions.attachSchema(transactionsSchema);

Transactions.before.insert(function (userId, doc) {
    doc.updatedAt = Date.now();
    doc.updatedBy = userId;
});

Transactions.after.insert(function (userId, doc) {
    SelectedContacts.find().forEach(function (contact) {
        Participants.insert({
            transactionId: doc._id,
            transactionName: doc.title,
            contactId: contact._id,
            contactName: contact.firstName + ' ' + contact.lastName
        });
    });
});