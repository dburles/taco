AutoForm.hooks({
    createContactForm: {
        onSuccess: function () {
            Modal.hide("contactModal");
            toastr.success("Contact saved");
        }
    },
    createMemberForm: {
        onSuccess: function (formType, result) {
            Modal.hide("contactSelector");
            toastr.success("Contact saved");

            var group = FlowRouter.getQueryParam('group');
            var transactionId = FlowRouter.getParam('id');
            var role = pluralize(group, 1);

            Meteor.call('addMember', transactionId, result, role);
            Meteor.call('addContactToGroup', result, group);

        }
    },
    transactionForm: {
        onSuccess: function () {
            Modal.hide("transactionModal");
            toastr.success("Transaction saved");
        }
    },
    profileForm: {
        onSuccess: function () {
            history.back();
        }
    },

    stepForm: {
        onSuccess: function () {
            Modal.hide("stepModal");
            toastr.success("Step Saved");
        }
    }
});