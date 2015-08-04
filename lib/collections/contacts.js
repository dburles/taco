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


ContactsSchema = new SimpleSchema({
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
    },
    mobile: {
        type: String,
        max: 12,
        optional: true
    },
    home: {
        type: String,
        max: 12,
        optional: true
    },
    work: {
        type: String,
        max: 12,
        optional: true
    },
    postalStreetAddress: {
        type: String,
        max: 100,
        optional: true
    },
    postalCityStatePostcode: {
        type: String,
        max: 100,
        optional: true
    }

});

Contacts.attachSchema(ContactsSchema);

Contacts.helpers({
    fullName: function() {
        return this.firstName + ' ' + this.lastName;
    }
});

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
                email: tempUser.email,
                mobile: "04" + randomNum(11,99) + " " + randomNum(100, 999).toString() + " " + randomNum(100, 999).toString(),
                home: Fake.fromArray(["02", "03", "07", "08"]) + " " + randomNum(1000, 9999).toString() + " " + randomNum(1000, 9999).toString(),
                work: Fake.fromArray(["02", "03", "07", "08"]) + " " + randomNum(1000, 9999).toString() + " " + randomNum(1000, 9999).toString()
            })
        }

    }
}

function randomNum(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}