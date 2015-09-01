Template.checklist.helpers({
    transaction: function () {
        var id = FlowRouter.getParam("id");
        var doc = Transactions.findOne(id);
        return doc;
    },
    activities: function() {
        var id = FlowRouter.getParam("id");
        return Activities.find({transactionId: id, type: "Client Document", parentId: null});
    },
    tasks: function() {
        var id = FlowRouter.getQueryParam("doc");
        return Activities.find({
            $and: [
                {parentId:id},
                {parentId:{$ne:null}},
                {type:'Task'}
            ]});
    },
    comments: function() {
        var id = FlowRouter.getQueryParam("doc");
        return Activities.find({
            $and: [
                {parentId:id},
                {parentId:{$ne:null}},
                {type:'Comment'}
            ]});
    },
    checkedIfComplete: function() {
        if(this.status == "Completed")
            return "checked"
        else
            return "";
    }
});

Template.checklist.events({
    'keypress #txtAdd': function (e, t) {
        if (e.which === 13) {
           var id = FlowRouter.getParam("id");

           Activities.insert({
               transactionId: id,
               title: e.target.value,
               type: ['Client Document']
           })

            e.target.value = "";
            e.preventDefault();
        }
    },
    'keypress #txtComment': function (e, t) {
        if (e.which === 13) {
            var id = FlowRouter.getParam("id");
            var parentId = FlowRouter.getQueryParam("doc")
            var activityType = FlowRouter.getQueryParam("add") || "Comment";
            var activityTypes = ['Client Document', activityType];

            Activities.insert({
                transactionId: id,
                parentId: parentId,
                title: e.target.value,
                type: activityTypes
            })

            e.target.value = "";
            e.preventDefault();
        }
    },
    'click .client-document': function (e, t) {
        FlowRouter.setQueryParams({doc:this._id});
    },
    'click #taskButton': function (e, t) {
        FlowRouter.setQueryParams({add:'Task'});
    },
    'click #commentButton': function (e, t) {
        FlowRouter.setQueryParams({add:'Comment'});
    },
    'click #documentButton': function (e, t) {
        FlowRouter.setQueryParams({add:'Document'});
    },
    'click .task-checkbox': function (e, t) {
        var status = (e.target.checked) ? "Completed": "";
        Activities.update({_id:this._id}, {$set: {status: status}});
    }
});

Template.checklist.onCreated(function () {
    //debugger
    //var dataContext = Template.currentData();
    //this.subscribe("oneTransaction", dataContext._id);

    //var self = this;
    //// Use self.subscribe with the data context reactively
    //self.autorun(function () {
    //    var id = FlowRouter.getParam("id");
    //
    //    self.subscribe("oneTransaction", id);
    //});

    var id = FlowRouter.getParam("id");

    this.subscribe("oneTransaction", id);
    this.subscribe("activities", id); //clientDocuments
});