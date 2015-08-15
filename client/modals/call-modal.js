Template.callModal.helpers({
    oneContact: function () {
        return Session.get("oneContact");
    }
});


Template.callModal.events({
    'click #cancelEmail': function (e, t) {
        e.preventDefault();
    }
});

