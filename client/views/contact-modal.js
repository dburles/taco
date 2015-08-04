Template.contactModal.helpers({
    editingContactDocument: function () {
        var editingContact = Session.get("editingContact");
        var editingContactDocument = Contacts.findOne(editingContact);
        console.log(editingContactDocument);
        return editingContactDocument;
    },
    formType: function(){
        var editingContact = Session.get("editingContact");
        if(editingContact)
            return "update"
        else
            return "insert"
    }
});

Template.contactModal.events({
    'click #CancelContact': function (e, t) {
        event.preventDefault();
        AutoForm.resetForm('createContactForm');
        Modal.hide("contactModal");
    },
    'click #SaveContact': function (e, t) {
        //event.preventDefault();

    }
});