Template.checklist.helpers({
    transaction: function () {
        var id = FlowRouter.getParam("id");
        var doc = Transactions.findOne(id);
        return doc;
    },
    steps: function() {
        var id = FlowRouter.getParam("id");

        return Activities.find({transactionId: id});
    },
    tasks: function() {
        var id = FlowRouter.getQueryParam("doc");
        return Activities.find({
            $and: [
                {stepId:id},
                {stepId:{$ne:null}},
                {type:'Task'}
            ]});
    },
    comments: function() {
        var id = FlowRouter.getQueryParam("doc");
        return Activities.find({
            $and: [
                {stepId:id},
                {stepId:{$ne:null}},
                {type:'Comment'}
            ]});
    },
    checkedIfComplete: function() {
        if(this.status == "Completed")
            return "checked"
        else
            return "";
    },
    responsiveClass: function(side) {
        var doc = FlowRouter.getQueryParam("doc");
        if(doc)
            if(side == 'left')
                return 'hide-on-mobile';
            else
                return '';
        else
            if(side == 'left')
                return '';
            else
                return 'hide-on-mobile';
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
    },
    'click .expand-activity': function (e, t) {

        //if($(e.target).hasClass("dropup")) {
        //    alert('already up');
        //}
        //else
        //{
        //    $(e.target).addClass("dropup");
        //    var el = t.find('.activity-item');
        //    Blaze.render(Template.activityDetail, e.target);
        //}
    }});

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
    this.subscribe("stepsForStageName", id, "Checklist"); //clientDocuments
});



Template.activityDetail.helpers({
    document: function () {
        var id = FlowRouter.getQueryParam("doc");
        var doc = Activities.findOne(id);
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
                {stepId:id},
                {stepId:{$ne:null}},
                {type:'Task'}
            ]});
    },
    comments: function() {
        var id = FlowRouter.getQueryParam("doc");
        return Activities.find({
            $and: [
                {stepId:id},
                {stepId:{$ne:null}},
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

Template.activityDetail.events({

    'click #back-to-list': function (e, t) {
        FlowRouter.setQueryParams({doc:null});
    }
});