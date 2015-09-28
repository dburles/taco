Template.stepModal.helpers({
    stepTypeOptions: function() {
        return [
            {label: "Public", value: "Public"},
            {label: "Important", value: "Important"},
            {label: "Step", value: "Step"}
        ];
    }
});

Template.stepModal.events({
    'click #cancel-step': function (e, t) {
        Modal.hide('stepModal');
    }
});

Template.stepModal.onCreated(function () {
    //var self = this;
    //self.autorun(function () {
    //    var groupName = FlowRouter.getQueryParam("group");
    //    self.subscribe('contactsSelected', selectedContacts);
    //});
});

Template.stepModal.onRendered(function () {
    //do something...
});