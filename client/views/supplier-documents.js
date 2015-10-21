Template.supplierDocuments.helpers({
    suppliers: function() {
        return Contacts.find({profiles:'Supplier'},{sort:{name:1}});
    },
    title: function() {
        var supplier = FlowRouter.getQueryParam('supplier');
        return supplier || 'General Requirements';
    }
});

Template.supplierDocuments.events({
    'click .supplierMenuItem': function (e, t) {
        event.preventDefault();
        FlowRouter.setQueryParams({'supplier':this.name})
    },
    'click #generalMenuItem': function (e, t) {
        event.preventDefault();
        FlowRouter.setQueryParams({'supplier':null})
    }
});

Template.supplierDocuments.onCreated(function () {
    this.subscribe('suppliers');
});

Template.supplierDocuments.onRendered(function () {
    //do something...
});