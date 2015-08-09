emailSending = {};

Template.home.helpers({
    contacts: function() {
        return Contacts.find();
    }
});

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
    'click #editContactMenu': function (e, t) {
        event.preventDefault();

        Session.set("editingContact", this._id);
        debugger;
        Modal.show('contactModal');
    },
    'click #emailContactMenu': function (e, t) {
        event.preventDefault();
        var emailId = Emails.insert({
            subject: "test subject"
        });
        emailSending = Emails.findOne(emailId);
        Modal.show('emailModal');
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

    },
    'click #newContactButton': function (e, t) {
        event.preventDefault();
        //Session.set("action", "newContact");
        Session.set("editingContact");
        Modal.show('contactModal');
    }

});

Template.home.onCreated(function () {
    // Use this.subscribe inside onCreated callback
    this.subscribe('contactSearch', Session.get("searchText"));
});






