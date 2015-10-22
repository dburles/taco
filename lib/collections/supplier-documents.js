SupplierDocuments = new Mongo.Collection("supplierDocuments");

//SupplierDocuments.deny({
//    insert: function (userId, doc) {
//        doc.createdAt = new Date();
//        return false;
//    }
//})
//
//SupplierDocuments.allow({
//    insert: function (userId, doc) {
//        return true;
//    }
//})
//
//SupplierDocuments.allow({
//    remove: function (userId, doc) {
//        return true;
//    }
//})


SupplierDocumentsSchema = new SimpleSchema({
    text: {
        type: String,
        optional: false
    },
    identifier:{
        type: String,
        optional: false
    },
    order: {
        type: Number,
        optional: true
    },
    checkItems:{
        type:[String],
        optional: true
    }
});

SupplierDocuments.attachSchema(SupplierDocumentsSchema);

SupplierDocuments.helpers({
    //fieldname: function() {
    //    return this.firstName + ' ' + this.lastName;
    //}
});




