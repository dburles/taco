Template.profile.helpers({
    profile: function() {
        var id = FlowRouter.getParam("id");
        var doc =  Profiles.findOne(id);
        return doc;
    },
    contacts: function(){
        var id = FlowRouter.getParam("id");
        var docs = ProfileContacts.find({profileId:id});
        return docs;
    }
});

Template.profile.events({
    //'click #clearSearchButton': function (e, t) {
    //    event.preventDefault();
    //}
});

Template.profile.onCreated(function () {
    var id = FlowRouter.getParam("id");
    this.subscribe('profile', id);
    this.subscribe('profileContacts', id);
});

Template.profile.onRendered(function () {
    //do something...
});