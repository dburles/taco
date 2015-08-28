Template.main.onCreated(function () {

    // Use this.subscribe inside onCreated callback

    var self = this;

    self.autorun(function () {
        var searchText = FlowRouter.getQueryParam("search"); //Session.get("searchText");
        var groupName = FlowRouter.getQueryParam("group");

        if(searchText == "selected"){

            //var selectedContacts = Session.get("selectedContacts");
            var selectedContacts = [];
            SelectedContacts.find().forEach(function (contact) {
                selectedContacts.push(contact._id);
            });
            self.subscribe('contactsSelected', selectedContacts);
        }
        else {
            self.subscribe('contactsSearch', searchText, groupName);

        }
    });



});