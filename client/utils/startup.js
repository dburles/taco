Meteor.startup(function(){
    Meteor.subscribe("teamsForUser");
    Meteor.subscribe("contactForUser");
    Meteor.subscribe("teamContacts");
})