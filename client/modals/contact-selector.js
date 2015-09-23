Template.contactSelector.helpers({
    contacts: function() {
        return Contacts.find({}, {limit: 8, sort: {updatedAt: -1}});
    },
    role: function() {
        return this.role;
    }
});

Template.contactSelector.events({
    'click #cancelContact': function (e, t) {
        event.preventDefault();
        AutoForm.resetForm('contactForm');
        Modal.hide("contactSelector");
        //Session.set("editingContact");
    },
    'click #saveContact': function (e, t) {
        // see autoform hooks for closing modal
    },
    'keyup #txtContactSearch': function (e, t) {
        event.preventDefault();
        var searchText = $("#txtContactSearch").val();
        if(searchText === "")
            searchText = null;
        FlowRouter.setQueryParams({search: searchText})
    },
    'click .member': function (e, t) {
        var contactId = this._id;
        var transactionId = FlowRouter.getParam('id');
        var role = Template.parentData(0).role;
        //debugger;
        Meteor.call('addMember', transactionId, contactId, role );
        Modal.hide("contactSelector");
    }
});

Template.contactSelector.onCreated(function () {
    var self = this;

    var group = FlowRouter.getQueryParam('group');// this.data.group;

    self.autorun(function () {
        var searchText = FlowRouter.getQueryParam("search");
        self.subscribe('contactsSearch', searchText, group);
    })
});

Template.contactSelector.onRendered(function () {
    //do something...
});