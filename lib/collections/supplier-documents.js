SelectedSupplierDocuments = new Mongo.Collection(null);

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
    section: {
        type: String,
        optional: false
    },
    isSection: {
        type: Boolean,
        optional: true,
        label: 'Section Heading Only'
    },
    description: {
        type: String,
        label: "Description",
        max: 500,
        optional: true,
        autoform: {
            afFieldInput: {
                type: 'textarea',
                rows: 3
            }
        }
    },
    category:{
        type: String,
        optional: true
    },
    order: {
        type: Number,
        optional: true
    },
    checkItems:{
        type:[String],
        optional: true
    },
    alternativeItems:{
        type:[String],
        optional: true
    },
    supplier:{
        type: String,
        optional: true
    },
    downloadLink:{
        type: String,
        optional: true
    }
});

SupplierDocuments.attachSchema(SupplierDocumentsSchema);
SelectedSupplierDocuments.attachSchema(SupplierDocumentsSchema);

SupplierDocuments.helpers({
    //fieldname: function() {
    //    return this.firstName + ' ' + this.lastName;
    //}
});




