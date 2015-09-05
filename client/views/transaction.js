Template.transaction.helpers({
    transaction: function () {
        var id = FlowRouter.getParam("id");
        var doc = Transactions.findOne(id);
        return doc;
    },
    members: function() {
        var id = FlowRouter.getParam("id");
        return Members.find({transactionId: id});
    },
    addingStage: function() {
        var action = FlowRouter.getQueryParam("action");
        return (action == 'add-stage');
    },
    stages: function() {
        var id = FlowRouter.getParam("id");
        var csr = Activities.find({transactionId:id, type:'Stage'}, {sort: {order: 1}});
        return csr;
    },
    steps: function() {
        var stageId = FlowRouter.getQueryParam("stage");
        var csr = Activities.find({stageId:stageId, type:'Step'}, {sort: {order: 1}});
        return csr;
    },
    isTabActive: function() {
        var stage = FlowRouter.getQueryParam("stage");
        return (stage == this._id) ? "active" : "";
    }
});

Template.transaction.events({
    'click button': function () {
        //do something
    },
    'click #add-stage-link': function (e,t) {
        e.preventDefault();
        FlowRouter.setQueryParams({action:'add-stage'});
        $('#add-stage-text').focus();
    },
    'click .stage-tab': function (e,t) {
        e.preventDefault();
        FlowRouter.setQueryParams({stage:this._id, action:null});
    },
    'keypress #add-stage-text': function (e, t) {

        if (e.which === 13) {
            var id = FlowRouter.getParam("id");

            var stageName = e.target.value;

            var stageId;
            if (stageName)
                stageId = Activities.insert({
                    transactionId: id,
                    title: stageName,
                    type: ['Stage'],
                    order: Date.now()
                });

            e.target.value = "";
            FlowRouter.setQueryParams({action: null, stage:stageId});
        }
    }
    //'keypress #add-step-text': function (e, t) {
    //
    //        if (e.which === 13) {
    //            var id = FlowRouter.getParam("id");
    //
    //            var stageId = FlowRouter.getQueryParam("stage");
    //            var stepName = e.target.value;
    //            var stepId;
    //
    //            if (stepName)
    //                stepId = Activities.insert({
    //                    transactionId: id,
    //                    stageId: stageId,
    //                    title: stepName,
    //                    type: ['Step'],
    //                    order: Date.now()
    //                });
    //
    //            e.target.value = "";
    //            FlowRouter.setQueryParams({step: stepId});
    //
    //        }
    //
    //},
    //'click .step-item': function (e,t) {
    //    e.preventDefault();
    //    FlowRouter.setQueryParams({step:this._id});
    //}
});

Template.transaction.onCreated(function () {
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
    this.subscribe("membersForTransaction", id);
    this.subscribe("stagesForTransaction", id);

    var self = this;
    self.autorun(function(){
        var stageId = FlowRouter.getQueryParam("stage");
        self.subscribe("stepsForStage", stageId);

    })

});

Template.transaction.onRendered(function () {

    setTimeout( function () {


        this.$('.sortable-activities').sortable({
            items: "li:not(.unsortable)",
            stop: function(e, ui) {
                // get the dragged html element and the one before
                //   and after it
                el = ui.item.get(0)
                before = ui.item.prev().get(0)
                after = ui.item.next().get(0)

                //  Blaze.getData takes as a parameter an html element
                //    and will return the data context that was bound when
                //    that html element was rendered!
                var newRank;
                var beforeRank;
                var afterRank;
                if (!before) {
                    //if it was dragged into the first position grab the
                    // next element's data context and subtract one from the rank
                    newRank = Blaze.getData(after).order - 100 || Date.now();
                } else if (!after) {
                    //if it was dragged into the last position grab the
                    //  previous element's data context and add one to the rank
                    newRank = (Blaze.getData(before).order + 100) || Date.now()
                }
                else
                {
                    afterRank = Blaze.getData(after).order || Date.now();
                    beforeRank = Blaze.getData(before).order || Date.now();
                    newRank = Math.round( (beforeRank + afterRank) / 2);
                }


                //update the dragged Item's rank
                Activities.update({_id: Blaze.getData(el)._id}, {$set: {order: newRank}})

            }
        });
    },1000)
});

Template.transactionSteps.helpers({

    steps: function() {
        var stageId = FlowRouter.getQueryParam("stage");
        var csr = Activities.find({stageId:stageId, type:'Step'}, {sort: {order: 1}});
        return csr;
    }
});

Template.transactionSteps.events({

    'keypress #add-step-text': function (e, t) {

        if (e.which === 13) {
            var id = FlowRouter.getParam("id");

            var stageId = FlowRouter.getQueryParam("stage");
            var stepName = e.target.value;
            var stepId;

            if (stepName)
                stepId = Activities.insert({
                    transactionId: id,
                    stageId: stageId,
                    title: stepName,
                    type: ['Step'],
                    order: Date.now()
                });

            e.target.value = "";
            FlowRouter.setQueryParams({step: stepId});

        }

    },
    'click .step-item': function (e,t) {
        e.preventDefault();
        FlowRouter.setQueryParams({step:this._id});
    }
});

Template.transactionSteps.onCreated(function () {
    var self = this;
    self.autorun(function(){
        var stageId = FlowRouter.getQueryParam("stage");
        self.subscribe("stepsForStage", stageId);

    })

});

Template.transactionSteps.onRendered(function () {

    setTimeout( function () {


        this.$('.sortable-activities').sortable({
            items: "li:not(.unsortable)",
            stop: function(e, ui) {
                // get the dragged html element and the one before
                //   and after it
                el = ui.item.get(0)
                before = ui.item.prev().get(0)
                after = ui.item.next().get(0)

                //  Blaze.getData takes as a parameter an html element
                //    and will return the data context that was bound when
                //    that html element was rendered!
                var newRank;
                var beforeRank;
                var afterRank;
                if (!before) {
                    //if it was dragged into the first position grab the
                    // next element's data context and subtract one from the rank
                    newRank = Blaze.getData(after).order - 100 || Date.now();
                } else if (!after) {
                    //if it was dragged into the last position grab the
                    //  previous element's data context and add one to the rank
                    newRank = (Blaze.getData(before).order + 100) || Date.now()
                }
                else
                {
                    afterRank = Blaze.getData(after).order || Date.now();
                    beforeRank = Blaze.getData(before).order || Date.now();
                    newRank = Math.round( (beforeRank + afterRank) / 2);
                }


                //update the dragged Item's rank
                Activities.update({_id: Blaze.getData(el)._id}, {$set: {order: newRank}})

            }
        });
    },100)
});
