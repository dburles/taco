Meteor.methods({
    'createCouple': function(contactId1, contactId2){
        var doc1 = Contacts.findOne({_id:contactId1});
        var doc2 = Contacts.findOne({_id:contactId2});

        Contacts.update({_id:contactId1}, {$set: {
            partnerId:contactId2,
            partnerFirstName: doc2.firstName,
            partnerLastName: doc2.lastName,
            partnerEmail: doc2.email
        }});

        Contacts.update({_id:contactId2}, {$set: {
            partnerId:contactId1,
            partnerFirstName: doc1.firstName,
            partnerLastName: doc1.lastName,
            partnerEmail: doc1.email
        }});
    },
    'divorce': function(contactId){
        var doc = Contacts.findOne({_id:contactId});

        Contacts.update({_id:doc.partnerId}, {$set: {
            partnerId:null,
            partnerFirstName: null,
            partnerLastName: null,
            partnerEmail: null
        }});

        Contacts.update({_id:contactId}, {$set: {
            partnerId:null,
            partnerFirstName: null,
            partnerLastName: null,
            partnerEmail: null
        }});
    },
    'addContactsToGroup': function(contactArray, groupName){

        Contacts.update(
            { _id: { $in: contactArray } },
            { $addToSet: { groups: groupName } },
            {multi:true}
        )
    },
    'addContactToGroup': function(contactId, groupName){

        Contacts.update(
            { _id: contactId},
            { $addToSet: { groups: groupName } },
            {multi:true}
        )
    },
    'removeContactsFromGroup': function(contactArray, groupName){

        Contacts.update(
            { _id: { $in: contactArray } },
            { $pull: { groups: groupName } },
            {multi:true}
        )
    }
});