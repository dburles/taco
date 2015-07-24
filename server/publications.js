Meteor.publish("contactSearch", function(searchText){

    searchText = searchText || "";

    if(searchText.length < 3)
        return Contacts.find({}, {limit:20});

    searchArr = searchText.split(" ");

    if(searchArr.length == 2 && searchArr[1].length > 0)
        return Contacts.find({
            firstName: new RegExp("^" + searchArr[0] + '.*', "i"),
            lastName: new RegExp("^" + searchArr[1] + '.*', "i")
        });
    else
        return Contacts.find({$or:[
            {firstName: new RegExp("^" + searchText + '.*', "i")},
            {lastName: new RegExp("^" + searchText + '.*', "i")}
        ]});
})