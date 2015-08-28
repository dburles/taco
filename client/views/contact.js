

Template.contact.helpers({
    contact: function () {
        var id = FlowRouter.getParam("id");
        var doc = Contacts.findOne(id);
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
    }
});

Template.contact.onCreated(function () {

    var id = FlowRouter.getParam("id");

    this.subscribe("contactAndPartner", id);
});


//Contact members

Template.contactMembers.onCreated(function () {

    var id = FlowRouter.getParam("id");

    this.subscribe("membersForContact", id);
});

Template.contactMembers.helpers({
    members: function () {
        var id = FlowRouter.getParam("id");
        return Members.find({contactId:id});
    }
});
