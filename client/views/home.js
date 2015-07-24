

//Template.home.helpers({
//    contacts: function () {
//        return Contacts.find();
//    }
//});

Template.home.events({
    'keyup #txtContactSearch': function (e, t) {
        event.preventDefault();
        Session.set("searchText", $("#txtContactSearch").val());
    }
});