Profiles = new Mongo.Collection("profiles");
ProfileContacts = new Mongo.Collection("profileContacts");

//Profiles.deny({
//    insert: function (userId, doc) {
//        doc.createdAt = new Date();
//        return false;
//    }
//})
//
//Profiles.allow({
//    insert: function (userId, doc) {
//        return true;
//    }
//})
//
//Profiles.allow({
//    remove: function (userId, doc) {
//        return true;
//    }
//})

ProfilesSchema = new SimpleSchema({
    names:{
        type: String,
        optional: true,
        label: 'Names'
    }
})

Profiles.attachSchema(ProfilesSchema);

ProfileContactsSchema = new SimpleSchema({
    profileId: {
        type: String
    },
    firstName: {
        type: String,
        optional: true,
        label: 'First Name'
    },
    middleName: {
        type: String,
        optional: true,
        label: 'Last Name'
    },
    lastName: {
        type: String,
        optional: true,
        label: 'First Name'
    },
    mobile: {
        type: String,
        optional: true,
        label: 'Mobile'
    },
    landLine: {
        type: String,
        optional: true,
        label: 'Land Line'
    },
    email: {
        type: String,
        optional: true,
        label: 'Email'
    }
});

ProfileContacts.attachSchema(ProfileContactsSchema);

Profiles.helpers({
    contacts: function() {
        return ProfileContacts.find({profileId:this._id});
    }
});




