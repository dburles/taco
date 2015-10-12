function newTransaction(ctx, partner) {
    SelectedContacts.clear();
    SelectedContacts.insert({
        _id:ctx._id,
        firstName:ctx.firstName,
        lastName:ctx.lastName,
        email:ctx.email
    });
    if(partner)
        SelectedContacts.insert({
            _id:ctx.partner._id,
            firstName:ctx.partner.firstName,
            lastName:ctx.partner.lastName,
            email:ctx.partner.email
        });

    var transactionContext = {
        //clientNames: ctx.name(),  //dont need this i think?
        transaction: {
            client: ctx.name + (partner ? (' & ' + ctx.partner.name): '')
        }
    }

    Modal.show('transactionModal', transactionContext);
}

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
        newTransaction(this, null);
    },
    'click #newJointTransactionMenu': function (e, t) {
        e.preventDefault();
        var partner = Template.instance().partner
        newTransaction(this, partner);
    },
    'click #newTransactionButton': function (e, t) {
        e.preventDefault();
        var partner = Template.instance().partner
        newTransaction(this, partner);
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
