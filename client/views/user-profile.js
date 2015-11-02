Template.userProfile.helpers({
    contact: function () {

        var userId = FlowRouter.getParam("user");
        //userProfiles.insert({userId:userId});
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

Template.userProfile.events({
    'click #cancelProfile': function () {
        history.back();
    }
});

Template.userProfile.onCreated(function () {
    var userId = FlowRouter.getParam("user");

    this.subscribe("userContact", userId);
    //this.subscribe("oneContactByEmail", eml);
});

Template.userProfile.rendered = function(){
    setTimeout(function(){
        $('.redactor').redactor({
            minHeight:180
        });
    }, 500);

};
