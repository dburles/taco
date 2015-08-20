Template.groupsModal.helpers({
    groups: function () {
        return [{name: "Agents"},{name: "Solicitors"},{name: "Clients"},{name: "Accountants"},{name: "Builders"}]
    },
    singleSelectedName: function () {

        var contacts = SelectedContacts.find();
        if(contacts.count()==1) {
            var contact = SelectedContacts.findOne();
            return contact.firstName + ' ' + contact.lastName;
        }
        else
            return "";
    },
    selectedContacts: function () {

        return SelectedContacts.find();
    }
});


Template.groupsModal.events({
    'click #cancelEmail': function (e, t) {
        e.preventDefault();
    },
    'click .group-item': function (e, t) {
        e.preventDefault();
        //Meteor.call('addContactsToGroup', )
    }
});

