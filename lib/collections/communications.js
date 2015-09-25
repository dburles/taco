Communications = new Mongo.Collection("communications");

//Communications.deny({
//    insert: function (userId, doc) {
//        doc.createdAt = new Date();
//        return false;
//    }
//})
//
//Communications.allow({
//    insert: function (userId, doc) {
//        return true;
//    }
//})
//
//Communications.allow({
//    remove: function (userId, doc) {
//        return true;
//    }
//})


CommunicationsSchema = new SimpleSchema({
    name: {
        type: String,
        max: 30
    },
    role: {
        type: String,
        max: 30,
        optional: true
    },
    type: {
        type: String,
        max: 30,
        optional: true
    },
    stage: {
        type: String,
        max: 30,
        optional: true
    },
    subject: {
        type: String,
        label: "Subject",
        max: 200,
        optional: true
    },
    body: {
        type: String,
        max: 5000,
        optional: true,
        autoform: {
            afFieldInput: {
                type: 'textarea',
                class: 'editor'
            }
        }
    }
});

Communications.attachSchema(CommunicationsSchema);

Communications.helpers({
    //fieldname: function() {
    //    return this.firstName + ' ' + this.lastName;
    //}
});




