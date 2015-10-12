Meteor.startup(function(){
    Meteor.subscribe("teamsForUser");
    Meteor.subscribe("contactForUser");
})