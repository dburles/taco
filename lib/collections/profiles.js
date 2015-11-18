Profiles = new Mongo.Collection("profiles");
ProfileContacts = new Mongo.Collection("profileContacts");
ProfileAddresses = new Mongo.Collection("profileAddresses");
ProfileEmployments = new Mongo.Collection("profileEmployments");
ProfileProperties = new Mongo.Collection("profileProperties");
ProfileLiabilities = new Mongo.Collection("profileLiabilities");
ProfileIncomes = new Mongo.Collection("profileIncomes");
ProfileKids = new Mongo.Collection("profileKids");
ProfileMortgages = new Mongo.Collection("profileMortgages");
ProfileAssets = new Mongo.Collection("profileAssets");

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
    },
    payingRent:{
        type: Number,
        optional: true
    },
    contactPreferences:{
        type: String,
        optional: true
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
    },
    maritalStatus: {
        type: String,
        optional: true,
        autoform: {
            options: ApplicationHelpers.MaritalStatusOptions()
        }
    },
    postalAddress: {
        type: String,
        optional: true
    },
    postalCityStatePostcode: {
        type: String,
        optional: true
    },
    homeAddress: {
        type: String,
        optional: true
    },
    homeCityStatePostcode: {
        type: String,
        optional: true
    }

});

ProfileContacts.attachSchema(ProfileContactsSchema);


ProfileAddressesSchema = new SimpleSchema({
    profileId: {
        type: String
    },
    profileContactId: {
        type: String
    },
    address: {
        type: String,
        optional: true
    },
    cityStatePostcode: {
        type: String,
        optional: true
    },
    fromMonth: {
        type: String,
        optional: true,
        autoform: {
            options: ApplicationHelpers.MonthOptions()
        }
    },
    fromYear: {
        type: String,
        optional: true,
        autoform: {
            options: ApplicationHelpers.RecentYearOptions()
        }
    },
    toMonth: {
        type: String,
        optional: true,
        autoform: {
            options: ApplicationHelpers.MonthOptions()
        }
    },
    toYear: {
        type: String,
        optional: true,
        autoform: {
            options: ApplicationHelpers.RecentYearOptions()
        }
    },
    addressType: {
        type: String,
        optional: true,
        autoform: {
            options: ApplicationHelpers.AddressTypeOptions()
        }
    },
    ownership: {
        type: String,
        optional: true,
        autoform: {
            type: "select-radio-inline",
            options: function () {
                return [
                    {label: "Owner", value: "Own"},
                    {label: "Renting", value: "Renting"}
                ];
            }
        }
    }

});

ProfileAddresses.attachSchema(ProfileAddressesSchema);

ProfileEmploymentsSchema = new SimpleSchema({
    profileId: {
        type: String
    },
    profileContactId: {
        type: String
    },
    position: {
        type: String,
        optional: true
    },
    companyName: {
        type: String,
        optional: true
    },
    contactPerson: {
        type: String,
        optional: true
    },
    contactPhone: {
        type: String,
        optional: true
    },
    address: {
        type: String,
        optional: true
    },
    cityStatePostcode: {
        type: String,
        optional: true
    },
    fromMonth: {
        type: String,
        optional: true,
        autoform: {
            options: ApplicationHelpers.MonthOptions()
        }
    },
    fromYear: {
        type: String,
        optional: true,
        autoform: {
            options: ApplicationHelpers.RecentYearOptions()
        }
    },
    toMonth: {
        type: String,
        optional: true,
        autoform: {
            options: ApplicationHelpers.MonthOptions()
        }
    },
    toYear: {
        type: String,
        optional: true,
        autoform: {
            options: ApplicationHelpers.RecentYearOptions()
        }
    },
    employmentType: {
        type: String,
        optional: true,
        autoform: {
            options: ApplicationHelpers.EmploymentTypeOptions()
        }
    }

});

ProfileEmployments.attachSchema(ProfileEmploymentsSchema);


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

ProfileAssetsSchema = new SimpleSchema({
    profileId: {
        type: String
    },
    type: {
        type: String,
        optional: true
    },
    descriptionPlaceholder: {
        type: String,
        optional: true
    },
    description: {
        type: String,
        optional: true
    },
    value: {
        type: Number,
        optional: true
    }
});

ProfileAssets.attachSchema(ProfileAssetsSchema);

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

ProfileMortgagesSchema = new SimpleSchema({
    transactionId: {
        type: String
    },
    loanPurpose: {
        type: [String],
        optional: true,
        autoform:{
            type: "select-checkbox",
            options: MortgageHelpers.LoanPurposeOptions()
        }
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

ProfileMortgages.attachSchema(ProfileMortgagesSchema);






Profiles.helpers({
    contacts: function() {
        return ProfileContacts.find({profileId:this._id});
    },
    totalMortgageValues: function(){
        var total = 0;
        ProfileLiabilities.find({profileId:this._id, type:'Mortgage' }).map(function(doc) {
            if(doc.owing)
                total += doc.owing;
        });
        return total;
    },
    totalPropertiesValues: function(){
        var total = 0;
        ProfileProperties.find({profileId:this._id}).map(function(doc) {
            if(doc.value)
                total += doc.value;
        });
        return total;
    },
    totalLVR: function(){
        return Math.round(this.totalMortgageValues() / this.totalPropertiesValues() * 100, 2);
    }
});




