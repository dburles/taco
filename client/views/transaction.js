

Template.transaction.helpers({
    transaction: function () {
        var id = FlowRouter.getParam("id");
        var doc = Transactions.findOne(id);
        return doc;
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
    'click #transaction-heading': function () {
        var transactionContext = {
            type: 'update',
            transaction: this
        }

        Modal.show('transactionModal', transactionContext);
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
            stageObj.text = e.target.value;
            stageObj.type = ['Stage'];
            stageObj.order = Date.now();

            if(stageObj.text.indexOf('Client') >-1)
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

    var id = FlowRouter.getParam("id");

    this.subscribe("oneTransaction", id);
    this.subscribe("membersForTransaction", id);
    this.subscribe("stagesForTransaction", id);
    this.subscribe("stepsForTransaction", id)

    //var self = this;
    //self.autorun(function(){
    //    var stageId = FlowRouter.getQueryParam("stage");
    //    self.subscribe("stepsForStage", stageId);
    //
    //})

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

        if(!this.due)
            return "";


        var html = '<div>';
        //debugger;

        var colourStr = 'background-light-' + DateHelpers.colourForDate(this.due);
        if(this.status && this.status.indexOf('Completed') > -1)
            colourStr = colourStr.replace("-light", "");

        html += '<div class="' + colourStr + '" style="display:inline-block;height:7px;width:60px;border-radius:3px"></div>';


        for(var col = 1; col <= this.taskCount; col ++){
            var tmpHtml = '<div class="background-' + DateHelpers.colourForDate(this.due) + '" style="display:inline-block;height:7px;width:20px;border-radius:3px;margin-left:5px;"></div>';

            if(col > this.taskCompletedCount)
                tmpHtml = tmpHtml.replace('background', 'background-light');

            html += tmpHtml;
        }

        html += '</div>';
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
                act.text = stepName.replace("- ", "").replace("-", "");
                act.type = ['Step', 'Section'];
            } else {
                act.text = stepName;
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
    //var self = this;
    //self.autorun(function(){
    //    var stageId = FlowRouter.getQueryParam("stage");
    //    self.subscribe("stepsForStage", stageId);
    //
    //})

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

        if(!stepId)
            return null;

        var doc = Activities.findOne(stepId);
        return doc;
    },
    comments: function() {
        var stepId = FlowRouter.getQueryParam("step");
        if(!stepId)
            return null;

        var csr = Activities.find({stepId:stepId, type:'Comment'},{sort:{createdAt:-1}});
        return csr;
    },

    tasks: function() {
        var stepId = FlowRouter.getQueryParam("step");

        if(!stepId)
            return null;

        var csr = Activities.find({stepId:stepId, type:'Task'},{sort:{createdAt:1}});
        return csr;
    },
    statusCompleted: function() {
        return (this.status == "Completed");
    },
    formattedTaskText: function(){
        var html = this.text;
        if(this.status == 'Not Applicable')
            html = '<span class="strikethrough color-grey">' + html + '</span>';
        if(this.type.indexOf('Important') > -1)
            html = '<span class="label label-primary">Important</span>&nbsp;' + html;

        return Spacebars.SafeString(html);

    },
    visual: function() {
        if (this.status == "Completed")
            return "green";
        if(this.status == "Not Applicable")
            return "cross";
        if(this.taskCount > 0 && this.taskCompletedCount < this.taskCount && this.taskCompletedCount > 0)
            return "chart";
        return 'light-grey';
    },
    isShared: function(){
        return (this.sharing == 'Shared' || this.sharing == 'Shared All');
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
                act.text = comment.replace("- ", "").replace("-", "");
                act.type = ['Task'];
            } else {
                act.text = comment;
                act.type = ['Comment'];
            }

            act.transactionId = FlowRouter.getParam("id");
            act.stageId = FlowRouter.getQueryParam("stage");
            act.stepId = FlowRouter.getQueryParam("step");

            var stepObj = Activities.findOne(act.stepId);
            if(stepObj.type.indexOf('Public') > -1)
                act.type.push('Public');

            activityId = Activities.insert(act);

            if(act.type.indexOf('Task') > -1)
                Activities.update({_id:act.stepId},{$inc:{taskCount:1}});

        }

    },
    'click #activity-action': function (e,t){
        Meteor.call('completeTask', this)
    },
    'click .outstanding-menu': function (e,t){
        Meteor.call('uncompleteTask', this)
    },
    'click .important-menu': function (e,t){
        e.preventDefault();
        Meteor.call('importantActivity', this)
    },
    'click .shared-menu': function (e,t){
        e.preventDefault();
        if(this.sharing == 'Shared')
            Activities.update({_id:this._id},{$set:{"sharing":"None"}});
        else
            Activities.update({_id:this._id},{$set:{"sharing":"Shared"}});
    },
    'click .delete-activity-menu': function (e,t){
        e.preventDefault();
        var self = this;
        bootbox.confirm("Are you sure you want to delete?", function(result) {
            if(result){
                Meteor.call('deleteActivity', self)
            }
        });
    },
    'click .not-applicable-menu': function (e,t){
        e.preventDefault();
        Meteor.call('notApplicable', this);
    },
    'click .convert-task-menu': function (e,t){
        e.preventDefault();
        Meteor.call('convertToTask', this);
    },
    'click .edit-comment-menu': function (e,t) {
        e.preventDefault();
        Modal.show('activityModal', this);
    },
    'click .promote-step-menu': function (e,t){
        e.preventDefault();
        Meteor.call('promoteToStep', this)
        FlowRouter.setQueryParams({step: this._id});
    },
    'click #complete-step-button': function (e,t){
        e.preventDefault();
        Meteor.call('toggleStepStatus', this)
    },
    'click #step-heading': function () {
        Modal.show('stepModal', this);
    },
    'click #cancel-step': function () {
        Modal.hide('stepModal');
    },
    'click #save-sharing-button': function (e,t) {
        e.preventDefault();
        $('#sharingForm').submit();
    },
    'click #cancel-sharing-button': function (e,t) {
        e.preventDefault();
        $('#sharingButton').popover('hide');

    },
    'click #testButton': function (e,t) {
        e.preventDefault();
        Meteor.call('collegues', function(err,result){
            console.log(result);
        });

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
Template.assignButton.onRendered(function () {


    $("[data-toggle=popover]").popover({
        html: true,
        content: function() {
            divId = $(this).data('div');
            return $('#' + divId).html();
        }
    });

});


Template.assignButton.helpers({
    collegues: function() {
        var collegues = Profile.TeamContacts();
        return collegues;
    },
    assignedToName: function() {
        var contact = Contacts.findOne({_id:this.assignedTo});
        if(contact)
            return contact.firstName;
        else
            return 'Unassigned';
    }
});

Template.assignButton.events({
    'click .assign-selector': function (e, t) {
        event.preventDefault();
        var contactId = this._id;
        var stepId = Template.parentData(0)._id;
        Meteor.call('assignStep', stepId, contactId);
        //toastr.success("Assigning Contact " + contactId + ' to step ' + stepId);
    }
});

Template.assignButton.onCreated(function () {
    //var self = this;
    //self.autorun(function () {
    //    var groupName = FlowRouter.getQueryParam("group");
    //    self.subscribe('contactsSelected', selectedContacts);
    //});
});




Template.stepChart.onRendered(function () {

    Tracker.autorun(function(){

        var stepId = FlowRouter.getQueryParam('step');
        if(!stepId) return;

        var step = Activities.findOne(stepId);

        if(step.status && steps.status == 'Completed') return;

        var data = [
            {
                value: step.taskCompletedCount,
                color:"#337ab7",
                highlight: "#58ACFA",
                label: "Done"
            },
            {
                value: step.taskCount - step.taskCompletedCount,
                color: "#A9D0F5",
                highlight: "#5AD3D1",
                label: "Outstanding"
            }
        ];

        var el = document.getElementById("myChart")
        if(el) {
            var ctx = el.getContext("2d");
            ctx.canvas.width = 50;
            ctx.canvas.height = 50;
            //debugger;
            var myPieChart = new Chart(ctx).Pie(data, {
                animateRotate: false,
                animateScale: false,
                responsive: false,
                maintainAspectRatio: false,
                showTooltip: false,
                tooltipTemplate: ""
            });
        }


    })


});






Template.scheduler.helpers({

    upcomingDays: function (when){
        var days = ['S', 'M', 'T', 'W', 'T', 'F', '-']
        var arr = [];
        for(var i = 0; i < 7; i++){
            var dt = moment().add(i, 'days');
            if(dt.weekday() > 0){
                var initial = days[dt.weekday()];
                arr.push({date: dt.toDate(), initial: initial});
            }
        }
        return arr
    },

    dayClass: function (){
        var classString = '';
        if(DateHelpers.compareDates(this.date, Template.parentData(1).due ))
            classString += 'btn-primary ';

        if(this.initial == '-')
            classString += 'dodgy-hide'

        return classString;
    },

    colour: function(due){
        return DateHelpers.colourForDate(due);
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


Template.transactionMembers.helpers({
    members: function() {
        var id = FlowRouter.getParam("id");
        return Members.find({transactionId: id});
    },
    roles: function() {
        var roles =  ApplicationHelpers.Roles();
        return roles;
    }
});

Template.transactionMembers.events({
    'click .edit-contact-menu': function (e, t) {

        e.preventDefault();
        //var contact = Contacts.findOne({_id: this.contactId});

        Meteor.call('getContact', this.contactId, function(err, result){
            if(result){
                var contactModalData = {
                    formType: "update",
                    contact: result
                }

                Modal.show('contactModal', contactModalData);
            }

        })


    },
    'click .add-role-menu': function (e, t) {
        e.preventDefault();

        var role = e.target.innerText;
        var profile;

        if(role != 'Other')
            profile = role;
        else
            profile = null;

        FlowRouter.setQueryParams({profile: profile});

        var contactSelectorData = {
            formType: "insert",
            role: role,
            profile:profile
        }

        Modal.show('contactSelector', contactSelectorData);
    },
    'click .remove-association-menu': function (e, t) {
        e.preventDefault();
        var id = this._id;
        bootbox.confirm("Are you sure you want to remove this contact from this transaction?", function(result) {
            if(result)
                Meteor.call('removeMember', id);
        });

    }
})


Template.stageSummary.helpers({
    activeStage: function() {
        var stageId = FlowRouter.getQueryParam("stage");
        var stage = Activities.findOne(stageId);
        return stage;
    }
});

Template.stageSummary.events({
    'click .sharing-label': function (e, t) {
        event.preventDefault();
        Meteor.call('shareActivity', this);
    },
    'click #stage-heading': function () {
        //debugger;
        Modal.show('stepModal', this);
    }
});

Template.stageSummary.onCreated(function () {
    //var self = this;
    //self.autorun(function () {
    //    var groupName = FlowRouter.getQueryParam("group");
    //    self.subscribe('contactsSelected', selectedContacts);
    //});
});

Template.stageSummary.onRendered(function () {
    //do something...
});