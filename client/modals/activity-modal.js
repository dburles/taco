Template.activityModal.helpers({
    activityTypeOptions: function() {
        return [
            {label: "Important", value: "Important"},
            {label: "Step", value: "Step"}
        ];
    }
});

Template.activityModal.events({
    'click #cancel-activity': function (e, t) {
        Modal.hide('activityModal');
    }
});

Template.activityModal.onCreated(function () {
    //var self = this;
    //self.autorun(function () {
    //    var groupName = FlowRouter.getQueryParam("group");
    //    self.subscribe('contactsSelected', selectedContacts);
    //});
});

Template.activityModal.onRendered(function () {
    //do something...
});