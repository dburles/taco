Contacts = new Meteor.Collection("contacts");

//Contacts.deny({
//    insert: function (userId, doc) {
//        doc.createdAt = new Date();
//        return false;
//    }
//})
//
//Contacts.allow({
//    insert: function (userId, doc) {
//        return true;
//    }
//})
//
//Contacts.allow({
//    remove: function (userId, doc) {
//        return true;
//    }
//})
//


Contacts.attachSchema(new SimpleSchema({
    firstName: {
        type: String,
        label: "First Name",
        max: 50,
        optional: false
    },
    lastName: {
        type: String,
        label: "Last Name",
        max: 50,
        optional: false
    },
    email: {
        type: String,
        max: 100,
        optional: true,
        regEx: SimpleSchema.RegEx.Email
    }

}));

Meteor.startup(function () {

    return Meteor.methods({
        removeAllContacts: function () {
            return Contacts.remove({});
        }
    });
});

if(Meteor.isServer){
    if(Contacts.find().count() == 0){

        console.log("Seeding Contacts...")

        Contacts.insert({
            firstName: "John",
            lastName: "Citizen",
            email: "john@gmail.com"
        })

        var tempUser;
        for(var n=1;n<100;n++){
            tempUser = Fake.user();
            Contacts.insert({
                firstName: tempUser.name,
                lastName: tempUser.surname,
                email: tempUser.email
            })
        }

    }
}