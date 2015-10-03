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
    },
    'click #template-button': function (e, t) {
        var self = this;
        Modal.hide('stepModal');
        setTimeout(function(){
            Modal.show('templateModal', self);
        }, 500);

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