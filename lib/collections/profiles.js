Profiles = new Mongo.Collection("profiles");
ProfileContacts = new Mongo.Collection("profileContacts");
ProfileProperties = new Mongo.Collection("profileProperties");
ProfileLiabilities = new Mongo.Collection("profileLiabilities");
ProfileIncomes = new Mongo.Collection("profileIncomes");
ProfileKids = new Mongo.Collection("profileKids");

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

ProfileKidsSchema = new SimpleSchema({
    profileId: {
        type: String
    },
    age: {
        type: Number,
        optional: true,
        label: 'Age'
    }
});

ProfileKids.attachSchema(ProfileKidsSchema);



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

ProfilePropertiesSchema = new SimpleSchema({
    profileId: {
        type: String
    },
    address: {
        type: String,
        optional: true
    },
    value: {
        type: Number,
        optional: true
    },
    home: {
        type: Boolean,
        optional: true
    },
    rent: {
        type: Number,
        optional: true
    }
});

ProfileProperties.attachSchema(ProfilePropertiesSchema);

ProfileLiabilitiesSchema = new SimpleSchema({
    profileId: {
        type: String
    },
    type: {
        type: String,
        optional: true
    },
    lender: {
        type: String,
        optional: true
    },
    owing: {
        type: Number,
        optional: true
    },
    limit: {
        type: Number,
        optional: true
    },
    repayment: {
        type: Number,
        optional: true
    },
    frequency: {
        type: String,
        optional: true,
        autoform: {
            options: MortgageHelpers.PaymentFrequencyOptions()
        }
    }
});

ProfileLiabilities.attachSchema(ProfileLiabilitiesSchema);

ProfileIncomesSchema = new SimpleSchema({
    profileId: {
        type: String
    },
    profileContactId: {
        type: String
    },
    type: {
        type: String,
        optional: true,
        autoform: {
            options: function() {
                return [
                    {label: 'Permanent Full Time', value: 'Permanent Full Time'},
                    {label: 'Permanent Part Time', value: 'Permanent Part Time'},
                    {label: 'Casual', value: 'Casual'},
                    {label: 'Self Employed', value: 'Self Employed'},
                    {label: 'Government Payments', value: 'Government Payments'},
                    {label: 'Shares or Investments', value: 'Shares or Investments'},
                    {label: 'Other Income', value: 'Other Income'}
                ]
            }
        }
    },
    details: {
        type: String,
        optional: true
    },
    amount: {
        type: Number,
        optional: true
    },
    frequency: {
        type: String,
        optional: true,
        autoform: {
            options: MortgageHelpers.PaymentFrequencyOptions()
        }
    },
    duration: {
    type: String,
        optional: true,
        autoform: {
            options: function() {
                return [
                    {label: '< 1 month', value: '< 1 month'},
                    {label: '1-2 months', value: '1-2 months'},
                    {label: '3-5 months', value: '3-5 months'},
                    {label: '6-11 months', value: '6-11 months'},
                    {label: '1-2 years', value: '1-2 years'},
                    {label: '2+ years', value: '2+ years'}
                ]
            }
        }
    }
});

ProfileIncomes.attachSchema(ProfileIncomesSchema);






Profiles.helpers({
    contacts: function() {
        return ProfileContacts.find({profileId:this._id});
    }
});




