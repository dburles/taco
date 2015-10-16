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

            var profile = FlowRouter.getQueryParam('profile');
            var transactionId = FlowRouter.getParam('id');
            var role = profile;

            Meteor.call('addMember', transactionId, result, role);
            Meteor.call('addContactToProfile', result, profile);

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
    },

    templateForm: {
        onSuccess: function () {
            Modal.hide("templateModal");
            toastr.success("Template Saved");
        }
    },

    sharingForm: {
        onSuccess: function () {
            $('#sharingButton').popover('hide');
            toastr.success("Sharing Settings Saved");
        }
    }
});