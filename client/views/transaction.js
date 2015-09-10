

function compareDates(d1, d2){
    //debugger;

    if(!d1 || !d2) {
        console.log('Compare dates failed');
        return false;
    }

    var same = (d1.getYear() == d2.getYear() &&
    d1.getMonth() == d2.getMonth() &&
    d1.getDate() == d2.getDate());

    console.log('Comparing ' + d1 + ' with ' + d2 + '. Same is ' + same);

    return same;
}

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
        FlowRouter.setQueryParams({stage:this._id, action:null, step:null});
    },
    'keypress #add-stage-text': function (e, t) {

        if (e.which === 13) {
            var id = FlowRouter.getParam("id");

            var stageObj = {};
            stageObj.transactionId = id;
            stageObj.title = e.target.value;
            stageObj.type = ['Stage'];
            stageObj.order = Date.now();

            if(stageObj.title.indexOf('Client') >-1)
                stageObj.type.push('Public');

            var stageId;
            if (e.target.value)
                stageId = Activities.insert(stageObj);

            e.target.value = "";
            FlowRouter.setQueryParams({action: null, stage:stageId, step:null});
        }
    }

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
    },
    isStepActive: function(){
        var stepId = FlowRouter.getQueryParam("step");
        return (this._id == stepId) ? "active": "";
    },
    isSection: function(){
        return (this.type.indexOf('Section') > -1);
    },
    bars: function(){
        var html = '<table style="width:100%;border-spacing: 5px;border-collapse:separate"><tr>'
        for(var col = 1; col <= this.taskCount; col ++){
            var colHtml = '<td class="background-blue" style="height:2px;"></td>';
            if(col > this.taskCompletedCount)
                colHtml = colHtml.replace('blue', 'light-blue');
            html += colHtml;
        }
        html += '</tr></table>';
        return Spacebars.SafeString(html);
    }
});

Template.transactionSteps.events({

    'keypress #add-step-text': function (e, t) {

        if (e.which === 13) {

            var stageDoc = Activities.findOne(FlowRouter.getQueryParam("stage"));


            var act = {};
            var stepName = e.target.value;
            if(stepName.indexOf('-') == 0) {
                act.title = stepName.replace("- ", "").replace("-", "");
                act.type = ['Step', 'Section'];
            } else {
                act.title = stepName;
                act.type = ['Step'];
            }

            if(stageDoc.type.indexOf('Public') > -1)
                act.type.push('Public');

            act.transactionId = FlowRouter.getParam("id");
            act.stageId = stageDoc._id;
            act.order = Date.now();

            if (stepName)
                stepId = Activities.insert(act);


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






Template.transactionDetail.helpers({

    step: function() {
        var stepId = FlowRouter.getQueryParam("step");
        var doc = Activities.findOne(stepId);
        return doc;
    },
    comments: function() {
        var stepId = FlowRouter.getQueryParam("step");
        var csr = Activities.find({stepId:stepId, type:'Comment'},{sort:{createdAt:-1}});
        return csr;
    },
    tasks: function() {
        var stepId = FlowRouter.getQueryParam("step");
        var csr = Activities.find({stepId:stepId, type:'Task'},{sort:{createdAt:1}});
        return csr;
    },
    statusCompleted: function() {
        return (this.status == "Completed");
    }


});

Template.transactionDetail.events({
    'keypress #comment-text': function (e, t) {

        if (e.which === 13) {


            var comment = e.target.value;
            e.target.value = "";
            e.preventDefault();

            if (!comment)
                return;

            var act = {};
            if(comment.indexOf('-') == 0) {
                act.title = comment.replace("- ", "").replace("-", "");
                act.type = ['Task'];
            } else {
                act.description = comment;
                act.title = "to do later";
                act.type = ['Comment'];
            }

            act.transactionId = FlowRouter.getParam("id");
            act.stageId = FlowRouter.getQueryParam("stage");
            act.stepId = FlowRouter.getQueryParam("step");

            var stepObj = Activities.findOne(act.stepId);
            if(stepObj.type.indexOf('Public' > -1))
                act.type.push('Public');

            activityId = Activities.insert(act);

            if(act.type.indexOf('Task') > -1)
                Activities.update({_id:act.stepId},{$inc:{taskCount:1}});

        }

    },
    'click #activity-action': function (e,t){
        Activities.update({_id: this._id},{$set:{status:'Completed'}});
        Activities.update({_id:this.stepId},{$inc:{taskCompletedCount:1}});
    },
    'click .outstanding-menu': function (e,t){
        Activities.update({_id: this._id},{$set:{status:'Outstanding'}});
        Activities.update({_id:this.stepId},{$inc:{taskCompletedCount:-1}});
    }

});
//
Template.transactionDetail.onCreated(function () {



    var self = this;
    self.autorun(function(){
        var stepId = FlowRouter.getQueryParam("step");
        self.subscribe('activitiesForStep', stepId);

    })

});
//
Template.transactionDetail.onRendered(function () {
    setTimeout(function(){
        //removed the date init from here to its own helper
    }, 2000)

});






Template.scheduler.helpers({

    upcomingDays: function (when){
        var today = new Date();
        var days = ['S', 'M', 'T', 'W', 'T', 'F', '-']
        var dt = new Date(today);
        var arr = [];
        for(var i = 0; i < 7; i++){
            dt.setDate(today.getDate()+i);
            var dt1 = new Date(dt.getTime());

            var dayOfWeek = dt.getDay();
            if(dayOfWeek > 0){
                var initial = days[dt.getDay()];
                arr.push({date: dt1, initial: initial});
            }
        }
        return arr
    },

    dayClass: function (){
        var classString = '';
        if(compareDates(this.date, Template.parentData(1).due ))
            classString += 'btn-primary ';

        if(this.initial == '-')
            classString += 'dodgy-hide'

        return classString;
    }

});

Template.scheduler.events({
    'click .day-button': function (e,t){

        var dt = this.date;
        dt.setHours(8,0,0,0);
        var id = FlowRouter.getQueryParam('step');
        //console.log(id);


        Activities.update({_id: id},{$set:{due:dt}});
        setTimeout(function(){
            $('.datepicker').datepicker('update');
        },200);

        //toastr.success('updated date to ' + dt + ' for id ' + id);
    },
    'click #date-expand': function(e,t){
        if($('.datepicker').is(":visible"))
            $('.datepicker').hide(200);
        else
            $('.datepicker').show(200);
    }
})

Template.scheduler.onRendered(function(){
    $('.datepicker').datepicker({
        format: "dd MM yyyy",
        autoclose: true
    }).on('changeDate', function(e){
        console.log(e);
        var id = FlowRouter.getQueryParam('step');
        var dt = e.date.setHours(8);
        Activities.update({_id: id},{$set:{due: e.date}});
        $(this).hide();
    });;
})