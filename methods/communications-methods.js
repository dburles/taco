Meteor.methods({
    addCommunication: function () {

        var communication = {};

        communication.name = 'New Template on ' + moment().format("MMM Do YY")
        communication.role = 'Client';
        communication.type = 'Mortgage';

        return Communications.insert(communication);
    },
    deleteCommunication: function (id) {
        Communications.remove({_id:id});
    },
    cloneCommunication: function (doc) {

        doc.name = doc.name.shorten(23) + ' (Copy)';
        doc._id = null;

        return Communications.insert(doc);
    },
})