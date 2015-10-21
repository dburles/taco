Template.profilesModal.helpers({
    profiles: function () {
        return ApplicationHelpers.ClientProfiles();
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


Template.profilesModal.events({
    'click #cancelEmail': function (e, t) {
        e.preventDefault();
    },
    'click .profile-item': function (e, t) {
        e.preventDefault();

        var mode = Template.currentData().mode;
        var methodName = (mode == "Add") ? 'addContactsToProfile' : 'removeContactsFromProfile'

        var contactsArray = SelectedContacts.find().map(function(contact){
            return contact._id
        })
        Meteor.call(methodName, contactsArray, this.name);
        Modal.hide('profilesModal')

        var msg = (mode == "Add") ? 'Added to profile' : 'Removed from profile'
        toastr.success(msg);
    }
});

