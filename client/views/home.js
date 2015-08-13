emailSending = {};

Template.home.helpers({
    contacts: function() {
        return Contacts.find();
    },
    selectedBox: function() {
        var thisId = this._id;
        var selectedContacts = Session.get("selectedContacts");
        return (selectedContacts.indexOf(thisId) > -1) ? "selected-box": "";
    },
    selectedContactsCount: function() {
        var selectedContacts = Session.get("selectedContacts");
        return selectedContacts.length;
    },
    twoSelectedContacts: function() {
        var selectedContacts = Session.get("selectedContacts");
        return selectedContacts.length == 2 ? true : false;
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
    'click .selectable': function(e, t){
        var selectedContacts = Session.get("selectedContacts");
        if(!selectedContacts)
            selectedContacts = [];

        var ind = selectedContacts.indexOf(this._id);
        if(ind === -1)
            selectedContacts.push(this._id);
        else
            selectedContacts.splice(ind,1);

        Session.set("selectedContacts", selectedContacts);

    },
    'click #newContactButton': function (e, t) {
        event.preventDefault();
        //Session.set("action", "newContact");
        Session.set("editingContact");
        Modal.show('contactModal');
    },
    'click #clearSelectionMenu': function (e, t) {
        event.preventDefault();
        //Session.set("action", "newContact");
        Session.set("selectedContacts", []);
    }

});

Template.home.onCreated(function () {

    // Use this.subscribe inside onCreated callback

    var self = this;

    self.autorun(function () {
        self.subscribe('contactSearch', Session.get("searchText"));
    });
});





