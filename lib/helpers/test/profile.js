Profile = {
    UserContact: function(){
        if(Meteor.userId())
            return Contacts.findOne(Meteor.userId());
    },
    Teams: function(){
        var contact = this.UserContact();
        if(contact)
            return contact.user.teams;
    },
    Team: function(){
        var contact = this.UserContact();
        if(contact)     {
            var teamName = contact.team;
            var team = Teams.findOne({name:teamName});
            return team;
        }

    }
}