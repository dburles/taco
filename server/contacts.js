Meteor.publish("contactSearch", function(searchText){

    searchText = searchText || "";

    if(searchText.length < 3)
        return Contacts.find({}, {limit:10, sort: {createdAt: -1}});

    searchArr = searchText.split(" ");

    if(searchArr.length == 2 && searchArr[1].length > 0)
        return Contacts.find({
            firstName: new RegExp("^" + searchArr[0] + '.*', "i"),
            lastName: new RegExp("^" + searchArr[1] + '.*', "i")
        }, {limit:10, sort: {createdAt: -1}});
    else
        return Contacts.find({$or:[
            {firstName: new RegExp("^" + searchText + '.*', "i")},
            {lastName: new RegExp("^" + searchText + '.*', "i")}
        ]}, {limit:10, sort: {createdAt: -1}});
})

Meteor.methods({
    'createCouple': function(contactId1, contactId2){
        var doc1 = Contacts.findOne({_id:contactId1});
        var doc2 = Contacts.findOne({_id:contactId2});
        if(!doc1 || !doc2)
            return false;

        Contacts.update({_id:contactId1}, {$set: {
            partnerId:contactId2,
            partnerName: doc2.fullName()
        }});

        Contacts.update({_id:contactId2}, {$set: {
            partnerId:contactId1,
            partnerName: doc1.fullName()
        }});

        return true;
    }
});

Meteor.methods({
    'divorce': function(contactId){
        var doc = Contacts.findOne({_id:contactId});

        if(!doc)
            return false;

        Contacts.update({_id:doc.partnerId}, {$set: {
            partnerId:null,
            partnerName: null
        }});

        Contacts.update({_id:contactId}, {$set: {
            partnerId:null,
            partnerName: null
        }});

        return true;
    }
});