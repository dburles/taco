

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
    },
    'click .select-contact': function(e, t){
        var selectedContacts = Session.get("selectedContacts");
        if(!selectedContacts)
            selectedContacts = [];
        
        if(e.target.checked) {
            if(selectedContacts.indexOf(this._id) === -1)
                selectedContacts.push(this._id);

        } else {
            var ind = selectedContacts.indexOf(this._id);
            if(ind > -1)
                selectedContacts.splice(ind,1);
        }

        Session.set("selectedContacts", selectedContacts);

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

