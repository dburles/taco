SelectedContacts = new Mongo.Collection(null);

Contacts = new Mongo.Collection("contacts");



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
    picture: {
        type: String,
        optional:true,
        autoform: {
            afFieldInput: {
                type: 'cloudinary'
            }
        }
    },
    firstName: {
        type: String,
        label: "First Name",
        max: 50,
        optional: true
    },
    lastName: {
        type: String,
        label: "Last Name",
        max: 50,
        optional: true
    },
    company: {
        type: String,
        max: 100,
        optional: true
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
    },
    streetAddress: {
        type: String,
        max: 100,
        optional: true
    },
    cityStatePostcode: {
        type: String,
        max: 100,
        optional: true
    },

    // Partner...

    partnerId: {
        type: String,
        max: 30,
        optional: true
    },
    partnerFirstName: {
        type: String,
        max: 50,
        optional: true
    },
    partnerLastName: {
        type: String,
        max: 50,
        optional: true
    },
    partnerEmail: {
        type: String,
        max: 50,
        optional: true
    },

    groups:{
        type: [String],
        optional: true,
        autoform: {
            type: "select-checkbox",
            options: function () {
                return ApplicationHelpers.Groups().map(function(s){
                    return {label:s, value:s};
                });
            }
        }
    },

    updatedAt:{
        type: Date,
        optional: true
    }

});

Contacts.attachSchema(ContactsSchema);

Contacts.helpers({
    fullName: function() {
        return this.firstName + ' ' + this.lastName;
    },
    partnerFullName: function(){
        return this.partnerFirstName + ' ' + this.partnerLastName;
    },
    jointFullName: function(){
        if(this.lastName == this.partnerLastName)
            return this.firstName + ' & ' + this.partnerFirstName + ' ' + this.lastName;
        else
            return this.name() + ' & ' + this.partnerFullName();

    },
    name: function(){
        var name = "";
        if(this.firstName)
            name += this.firstName;

        if(this.firstName && this.lastName)
            name += " ";

        if(this.lastName)
            name += this.lastName;

        if(!name && this.company)
            name = this.company;

        if(!name)
            name = 'Name Unknown';

        return name;
    }
});




