Meteor.publish("supplierDocuments", function(){
    return SupplierDocuments.find();
})
