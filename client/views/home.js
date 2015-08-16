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
    },
    searchText: function() {

        return Session.get("searchText");
    }

});

Template.home.events({


    'keyup #txtContactSearch': function (e, t) {
        event.preventDefault();
        Session.set("searchText", $("#txtContactSearch").val());
    },
    'click #callContactMenu': function (e, t) {
        e.preventDefault();
        Session.set("oneContact", this);
        Modal.show('callModal');
    },
    'click #newTransactionMenu': function (e, t) {
        e.preventDefault();

        var transactionContext = {
            clientNames: this.fullName()
        }

        Modal.show('transactionModal', transactionContext);
    },
    'click #editContactMenu': function (e, t) {
        e.preventDefault();

        Session.set("editingContact", this._id);
        debugger;
        Modal.show('contactModal');
    },
    'click #emailContactMenu': function (e, t) {
        e.preventDefault();
        var emailId = Emails.insert({
            subject: "test subject"
        });
        emailSending = Emails.findOne(emailId);
        Modal.show('emailModal');
    },
    'click #createCoupleMenu': function (e, t) {
        e.preventDefault();
        //Session.set("action", "newContact");
        var selectedContacts = Session.get("selectedContacts");
        if(selectedContacts.length == 2){
            Meteor.call('createCouple', selectedContacts[0], selectedContacts[1])
        }
    },
    'click #divorceMenu': function (e, t) {
        e.preventDefault();
        var contactId = this._id;
        bootbox.confirm("Are you sure you want to bust these 2 up?", function(result) {
            if(result)
                Meteor.call('divorce', contactId);
        });

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
        e.preventDefault();
        //Session.set("action", "newContact");
        Session.set("editingContact");
        Modal.show('contactModal');
    },
    'click #viewSelectedMenu': function (e, t) {
        e.preventDefault();
        //Session.set("action", "newContact");
        Session.set("searchText", "selected");
    },
    'click #clearSelectionMenu': function (e, t) {
        e.preventDefault();
        if(Session.get("searchText") == "selected")
            Session.set("searchText");
        Session.set("selectedContacts", []);
    }

});

Template.home.onCreated(function () {

    // Use this.subscribe inside onCreated callback

    var self = this;

    self.autorun(function () {
        var searchText = Session.get("searchText");
        if(searchText == "selected"){
            var selectedContacts = Session.get("selectedContacts");
            self.subscribe('contactsSelected', selectedContacts);
        }
        else
            self.subscribe('contactsSearch', searchText);
    });

});







