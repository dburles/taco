AutoForm.hooks({
    createContactForm: {
        onSuccess: function () {
            Modal.hide("contactModal");
            toastr.success("Contact saved");
        }
    },
    transactionForm: {
        onSuccess: function () {
            Modal.hide("transactionModal");
            toastr.success("Transaction saved");
        }
    }
});