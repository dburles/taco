var DateFormats = {
    short: "DD MMMM YYYY",
    long: "dddd DD.MM.YYYY HH:mm"
};

UI.registerHelper("formatDate", function(datetime, format) {
    if (moment && datetime) {
        //debugger;
        f = DateFormats[format];
        var dt = new Date(datetime).toISOString();
        return moment(dt).format(f);
    }
    else {
        return "[No Date]";
    }
});

UI.registerHelper("fromNow", function(datetime) {
    if (moment && datetime) {
        //debugger;
        var dt = new Date(datetime).toISOString();
        return moment(dt).fromNow();
    }
    else {
        return "[No Date]";
    }
});

UI.registerHelper("selectedMatching", function(str1, str1) {
    if (str1 == str2)
        return "selected"
    else
        return "";

});

UI.registerHelper("sessionMatching", function(sessionName, str1) {
    if (Session.get(sessionName) == str1)
        return true
    else
        return false;

});

UI.registerHelper("formType", function(sessionName){
    if (Session.get(sessionName))
        return "edit"
    else
        return "insert";
});

UI.registerHelper('emptyCollection', function(collection) {
    if(collection){
        return (collection.count() == 0);
    }
});

UI.registerHelper('collectionCount', function(collection) {
    if(collection){
        return collection.count();
    }
});

UI.registerHelper('logThis', function() {
    console.log('Logging from the logThis template helper...');
    console.log(this);
});

UI.registerHelper('queryParamExists', function(param) {
    return (FlowRouter.getQueryParam(param));
});

UI.registerHelper('equals', function (a, b) {
    return a === b;
});

UI.registerHelper('hasType', function (typeName) {
    return (this.type.indexOf(typeName) > -1)

});


