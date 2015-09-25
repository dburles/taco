Template.communications.helpers({
    communications: function() {
        return Communications.find({});
    },
    template: function() {
        var id = FlowRouter.getParam('id');
        return Communications.findOne({_id:id});
    }
});

Template.communications.events({
    //'click #clearSearchButton': function (e, t) {
    //    event.preventDefault();
    //}
});

Template.communications.onCreated(function () {
    this.subscribe('communications');
});

Template.communications.onRendered(function () {
    //do something...
});