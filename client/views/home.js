

//Template.home.helpers({
//    contacts: function () {
//        return Contacts.find();
//    }
//});

Template.home.events({
    'keyup #txtContactSearch': function (e, t) {
        event.preventDefault();
        Session.set("searchText", $("#txtContactSearch").val());
    },
    'click #newContactMenu': function (e, t) {
        event.preventDefault();
        //Session.set("action", "newContact");
        Modal.show('contactModal');
    }

});

Template.newContact.events({
    'click #CancelContact': function (e, t) {
        event.preventDefault();
        Session.set("action");
    }
});

Template.contactModal.events({
    'click #CancelContact': function (e, t) {
        event.preventDefault();
        Modal.hide("contactModal")
    },
    'click #SaveContact': function (e, t) {
        //event.preventDefault();
        Modal.hide("contactModal")
    }
});

