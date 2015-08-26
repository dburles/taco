Template.footer.helpers({
    username: function() {
        return Meteor.user().emails[0].address;
    }
});

Template.footer.events({
    'click #logout': function (e, t) {
        event.preventDefault();
        Meteor.logout();
        FlowRouter.go('/');
    }
})