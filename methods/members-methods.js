Meteor.methods({
    addMember: function (transactionId, contactId, role) {
        var contact = Contacts.findOne(contactId);
        var transaction = Transactions.findOne(transactionId);

        var member = {};

        member.contactId = contactId;
        member.transactionId = transactionId;
        member.role = role;

        if(contact)
            member.contactName = contact.fullName();

        if(transaction)
            member.transactionName = transaction.title;

        Members.insert(member);
    },
    removeMember: function (memberId) {
        Members.remove({_id:memberId});
    }
})