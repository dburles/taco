

Template.contact.helpers({
    contact: function () {
        var id = FlowRouter.getParam("id");
        var doc = Contacts.findOne(id);
        if(doc)
            doc.partner = Contacts.findOne({partnerId: id});
        return doc;
    },
    partner: function() {
        var id = FlowRouter.getParam("id");
        return Contacts.findOne({partnerId: id});
    }
});

Template.contact.events({
    'click button': function () {
        //do something
    },
    'click #newIndividualTransactionMenu': function (e, t) {
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
    'click #newJointTransactionMenu': function (e, t) {
        e.preventDefault();
        SelectedContacts.clear();
        SelectedContacts.insert({
            _id:this._id,
            firstName:this.firstName,
            lastName:this.lastName,
            email:this.email
        });
        var partner = Template.instance().partner

        SelectedContacts.insert({
            _id:this.partner._id,
            firstName:this.partner.firstName,
            lastName:this.partner.lastName,
            email:this.partner.email
        });
        var transactionContext = {
            clientNames: this.fullName(),  //dont need this i think?
            transaction: {
                client: this.fullName() + ' & ' + this.partner.fullName()
            }
        }

        Modal.show('transactionModal', transactionContext);
    }
});

Template.contact.onCreated(function () {

    var id = FlowRouter.getParam("id");

    this.subscribe("contactAndPartner", id);
});

Template.contact.newIndividualTransaction = function(context){

}


//Contact members

Template.contactMembers.onCreated(function () {

    var self = this;

    // Use self.subscribe with the data context reactively
    self.autorun(function () {
        var id = FlowRouter.getParam("id");
        self.subscribe("membersForContact", id);
    });
});

Template.contactMembers.helpers({
    members: function () {
        var id = FlowRouter.getParam("id");
        return Members.find({contactId:id});
    }
});
