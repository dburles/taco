Meteor.publish("supplierDocuments", function(supplier){
    return SupplierDocuments.find();
})
