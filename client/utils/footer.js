Template.footer.helpers({
    username: function() {
        console.log (Meteor.user())
        return Meteor.user().emails[0].address;
    }
});

Template.footer.events({
    'click #logout': function (e, t) {
        event.preventDefault();
        Meteor.logout();
        Router.go('home');
    }
})