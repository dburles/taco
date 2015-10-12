Teams = new Mongo.Collection("teams");

//Teams.deny({
//    insert: function (userId, doc) {
//        doc.createdAt = new Date();
//        return false;
//    }
//})
//
//Teams.allow({
//    insert: function (userId, doc) {
//        return true;
//    }
//})
//
//Teams.allow({
//    remove: function (userId, doc) {
//        return true;
//    }
//})


TeamsSchema = new SimpleSchema({
    name: {
        type: String,
        optional: true,
        max: 50
    },
    transactionProfiles:{
        type:[Object],
        optional: true
    },
    'transactionProfiles.$.name':{
        type:String
    },
    'transactionProfiles.$.category':{
        type:String,
        optional:true
    },
    leadSourceTypes:{
        type:[String],
        optional:true
    },
    contactProfiles:{
        type:[Object],
        optional:true
    },
    'contactProfiles.$.name':{
        type:String
    },
    'contactProfiles.$.transactionRole':{
        type:Boolean,
        optional:true
    }

});

Teams.attachSchema(TeamsSchema);

Teams.helpers({
    //fieldname: function() {
    //    return this.firstName + ' ' + this.lastName;
    //}
});




