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
        return SupplierDocuments.find({supplier:supplier},{sort:{order:1}});
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
        var supplier = FlowRouter.getQueryParam('supplier')
        var doc = {supplier:supplier};
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
    setTimeout( function () {


        this.$('.sortable-documents').sortable({
            items: ".document-item:not(.unsortable)",
            stop: function(e, ui) {
                // get the dragged html element and the one before
                //   and after it
                el = ui.item.get(0)
                before = ui.item.prev().get(0)
                after = ui.item.next().get(0)

                //  Blaze.getData takes as a parameter an html element
                //    and will return the data context that was bound when
                //    that html element was rendered!
                var newRank;
                var beforeRank;
                var afterRank;
                if (!before) {
                    //if it was dragged into the first position grab the
                    // next element's data context and subtract one from the rank
                    newRank = Blaze.getData(after).order - 100 || Date.now();
                } else if (!after) {
                    //if it was dragged into the last position grab the
                    //  previous element's data context and add one to the rank
                    newRank = (Blaze.getData(before).order + 100) || Date.now()
                }
                else
                {
                    afterRank = Blaze.getData(after).order || Date.now();
                    beforeRank = Blaze.getData(before).order || Date.now();
                    newRank = Math.round( (beforeRank + afterRank) / 2);
                }


                //update the dragged Item's rank
                SupplierDocuments.update({_id: Blaze.getData(el)._id}, {$set: {order: newRank}})

            }
        });
    },100)
});