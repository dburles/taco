emailSending = {};

Template.home.helpers({
    title: function() {
        var profileName = FlowRouter.getQueryParam("profile");
        if(!profileName)
            profileName = "Contacts"
        return pluralize(profileName);
    },
    contacts: function() {
        return Contacts.find({}, {limit: 10, sort: {updatedAt: -1}});
    },
    allProfiles: function () {
        return ApplicationHelpers.ClientProfiles().map(function(value){
            return {name: value.name};
        })
    },
    profileRole: function () {
        var profileName = FlowRouter.getQueryParam('profile');
        if(profileName)
            return profileName
        else
            return 'Contact';
    },
    selectedBox: function() {
        return (SelectedContacts.findOne({_id:this._id})) ? "selected-box": "";
    },
    selectedTick: function() {
        return (SelectedContacts.findOne({_id:this._id})) ? "color-blue": "light-text";
    },
    selectedContactsCount: function() {
        return SelectedContacts.find().count();
    },
    twoSelectedContacts: function() {
        return SelectedContacts.find().count() == 2 ? true : false;
    },
    oneSelectedContact: function() {
        return SelectedContacts.find().count() == 1 ? true : false;
    },
    searchText: function() {

        return FlowRouter.getQueryParam("search"); //Session.get("searchText");
    }
    //labelClass: function() {
    //    if(this == "Client")
    //        return "label-primary";
    //    else
    //        return "label-light";
    //}

});


Template.home.events({


    //Search bar events

    'keyup #txtContactSearch': function (e, t) {
        event.preventDefault();
        var searchText = $("#txtContactSearch").val();
        if(searchText === "")
            searchText = null;
        Session.set("searchText", searchText);
        FlowRouter.setQueryParams({search: searchText})
    },
    'click #clearSearchButton': function (e, t) {
        event.preventDefault();
        FlowRouter.setQueryParams({search:null});
        //Session.set("searchText");
    },
    'click .profileMenuItem': function (e, t) {
        event.preventDefault();
        //debugger;
        FlowRouter.setQueryParams({profile: this.name})
    },
    'click .profileAllMenuItem': function (e, t) {
        event.preventDefault();
        //debugger;
        FlowRouter.setQueryParams({profile: null})
    },
    'click #addContactButton': function (e, t) {
        e.preventDefault();

        var contact = {};
        var profile = FlowRouter.getQueryParam('profile');
        if(profile)
            contact.profiles = [profile];

        var contactModalData = {
            formType: "insert",
            contact: contact
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
            type: 'insert',
            transaction: {
                client: this.name
            }
        }

        Modal.show('transactionModal', transactionContext);
    },

    'click #addToProfileMenu': function (e, t) {
        e.preventDefault();

        Modal.show('profilesModal', {
            mode: "Add"
        });
    },

    'click #removeFromProfileMenu': function (e, t) {
        e.preventDefault();

        Modal.show('profilesModal', {
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
            type: 'insert',
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
        e.preventDefault();
        if(SelectedContacts.findOne({_id:this._id}))
            SelectedContacts.remove(this._id)
        else {
            SelectedContacts.insert({
                _id: this._id,
                firstName: this.firstName,
                lastName: this.lastName,
                email: this.email
            })
            //FlowRouter.setQueryParams({contact: this._id})
        }



    },
    'click .clickable': function(e, t){
            FlowRouter.go("/contacts/" + this._id)
    },
    'click #viewSelectedMenu': function (e, t) {
        e.preventDefault();
        //Session.set("action", "newContact");
        //Session.set("searchText", "selected");
        FlowRouter.setQueryParams({search:"selected"});
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
        var searchText = FlowRouter.getQueryParam("search"); //Session.get("searchText");
        var profileName = FlowRouter.getQueryParam("profile");

        if(searchText == "selected"){

            //var selectedContacts = Session.get("selectedContacts");
            //var selectedContacts = [];
            SelectedContacts.find().forEach(function (contact) {
                selectedContacts.push(contact._id);
            });
            self.subscribe('contactsSelected', selectedContacts);
        }
        else {
            self.subscribe('contactsSearch', searchText, profileName);

        }
    });

});

Template.home.rendered = function(){
    //$('[data-toggle="tooltip"]').tooltip();
    $("#buttonBar").sticky({topSpacing:0});
}

SelectedContacts.clear = function(){
    SelectedContacts.find().forEach(function (contact) {
        SelectedContacts.remove(contact._id);
    });
}

SelectedContacts.getOne = function() {
    var doc = SelectedContacts.find().fetch()[0]
    return doc;
}

Template.contactProfiles.helpers({

    labelClass: function() {
        if(this == "Client")
            return "label-primary";
        else
            return "label-light";
    }

});