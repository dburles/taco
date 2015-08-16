Meteor.methods({
    'createCouple': function(contactId1, contactId2){
        var doc1 = Contacts.findOne({_id:contactId1});
        var doc2 = Contacts.findOne({_id:contactId2});

        Contacts.update({_id:contactId1}, {$set: {
            partnerId:contactId2,
            partnerName: doc2.fullName()
        }});

        Contacts.update({_id:contactId2}, {$set: {
            partnerId:contactId1,
            partnerName: doc1.fullName()
        }});
    },
    'divorce': function(contactId){
        var doc = Contacts.findOne({_id:contactId});

        Contacts.update({_id:doc.partnerId}, {$set: {
            partnerId:null,
            partnerName: null
        }});

        Contacts.update({_id:contactId}, {$set: {
            partnerId:null,
            partnerName: null
        }});
    }
});