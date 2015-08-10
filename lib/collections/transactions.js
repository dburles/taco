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