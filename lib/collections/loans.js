Loans = new Mongo.Collection("loans");

//Loans.deny({
//    insert: function (userId, doc) {
//        doc.createdAt = new Date();
//        return false;
//    }
//})
//
//Loans.allow({
//    insert: function (userId, doc) {
//        return true;
//    }
//})
//
//Loans.allow({
//    remove: function (userId, doc) {
//        return true;
//    }
//})


LoansSchema = new SimpleSchema({
    baseAmount: {
        type: Number
    },
    rate: {
        type: Number,
        optional: true
    },
    fixedTerm: {
        type: Number,
        optional: true,
        defaultValue:0
        //allowedValues: function(){
        //    return [0,1,2,3,4,5]
        //},
        //autoform: {
        //    options:MortgageHelpers.InitialTermOptions()
        //}
    },
    ioTerm: {
        type: Number,
        optional: true,
        defaultValue:0
        //allowedValues: function(){
        //    return [0,1,2,3,4,5]
        //},
        //autoform: {
        //    options:MortgageHelpers.InitialTermOptions()
        //}
    },
    term: {
        type: Number,
        optional: true,
        defaultValue:30
    }
});

Loans.attachSchema(LoansSchema);

Loans.helpers({
    //fieldname: function() {
    //    return this.firstName + ' ' + this.lastName;
    //}
});




