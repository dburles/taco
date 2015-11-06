ContactHelpers = {
    getSearchObject:function(searchText,profileName) {
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
        return searchObject;
    }
}