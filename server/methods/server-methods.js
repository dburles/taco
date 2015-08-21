Meteor.methods({
    'latestTransactionForContact': function(contactId){
        return "dv4utTHwxyDzoiKBC";
    },
    'addContactsToGroup': function(contactArray, groupName){

        Contacts.update(
            { _id: { $in: contactArray } },
            { $addToSet: { groups: groupName } },
            {multi:true}
        )
    }
});