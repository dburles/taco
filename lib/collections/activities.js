Activities = new Meteor.Collection("Activities");

//Activities.deny({
//    insert: function (userId, doc) {
//        doc.createdAt = new Date();
//        return false;
//    }
//})
//
//Activities.allow({
//    insert: function (userId, doc) {
//        return true;
//    }
//})
//
//Activities.allow({
//    remove: function (userId, doc) {
//        return true;
//    }
//})

Activities.attachSchema(new SimpleSchema({
    emailSubject: {
        type: String,
        label: "Subject",
        max: 200,
        optional: true
    },
    emailBody: {
        type: String,
        label: "Subject",
        max: 5000,
        optional: true,
        autoform: {
            afFieldInput: {
                type: 'summernote',
                class: 'editor',
                settings: {
                    height:200,
                    toolbar: [
                        //[groupname, [button list]]

                        ['style', ['bold', 'italic', 'underline', 'clear']],
                        ['fontsize', ['fontsize']],
                        ['color', ['color']],
                        ['para', ['ul', 'ol', 'paragraph']]
                    ]
                }

            }
        }
    }
}));