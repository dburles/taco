AutoForm.hooks({
    createContactForm: {
        onSuccess: function () {
            Modal.hide("contactModal");
            toastr.success("Contact saved");
        }
    }
});