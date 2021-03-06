//Profiles = new Mongo.Collection("profiles");
//
////Profiles.deny({
////    insert: function (userId, doc) {
////        doc.createdAt = new Date();
////        return false;
////    }
////})
////
////Profiles.allow({
////    insert: function (userId, doc) {
////        return true;
////    }
////})
////
////Profiles.allow({
////    remove: function (userId, doc) {
////        return true;
////    }
////})
//
//ProfilesSchema = new SimpleSchema({
//
//    userId: {
//        type: String,
//        max:30,
//        optional: true
//    },
//    picture: {
//        type: String,
//        optional: true,
//        autoform: {
//            afFieldInput: {
//                type: 'cloudinary'
//            }
//        }
//    },
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
//        regEx: SimpleSchema.RegEx.Email,
//        optional:true,
//        max:100
//    },
//    gmailAddress: {
//        type: String,
//        label: "GMail Address",
//        max: 100,
//        optional: true
//    }
//    ,gmailPassword: {
//        type: String,
//        label: "GMail Password",
//        max: 20,
//        optional: true,
//        autoform: {
//            afFieldInput: {
//                type: "password"
//            }
//        }
//    }
//    ,emailSignature: {
//        type: String,
//        max: 1000,
//        optional: true,
//        autoform: {
//            afFieldInput: {
//                type: 'textarea',
//                class: 'editor'
//            }
//        }
//    },
//    team:{
//        type:String,
//        optional:true,
//        max:50
//    },
//    teams:{
//        type:[String],
//        optional: true
//    }
//
//});
//
//Profiles.attachSchema(ProfilesSchema);
//
