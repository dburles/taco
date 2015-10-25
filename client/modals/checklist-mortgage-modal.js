Template.checklistMortgageModal.helpers({
    checklistSectionOptions: function() {
        var options = MortgageHelpers.ChecklistSectionOptions();
        return options;
    }
});

Template.checklistMortgageModal.events({
    'click #cancel-document-button': function (e, t) {
        event.preventDefault();
        Modal.hide('checklistMortgageModal');
    }
});

Template.checklistMortgageModal.onCreated(function () {
    //var self = this;
    //self.autorun(function () {
    //    var groupName = FlowRouter.getQueryParam("group");
    //    self.subscribe('contactsSelected', selectedContacts);
    //});
});

Template.checklistMortgageModal.onRendered(function () {
    //do something...
});