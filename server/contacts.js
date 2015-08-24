Meteor.publish("contactsSearch", function(searchText, groupName){

    searchText = searchText || "";
    //groupName = groupName || "";

    var searchObject = {};
    if(groupName)
        searchObject.groups = groupName;

    if(searchText.length < 3)
        return Contacts.find({groups:groupName}, {limit:10, sort: {updatedAt: -1}});

    searchArr = searchText.split(" ");

    if(searchArr.length == 2 && searchArr[1].length > 0)
        return Contacts.find({
            firstName: new RegExp("^" + searchArr[0] + '.*', "i"),
            lastName: new RegExp("^" + searchArr[1] + '.*', "i"),
            groups: groupName
        }, {limit:10, sort: {createdAt: -1}});
    else
        return Contacts.find({

            $or:[
            {firstName: new RegExp("^" + searchText + '.*', "i")},
            {lastName: new RegExp("^" + searchText + '.*', "i")},],
            groups:groupName

        }, {limit:10, sort: {createdAt: -1}});
})

Meteor.publish("contactsSelected", function(selectedContacts){

    return Contacts.find({ _id: { $in: selectedContacts } }, {limit:10, sort: {updatedAt: -1}});

})

