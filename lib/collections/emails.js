Emails = new Meteor.Collection("emails");

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

//var toolbarSettings = [];
//if(Meteor.isClient && Meteor.Device.isDesktop()) {
//    toolbarSettings =
//        [
//            ['style', ['bold', 'italic', 'underline', 'clear']],
//            ['fontsize', ['fontsize']],
//            ['color', ['color']],
//            ['para', ['ul', 'ol', 'paragraph']]
//        ]
//}

Emails.attachSchema(new SimpleSchema({
    recipientsTo: {
        type: [String],
        label: "To",
        optional: true,
        autoform: {
            type: "select2",
            afFieldInput: {
                multiple: true,
                tags: true
            },
            options: function () {
                return [
                    {label: "Matt Ireland (matt.ireland@mortgagechoice.com.au)", value: '324242423243234'},
                    {label: "Linda Ireland (linda.ireland@mortgagechoice.com.au)", value: '984242423243234'},
                ];
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
                type: 'textarea',
                class: 'editor'
                //,
                //settings: {
                //    airMode: false,
                //    height: 200,
                //    toolbar: toolbarSettings
                //}
            }
        }
    }
    //body: {
    //    type: String,
    //    max: 5000,
    //    optional: true,
    //    autoform: {
    //        afFieldInput: {
    //            type: 'summernote',
    //            class: 'editor',
    //            settings: {
    //                airMode:false,
    //                height:200,
    //                toolbar: [
    //                    //[groupname, [button list]]
    //
    //                    ['style', ['bold', 'italic', 'underline', 'clear']],
    //                    ['fontsize', ['fontsize']],
    //                    ['color', ['color']],
    //                    ['para', ['ul', 'ol', 'paragraph']]
    //                ]
    //                //airPopover: [
    //                //    ['color', ['color']],
    //                //    ['font', ['bold', 'underline', 'clear']],
    //                //    ['para', ['ul', 'paragraph']],
    //                //    ['table', ['table']],
    //                //    ['insert', ['link', 'picture']]
    //                //]
    //            }
    //
    //        }
    //    }
    //}
}));

