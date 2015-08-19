emailSending = {};

Template.transactions.helpers({
    transactions: function() {
        return Transactions.find();
    }
});

Template.transactions.events({
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
    'click #newTransactionButton': function (e, t) {
        event.preventDefault();
        Modal.show('transactionModal');
    }

});

Template.transactions.onCreated(function () {

    // Use this.subscribe inside onCreated callback

    var self = this;

    self.autorun(function () {
        self.subscribe('allTransactions');
        self.subscribe('participantsAll');
    });
});






