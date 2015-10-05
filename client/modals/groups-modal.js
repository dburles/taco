Template.groupsModal.helpers({
    groups: function () {
        return ApplicationHelpers.Groups().map(function(value){
            return {name: value};
        })
    },
    isAdding: function () {
        return this.mode == "Add";
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

        var mode = Template.currentData().mode;
        var methodName = (mode == "Add") ? 'addContactsToGroup' : 'removeContactsFromGroup'

        var contactsArray = SelectedContacts.find().map(function(contact){
            return contact._id
        })
        Meteor.call(methodName, contactsArray, this.name);
        Modal.hide('groupsModal')

        var msg = (mode == "Add") ? 'Added to group' : 'Removed from group'
        toastr.success(msg);
    }
});

