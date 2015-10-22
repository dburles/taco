Template.supplierDocuments.helpers({
    suppliers: function() {
        return ['ANZ', 'CBA', 'ING Direct', 'Macquarie', 'NAB', 'Suncorp', 'Westpac']
    },
    title: function() {
        var supplier = FlowRouter.getQueryParam('supplier');
        return supplier || 'General Requirements';
    },
    documents: function() {
        var supplier = FlowRouter.getQueryParam('supplier');
        return SupplierDocuments.find({});
    }
});

Template.supplierDocuments.events({
    'click .supplierMenuItem': function (e, t) {
        event.preventDefault();
        FlowRouter.setQueryParams({'supplier': e.target.innerText})
    },
    'click #generalMenuItem': function (e, t) {
        event.preventDefault();
        FlowRouter.setQueryParams({'supplier':null})
    },
    'click #add-document-button': function(e,t){
        event.preventDefault();
        var doc = {};
        var supplierDocumentModalData = {
            type: "insert",
            doc: doc
        }

        Modal.show('supplierDocumentModal', supplierDocumentModalData);
    }
});

Template.supplierDocuments.onCreated(function () {
    var supplier = FlowRouter.getQueryParam('supplier');
    this.subscribe('supplierDocuments', supplier);
});

Template.documentItem.events({

    'click .document-item': function(e,t){
        event.preventDefault();
        var doc = {};
        var supplierDocumentModalData = {
            type: "update",
            doc: this
        }

        Modal.show('supplierDocumentModal', supplierDocumentModalData);
    }
});

Template.supplierDocuments.onRendered(function () {
    //do something...
});