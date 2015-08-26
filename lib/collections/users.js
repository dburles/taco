//
//
//UserProfileSchema = new SimpleSchema({
//    firstName: {
//        type: String,
//        regEx: /^[a-zA-Z-]{2,25}$/,
//        optional:true
//    },
//    lastName: {
//        type: String,
//        regEx: /^[a-zA-Z]{2,25}$/,
//        optional:true
//    },
//    work: {
//        type: String,
//        min: 8,
//        max: 12,
//        optional:true
//    },
//    mobile: {
//        type: String,
//        min: 8,
//        max: 12,
//        optional:true
//    },
//    email: {
//        type: String,
//        min: 8,
//        max: 12,
//        optional:true
//    }
//});
//
//UserSchema = new SimpleSchema({
//    _id: {
//        type: String,
//        regEx: SimpleSchema.RegEx.Id
//    },
//    emails: {
//        optional: true,
//        type: [Object],
//        custom: function () {
//            console.log(this);
//        }
//    },
//    "emails.$.address": {
//        optional: true,
//        type: String,
//        regEx: SimpleSchema.RegEx.Email
//    },
//    "emails.$.verified": {
//        optional: true,
//        type: Boolean
//    },
//    createdAt: {
//        type: Date,
//        optional:true
//    },
//    profile: {
//        type: UserProfileSchema,
//        optional:true
//    },
//    services: {
//        type: Object,
//        optional: true,
//        blackbox: false
//    },
//    password: {
//        type: String,
//        blackbox: true
//    }
//});
//
//Meteor.users.attachSchema(UserSchema);