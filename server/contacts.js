Meteor.publish("contactsSearch", function(searchText, profileName){

    searchText = searchText || "";

    var searchObject = {};

    if(profileName)
        searchObject.profiles = profileName;

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

Meteor.publish("contactForUser", function(){

    return Contacts.find({_id:this.userId});
})


Meteor.startup(function () {
    Contacts._ensureIndex({"profiles": 1});
    Contacts._ensureIndex({"firstName": 1});
    Contacts._ensureIndex({"lastName": 1});
});

Meteor.publish("userContact", function(userId){
    var contacts = Contacts.find({_id:userId});
    if(contacts.count() < 1)
        Contacts.insert({
            _id:userId,
            firstName:'[Your First Name]',
            lastName: '[Your Last Name]',
            profiles:['User']
        })
    //Meteor._sleepForMs(5000);
    return contacts;
})