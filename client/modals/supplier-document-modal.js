Template.supplierDocumentModal.helpers({
    //contacts: function() {
    //    var id = FlowRouter.getParam("id");
    //    return Contacts.find({});
    //}
});

Template.supplierDocumentModal.events({
    'click #cancel-document-button': function (e, t) {
        event.preventDefault();
        Modal.hide('supplierDocumentModal');
    }
});

Template.supplierDocumentModal.onCreated(function () {
    //var self = this;
    //self.autorun(function () {
    //    var groupName = FlowRouter.getQueryParam("group");
    //    self.subscribe('contactsSelected', selectedContacts);
    //});
});

Template.supplierDocumentModal.onRendered(function () {
    //do something...
});