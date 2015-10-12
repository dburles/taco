emailSending = {};

Template.tasks.helpers({
    title: function() {
        var viewName = FlowRouter.getQueryParam("view");
        if(!viewName)
            viewName = "Due"
        return viewName + ' Tasks';
    },
    tasks: function() {
        return Activities.find({type:'Step'}, {limit: 100, sort: {due: -1}});
    },
    selectedBox: function() {
        //var thisId = this._id;
        //var SelectedActivities = Session.get("SelectedActivities");
        //return (SelectedActivities.indexOf(thisId) > -1) ? "selected-box": "";
        return (SelectedActivities.findOne({_id:this._id})) ? "selected-box": "";
    },
    selectedTick: function() {
        //var thisId = this._id;
        //var SelectedActivities = Session.get("SelectedActivities");
        //return (SelectedActivities.indexOf(thisId) > -1) ? "selected-box": "";
        return (SelectedActivities.findOne({_id:this._id})) ? "color-blue": "light-text";
    },
    SelectedActivitiesCount: function() {
        //var SelectedActivities = Session.get("SelectedActivities");
        //return SelectedActivities.length;
        return SelectedActivities.find().count();
    },
    twoSelectedActivities: function() {
        //var SelectedActivities = Session.get("SelectedActivities");
        return SelectedActivities.find().count() == 2 ? true : false;
    },
    oneSelectedTask: function() {
        //var SelectedActivities = Session.get("SelectedActivities");
        return SelectedActivities.find().count() == 1 ? true : false;
    },
    searchText: function() {

        return FlowRouter.getQueryParam("search"); //Session.get("searchText");
    },
    labelClass: function() {
        if(this == "Clients")
            return "label-primary";
        else
            return "label-light";
    }

});


Template.tasks.events({


    //Search bar events

    'keyup #txtTaskSearch': function (e, t) {
        event.preventDefault();
        var searchText = $("#txtTaskSearch").val();
        if(searchText === "")
            searchText = null;
        Session.set("searchText", searchText);
        FlowRouter.setQueryParams({search: searchText})
    },
    'click #clearSearchButton': function (e, t) {
        event.preventDefault();
        FlowRouter.setQueryParams({search:null});
        //Session.set("searchText");
    },
    'click .profileMenuItem': function (e, t) {
        event.preventDefault();
        //debugger;
        FlowRouter.setQueryParams({profile: this.name})
    },
    'click .profileAllMenuItem': function (e, t) {
        event.preventDefault();
        //debugger;
        FlowRouter.setQueryParams({profile: null})
    },
    'click #addTaskButton': function (e, t) {
        e.preventDefault();
        //Session.set("action", "newTask");
        //Session.set("editingTask");
        //Modal.show('TaskModal');
        var TaskModalData = {
            formType: "insert",
            Task: null
        }

        Modal.show('TaskModal', TaskModalData);
    },

    'dblclick .selectable': function (e, t) {
        e.preventDefault();
        Meteor.call('latestTransactionForTask', function(err, result){
            if(result)
                FlowRouter.go('/transactions/' + result);
        })

    },

    'click #callTaskButton': function (e, t) {
        e.preventDefault();
        Session.set("oneTask", this);
        Modal.show('callModal');
    },
    'click #sendSMSMenu': function (e, t) {
        e.preventDefault();
        Meteor.call('sendEmail', 'matt.ireland@mortgagechoice.com.au', 'matt.ireland@mortgagechoice.com.au', 'test email', 'test body');
        toastr.success('sent?')
    },
    'click #newTransactionMenu': function (e, t) {
        e.preventDefault();
        SelectedActivities.clear();
        SelectedActivities.insert({
            _id:this._id,
            firstName:this.firstName,
            lastName:this.lastName,
            email:this.email
        });
        var transactionContext = {
            //clientNames: this.name(),  //dont need this i think?
            transaction: {
                client: this.name
            }
        }

        Modal.show('transactionModal', transactionContext);
    },

    'click #addToProfileMenu': function (e, t) {
        e.preventDefault();

        Modal.show('profilesModal', {
            mode: "Add"
        });
    },

    'click #removeFromProfileMenu': function (e, t) {
        e.preventDefault();

        Modal.show('profilesModal', {
            mode: "Remove"
        });
    },

    'click #newJointTransactionMenu': function (e, t) {
        e.preventDefault();
        SelectedActivities.clear();
        SelectedActivities.insert({
            _id:this._id,
            firstName:this.firstName,
            lastName:this.lastName,
            email:this.email
        });
        SelectedActivities.insert({
            _id:this.partnerId,
            firstName:this.partnerFirstName,
            lastName:this.partnerLastName,
            email:this.partnerEmail
        });
        var transactionContext = {
            clientNames: this.jointFullName(),
            transaction: {
                client: this.jointFullName()
            }
        }

        Modal.show('transactionModal', transactionContext);
    },
    'click #editTaskMenu': function (e, t) {
        e.preventDefault();

        var TaskModalData = {
            formType: "update",
            Task: this
        }

        Modal.show('TaskModal', TaskModalData);
    },
    'click #emailTaskButton': function (e, t) {
        e.preventDefault();
        var emailId = Emails.insert({
            subject: "test subject"
        });
        emailSending = Emails.findOne(emailId);
        Modal.show('emailModal');
    },
    'click #createCoupleButton': function (e, t) {
        e.preventDefault();
        //Session.set("action", "newTask");
        //var SelectedActivities = Session.get("SelectedActivities");
        if(SelectedActivities.find().count() == 2){
            var SelectedActivitiesArray = SelectedActivities.find().fetch();
            Meteor.call('createCouple', SelectedActivitiesArray[0]._id, SelectedActivitiesArray[1]._id)
        }
    },
    'click #divorceMenu': function (e, t) {
        e.preventDefault();
        var TaskId = this._id;
        bootbox.confirm("Are you sure you want to bust these 2 up?", function(result) {
            if(result)
                Meteor.call('divorce', TaskId);
        });

    },
    'click .selectable': function(e, t){
        e.preventDefault();
        if(SelectedActivities.findOne({_id:this._id}))
            SelectedActivities.remove(this._id)
        else {
            SelectedActivities.insert({
                _id: this._id,
                firstName: this.firstName,
                lastName: this.lastName,
                email: this.email
            })
            //FlowRouter.setQueryParams({Task: this._id})
        }


    },
    //'click .clickable': function(e, t){
    //        FlowRouter.go("/Tasks/" + this._id)
    //},
    'click #viewSelectedMenu': function (e, t) {
        e.preventDefault();
        //Session.set("action", "newTask");
        //Session.set("searchText", "selected");
        FlowRouter.setQueryParams({search:"selected"});
    },
    'click #clearSelectionMenu': function (e, t) {
        e.preventDefault();
        if(Session.get("searchText") == "selected")
            Session.set("searchText");
        //Session.set("SelectedActivities", []);
        //var TaskCursor = ;
        SelectedActivities.clear();
    }

});

Template.tasks.onCreated(function () {

    // Use this.subscribe inside onCreated callback

    var self = this;

    self.autorun(function () {
        var searchText = FlowRouter.getQueryParam("search"); //Session.get("searchText");
        var viewName = FlowRouter.getQueryParam("view");

        self.subscribe('tasksSearch', searchText, viewName);
    });

});

Template.tasks.rendered = function(){
    //$('[data-toggle="tooltip"]').tooltip();
    $("#buttonBar").sticky({topSpacing:0});
}

SelectedActivities.clear = function(){
    SelectedActivities.find().forEach(function (Task) {
        SelectedActivities.remove(Task._id);
    });
}

SelectedActivities.getOne = function() {
    var doc = SelectedActivities.find().fetch()[0]
    return doc;
}



Template.TaskGroups.helpers({

    labelClass: function() {
        if(this == "Clients")
            return "label-primary";
        else
            return "label-light";
    }

});
