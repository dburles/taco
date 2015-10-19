Meteor.methods({
    'latestTransactionForContact': function(contactId){
        return "dv4utTHwxyDzoiKBC";
    },

    sendEmail: function (to, from, subject, text) {
        check([to, from, subject, text], [String]);

        // Let other method calls from the same client start running,
        // without waiting for the email sending to complete.
        this.unblock();

        //actual email sending method
        Email.send({
            to: to,
            from: from,
            subject: subject,
            text: text
        });
    }
    //collegues: function () {
    //    var myContact = Contacts.findOne(Meteor.userId());
    //    console.log("*** My Contact is ***");
    //    console.log(myContact);
    //
    //
    //    var myTeam = myContact.team;
    //
    //    console.log("*** My Team is ***");
    //    console.log(myTeam);
    //
    //    var collegues = Contacts.find({'user.teams':myTeam},{fields: {'name':1}});
    //    //console.log(collegues.fetch());
    //    return collegues.fetch();
    //}
});