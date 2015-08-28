Template.profile.helpers({
    profile: function () {

        var userId = FlowRouter.getParam("user");
        //Profiles.insert({userId:userId});
        var doc =  Profiles.findOne({_id:userId});
        //debugger;
        return doc;
    },
    contact: function() {
        var eml = FlowRouter.getParam("email");
        var doc = Contacts.find({email: eml});
    },
    user: function () {
        return Meteor.user();
    }
});

Template.profile.events({
    'click #cancelProfile': function () {
        history.back();
    }
});

Template.profile.onCreated(function () {
    var userId = FlowRouter.getParam("user");

    this.subscribe("oneProfile", userId);
    //this.subscribe("oneContactByEmail", eml);
});

Template.profile.rendered = function(){
    setTimeout(function(){
        $('.redactor').redactor({
            minHeight:180
        });
    }, 500);

};
