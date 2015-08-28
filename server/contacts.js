Meteor.publish("contactsSearch", function(searchText, groupName){

    searchText = searchText || "";

    var searchObject = {};

    if(groupName)
        searchObject.groups = groupName;

    if(searchText.length > 2) {
        searchArr = searchText.split(" ");

        if (searchArr.length == 2 && searchArr[1].length > 0) {
            searchObject.firstName = new RegExp("^" + searchArr[0] + '.*', "i");
            searchObject.lastName =  new RegExp("^" + searchArr[1] + '.*', "i");
        }
        else
            searchObject.$or = [
                    {firstName: new RegExp("^" + searchText + '.*', "i")},
                    {lastName: new RegExp("^" + searchText + '.*', "i")}
            ];
    }
    //Meteor._sleepForMs(5000);
    return Contacts.find(searchObject, {limit: 10, sort: {updatedAt: -1}});

});

Meteor.publish("contactsSelected", function(selectedContacts){

    return Contacts.find({ _id: { $in: selectedContacts } }, {limit:10, sort: {updatedAt: -1}});

})

Meteor.publish("singleContact", function(id){

    return Contacts.find({_id: id});

})

Meteor.publish("contactAndPartner", function(id){
    return Contacts.find({$or:[{_id: id},{partnerId: id}]});
})


Meteor.startup(function () {
    Contacts._ensureIndex({"groups": 1});
    Contacts._ensureIndex({"firstName": 1});
    Contacts._ensureIndex({"lastName": 1});
});