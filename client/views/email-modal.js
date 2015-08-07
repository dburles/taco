Template.emailModal.helpers({
    emailSending: function () {
        return emailSending;
    },
    formType: function(){
        var editingContact = Session.get("editingContact");
        if(editingContact)
            return "update"
        else
            return "insert"
    }
});

Template.emailModal.events({
    'click #cancelEmail': function (e, t) {
        event.preventDefault();
        AutoForm.resetForm('emailForm');
        Modal.hide("emailModal");
    },
    'click #sendEmail': function (e, t) {
        //Session.set("editingContact");
    }
});