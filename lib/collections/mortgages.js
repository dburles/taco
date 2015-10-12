Mortgages = new Mongo.Collection("mortgages");

//Mortgages.deny({
//    insert: function (userId, doc) {
//        doc.createdAt = new Date();
//        return false;
//    }
//})
//
//Mortgages.allow({
//    insert: function (userId, doc) {
//        return true;
//    }
//})
//
//Mortgages.allow({
//    remove: function (userId, doc) {
//        return true;
//    }
//})


MortgagesSchema = new SimpleSchema({
    transactionId: {
        type: String
    },

    applications: {
        type: [Object],
        optional: true
    },

    'applications.$.loans': {
        optional:true,
        type: [Object]
    },

    'applications.$.loans.$.amount': {
        optional:true,
        type: Number,
        max: 100000000
    },
    profiles:{
        type: [String],
        max: 50,
        optional: true,
        autoform: {
            type: "select-checkbox",
            options: function () {
                return ApplicationHelpers.Profiles().map(function(s){
                    return {label:s, value:s};
                });
            }
        }

    }


});

Mortgages.attachSchema(MortgagesSchema);

Mortgages.helpers({
    //fieldname: function() {
    //    return this.firstName + ' ' + this.lastName;
    //}
});




