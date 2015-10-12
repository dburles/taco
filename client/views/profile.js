Template.profile.helpers({
    contact: function () {

        var userId = FlowRouter.getParam("user");
        //Profiles.insert({userId:userId});
        var doc =  Contacts.findOne({_id:userId});
        //debugger;
        return doc;
    },
    user: function () {
        return Meteor.user();
    },
    teamOptions: function () {
        var contact = Contacts.findOne(this._id);
        return contact.user.teams.map(function(val){
            return {label:val, value:val};
        })
    }
});

Template.profile.events({
    'click #cancelProfile': function () {
        history.back();
    }
});

Template.profile.onCreated(function () {
    var userId = FlowRouter.getParam("user");

    this.subscribe("userContact", userId);
    //this.subscribe("oneContactByEmail", eml);
});

Template.profile.rendered = function(){
    setTimeout(function(){
        $('.redactor').redactor({
            minHeight:180
        });
    }, 500);

};
