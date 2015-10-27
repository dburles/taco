Template.checklistMortgage.helpers({
    suppliers: function() {
        return ['ANZ', 'CBA', 'ING Direct', 'Macquarie', 'NAB', 'Suncorp', 'Westpac']
    },
    sections: function() {
        return MortgageHelpers.ChecklistSections();
    },
    title: function() {
        var supplier = FlowRouter.getQueryParam('supplier');
        return (supplier || 'Mortgage') + ' Checklist';
    },
    checklist: function() {
        //var supplier = FlowRouter.getQueryParam('supplier');
        return SelectedSupplierDocuments.find({section:this.name, notRequired: {$ne: true}},{sort:{order:1}});
    },
    checked: function(category) {
        debugger;
        var doc = SelectedSupplierDocuments.findOne({category:category});
        if (doc)
            return 'checked';
        else
            return '';
    },
    hideSections: function(){
        return Session.get('checklist-hide-sections') || false;
    },
    excludeChecklist: function() {
        //var supplier = FlowRouter.getQueryParam('supplier');
        return SelectedSupplierDocuments.find({notRequired:true},{sort:{order:1}});
    },
    alternativesChecklist: function() {
        //var supplier = FlowRouter.getQueryParam('supplier');
        return SelectedSupplierDocuments.find({alternativeItems: {$exists: true, $not: {$size: 0}}},{sort:{order:1}});
    }
});

Template.checklistMortgage.events({

    'click :checkbox': function (e, t) {
        var category = (e.target.parentNode.innerText);
        var checked = (e.target.checked);
        var supplier = FlowRouter.getQueryParam('supplier')

        if(checked){
            var doc = SupplierDocuments.findOne({category:category, supplier:supplier});
            if(!doc)
                doc = SupplierDocuments.findOne({category:category, supplier:null});
            if(doc)
                SelectedSupplierDocuments.insert(doc);
        } else {
            SelectedSupplierDocuments.remove({category:category});
        }



    },
    'click .supplierMenuItem': function (e, t) {
        event.preventDefault();
        FlowRouter.setQueryParams({'supplier': e.target.innerText})
    },
    'click #generalMenuItem': function (e, t) {
        event.preventDefault();
        FlowRouter.setQueryParams({'supplier':null})
    },
    'click .add-document-button': function(e,t){
        event.preventDefault();
        var supplier = FlowRouter.getQueryParam('supplier');
        var $el = $(e.target).closest('button');
        var section = $el.data('section');
        var doc = {supplier:supplier, section:section};
        var checklistMortgageModalData = {
            type: "insert",
            doc: doc
        }

        Modal.show('checklistMortgageModal', checklistMortgageModalData);
    },
    'keypress #custom-item': function (e, t) {
        if (e.which === 13) {

            SelectedSupplierDocuments.insert({
                section:'Miscellaneous',
                text:'Special Requirement',
                description: e.target.value
            })

            e.target.value = "";
            e.preventDefault();
        }
    },
    'click #hide-sections-checkbox': function (e, t) {
        Session.set('checklist-hide-sections', e.target.checked);
    }
});

Template.checklistMortgage.onCreated(function () {
    this.subscribe('supplierDocuments');
});

Template.supplierCheckItem.events({

    'click .edit-document-button': function(e,t){
        event.preventDefault();
        var doc = {};
        var checklistMortgageModalData = {
            type: "update",
            doc: this
        }

        Modal.show('checklistMortgageModal', checklistMortgageModalData);
    }
});

Template.checklistMortgage.onRendered(function () {
    //setTimeout( function () {
    //
    //
    //    this.$('.sortable-documents').sortable({
    //        items: ".document-item:not(.unsortable)",
    //        stop: function(e, ui) {
    //            // get the dragged html element and the one before
    //            //   and after it
    //            el = ui.item.get(0)
    //            before = ui.item.prev().get(0)
    //            after = ui.item.next().get(0)
    //
    //            //  Blaze.getData takes as a parameter an html element
    //            //    and will return the data context that was bound when
    //            //    that html element was rendered!
    //            var newRank;
    //            var beforeRank;
    //            var afterRank;
    //            if (!before) {
    //                //if it was dragged into the first position grab the
    //                // next element's data context and subtract one from the rank
    //                newRank = Blaze.getData(after).order - 100 || Date.now();
    //            } else if (!after) {
    //                //if it was dragged into the last position grab the
    //                //  previous element's data context and add one to the rank
    //                newRank = (Blaze.getData(before).order + 100) || Date.now()
    //            }
    //            else
    //            {
    //                afterRank = Blaze.getData(after).order || Date.now();
    //                beforeRank = Blaze.getData(before).order || Date.now();
    //                newRank = Math.round( (beforeRank + afterRank) / 2);
    //            }
    //
    //
    //            //update the dragged Item's rank
    //            SupplierDocuments.update({_id: Blaze.getData(el)._id}, {$set: {order: newRank}})
    //
    //        }
    //    });
    //},100)
});