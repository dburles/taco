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

    profiles:{
        type: [String],
        optional: true,
        autoform: {
            type: "select-checkbox",
            options: function () {

                var list =  ApplicationHelpers.ClientProfiles().map(function(val){
                    return {label:val.name, value:val.name}
                });
                return list;
            }
        }
    },

    profileId: {
        type: String,
        max: 30,
        optional: true
    },

    updatedAt:{
        type: Date,
        optional: true
    },

    name: {
        type: String,
        autoValue: function(){
            var firstName = this.field("firstName");
            var lastName = this.field("lastName");
            var company = this.field("company");
            if (firstName.isSet || lastName.isSet || company.isSet) {
                var name = "";
                if(firstName.value)
                    name += firstName.value;

                if(firstName.value && lastName.value)
                    name += " ";

                if(lastName.value)
                    name += lastName.value;

                if(!name && company.value)
                    name = company.value;

                if(!name)
                    name = 'Name Unknown';

                return name;
            }
        }
    },

    team:{
        type:String,
        optional:true,
        max:50
    },

    user:{
        type:Object,
        optional:true
    },

    'user.gmailAddress': {
        type: String,
        label: "GMail Address",
        max: 100,
        optional: true
    },
    'user.gmailPassword': {
        type: String,
        label: "GMail Password",
        max: 20,
        optional: true,
        autoform: {
            afFieldInput: {
                type: "password"
            }
        }
    },
    'user.emailSignature': {
        type: String,
        max: 1000,
        optional: true,
        autoform: {
            afFieldInput: {
                type: 'textarea',
                class: 'editor'
            }
        }
    },

    'user.teams':{
        type:[String],
        optional: true
    }


});

Contacts.attachSchema(ContactsSchema);

Contacts.helpers({
    //fullName: function() {
    //    return this.firstName + ' ' + this.lastName;
    //},
    partnerFullName: function(){
        return this.partnerFirstName + ' ' + this.partnerLastName;
    },
    jointFullName: function(){
        if(this.lastName == this.partnerLastName)
            return this.firstName + ' & ' + this.partnerFirstName + ' ' + this.lastName;
        else
            return this.name + ' & ' + this.partnerFullName();

    }
    //replaced the following with an autovalue... ,
    //name: function(){
    //    var name = "";
    //    if(this.firstName)
    //        name += this.firstName;
    //
    //    if(this.firstName && this.lastName)
    //        name += " ";
    //
    //    if(this.lastName)
    //        name += this.lastName;
    //
    //    if(!name && this.company)
    //        name = this.company;
    //
    //    if(!name)
    //        name = 'Name Unknown';
    //
    //    return name;
    //}
});




