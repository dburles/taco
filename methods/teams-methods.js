Meteor.methods({
    addTeam: function () {

        var Team = {};

        Team.name = 'New Team on ' + moment().format("MMM Do")
        Team.role = 'Client';
        Team.type = 'Mortgage';

        return Teams.insert(Team);
    },
    deleteTeam: function (id) {
        Teams.remove({_id:id});
    },
    cloneTeam: function (doc) {

        doc.name = doc.name.shorten(43) + ' (Copy)';
        doc._id = null;

        return Teams.insert(doc);
    }
})