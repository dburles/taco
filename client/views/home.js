emailSending = {};

Template.home.helpers({
    contacts: function() {
        return Contacts.find();
    },
    allGroups: function () {
        return [{name: "Agents"},{name: "Solicitors"},{name: "Clients"},{name: "Accountants"},{name: "Builders"}]
    },
    selectedBox: function() {
        //var thisId = this._id;
        //var selectedContacts = Session.get("selectedContacts");
        //return (selectedContacts.indexOf(thisId) > -1) ? "selected-box": "";
        return (SelectedContacts.findOne({_id:this._id})) ? "selected-box": "";
    },
    selectedContactsCount: function() {
        //var selectedContacts = Session.get("selectedContacts");
        //return selectedContacts.length;
        return SelectedContacts.find().count();
    },
    twoSelectedContacts: function() {
        //var selectedContacts = Session.get("selectedContacts");
        return SelectedContacts.find().count() == 2 ? true : false;
    },
    oneSelectedContact: function() {
        //var selectedContacts = Session.get("selectedContacts");
        return SelectedContacts.find().count() == 1 ? true : false;
    },
    searchText: function() {

        return Session.get("searchText");
    },
    labelClass: function() {
        if(this == "Clients")
            return "label-primary";
        else
            return "label-light";
    }

});

Template.home.events({


    'keyup #txtContactSearch': function (e, t) {
        event.preventDefault();
        Session.set("searchText", $("#txtContactSearch").val());
    },
    'click #addContactButton': function (e, t) {
        e.preventDefault();
        //Session.set("action", "newContact");
        //Session.set("editingContact");
        //Modal.show('contactModal');
        var contactModalData = {
            formType: "insert",
            contact: null
        }

        Modal.show('contactModal', contactModalData);
    },

    'dblclick .selectable': function (e, t) {
        e.preventDefault();
        Meteor.call('latestTransactionForContact', function(err, result){
            if(result)
                FlowRouter.go('/transactions/' + result);
        })

    },

    'click #callContactButton': function (e, t) {
        e.preventDefault();
        Session.set("oneContact", this);
        Modal.show('callModal');
    },
    'click #sendSMSMenu': function (e, t) {
        e.preventDefault();
        Meteor.call('sendEmail', 'matt.ireland@mortgagechoice.com.au', 'matt.ireland@mortgagechoice.com.au', 'test email', 'test body');
        toastr.success('sent?')
    },
    'click #newTransactionMenu': function (e, t) {
        e.preventDefault();
        SelectedContacts.clear();
        SelectedContacts.insert({
            _id:this._id,
            firstName:this.firstName,
            lastName:this.lastName,
            email:this.email
        });
        var transactionContext = {
            clientNames: this.fullName(),  //dont need this i think?
            transaction: {
                client: this.fullName()
            }
        }

        Modal.show('transactionModal', transactionContext);
    },

    'click #addToGroupMenu': function (e, t) {
        e.preventDefault();

        Modal.show('groupsModal', {
            mode: "Add"
        });
    },

    'click #removeFromGroupMenu': function (e, t) {
        e.preventDefault();

        Modal.show('groupsModal', {
            mode: "Remove"
        });
    },

    'click #newJointTransactionMenu': function (e, t) {
        e.preventDefault();
        SelectedContacts.clear();
        SelectedContacts.insert({
            _id:this._id,
            firstName:this.firstName,
            lastName:this.lastName,
            email:this.email
        });
        SelectedContacts.insert({
            _id:this.partnerId,
            firstName:this.partnerFirstName,
            lastName:this.partnerLastName,
            email:this.partnerEmail
        });
        var transactionContext = {
            clientNames: this.jointFullName(),
            transaction: {
                client: this.jointFullName()
            }
        }

        Modal.show('transactionModal', transactionContext);
    },
    'click #editContactMenu': function (e, t) {
        e.preventDefault();

        var contactModalData = {
            formType: "update",
            contact: this
        }

        Modal.show('contactModal', contactModalData);
    },
    'click #emailContactButton': function (e, t) {
        e.preventDefault();
        var emailId = Emails.insert({
            subject: "test subject"
        });
        emailSending = Emails.findOne(emailId);
        Modal.show('emailModal');
    },
    'click #createCoupleButton': function (e, t) {
        e.preventDefault();
        //Session.set("action", "newContact");
        //var selectedContacts = Session.get("selectedContacts");
        if(SelectedContacts.find().count() == 2){
            var selectedContactsArray = SelectedContacts.find().fetch();
            Meteor.call('createCouple', selectedContactsArray[0]._id, selectedContactsArray[1]._id)
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

        if(SelectedContacts.findOne({_id:this._id}))
            SelectedContacts.remove(this._id)
        else
            SelectedContacts.insert({
                _id:this._id,
                firstName:this.firstName,
                lastName:this.lastName,
                email:this.email
            })


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
        //Session.set("selectedContacts", []);
        //var contactCursor = ;
        SelectedContacts.clear();
    }

});

Template.home.onCreated(function () {

    // Use this.subscribe inside onCreated callback

    var self = this;

    self.autorun(function () {
        var searchText = Session.get("searchText");
        if(searchText == "selected"){

            //var selectedContacts = Session.get("selectedContacts");
            var selectedContacts = [];
            SelectedContacts.find().forEach(function (contact) {
                selectedContacts.push(contact._id);
            });
            self.subscribe('contactsSelected', selectedContacts);
        }
        else
            self.subscribe('contactsSearch', searchText);
    });



});

Template.home.rendered = function(){
    $('[data-toggle="tooltip"]').tooltip();
    $("#buttonBar").sticky({topSpacing:0});
}

SelectedContacts.clear = function(){
    SelectedContacts.find().forEach(function (contact) {
        SelectedContacts.remove(contact._id);
    });
}












//var selectedContacts = Session.get("selectedContacts");
//if(!selectedContacts)
//    selectedContacts = [];
//
//var ind = selectedContacts.indexOf(this._id);
//if(ind === -1)
//    selectedContacts.push(this._id);
//else
//    selectedContacts.splice(ind,1);
//
//Session.set("selectedContacts", selectedContacts);