Template.templateModal.helpers({
    //templateTypeOptions: function() {
    //    return [
    //        {label: "Public", value: "Public"},
    //        {label: "Important", value: "Important"},
    //        {label: "template", value: "template"}
    //    ];
    //}
});

Template.templateModal.events({
    'click #cancel-template': function (e, t) {
        Modal.hide('templateModal');
    }
});

Template.templateModal.onCreated(function () {
    //var self = this;
    //self.autorun(function () {
    //    var groupName = FlowRouter.getQueryParam("group");
    //    self.subscribe('contactsSelected', selectedContacts);
    //});
});

Template.templateModal.onRendered(function () {
    //do something...
});