Template.contactModal.helpers({

    //no longer needed since passing object to modal...
    //editingContactDocument: function () {
    //    var editingContact = Session.get("editingContact");
    //    var editingContactDocument = Contacts.findOne(editingContact);
    //    console.log(editingContactDocument);
    //    return editingContactDocument;
    //},
    //formType: function(){
    //    var editingContact = Session.get("editingContact");
    //    if(editingContact)
    //        return "update"
    //    else
    //        return "insert"
    //}
});

Template.contactModal.events({
    'click #cancelContact': function (e, t) {
        event.preventDefault();
        AutoForm.resetForm('contactForm');
        Modal.hide("contactModal");
        //Session.set("editingContact");
    },
    'click #saveContact': function (e, t) {
        // see autoform hooks for closing modal
    }
});