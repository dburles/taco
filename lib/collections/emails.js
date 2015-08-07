Emails = new Meteor.Collection("Emails");

//Emails.deny({
//    insert: function (userId, doc) {
//        doc.createdAt = new Date();
//        return false;
//    }
//})
//
//Emails.allow({
//    insert: function (userId, doc) {
//        return true;
//    }
//})
//
//Emails.allow({
//    remove: function (userId, doc) {
//        return true;
//    }
//})

Emails.attachSchema(new SimpleSchema({
    recipientsTo: {
        type: [String],
        label: "To",
        autoform: {
            type: "select2",
            afFieldInput: {
                multiple: true
            }
        }
    },
    subject: {
        type: String,
        label: "Subject",
        max: 200,
        optional: true
    },
    body: {
        type: String,
        max: 5000,
        optional: true,
        autoform: {
            afFieldInput: {
                type: 'summernote',
                class: 'editor',
                settings: {
                    airMode:false,
                    height:200,
                    toolbar: [
                        //[groupname, [button list]]

                        ['style', ['bold', 'italic', 'underline', 'clear']],
                        ['fontsize', ['fontsize']],
                        ['color', ['color']],
                        ['para', ['ul', 'ol', 'paragraph']]
                    ]
                    //airPopover: [
                    //    ['color', ['color']],
                    //    ['font', ['bold', 'underline', 'clear']],
                    //    ['para', ['ul', 'paragraph']],
                    //    ['table', ['table']],
                    //    ['insert', ['link', 'picture']]
                    //]
                }

            }
        }
    }
}));