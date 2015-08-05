Template.contactModal.helpers({
    //editingContactDocument: function () {
    //    var editingContact = Session.get("editingContact");
    //    var editingContactDocument = Contacts.findOne(editingContact);
    //    console.log(editingContactDocument);
    //    return editingContactDocument;
    //},
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
        //Session.set("editingContact");
    },
    'click #sendEmail': function (e, t) {
        //Session.set("editingContact");
    }
});