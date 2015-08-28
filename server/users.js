//Accounts.onCreateUser(function(options, user) {
//    user.profile = options.profile ? options.profile : {};
//    return user;
//});

Meteor.startup(function() {
    if (Meteor.users.find().count() === 0) {
        Accounts.createUser({
            username: 'matt@ireland.mx',
            email: 'matt@ireland.mx',
            password: 'maver1ck'
        });
    }
});