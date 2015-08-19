Template.transaction.helpers({
    transaction: function () {
        var id = FlowRouter.getParam("id");
        var doc = Transactions.findOne(id);
        return doc;
    },
    participants: function() {
        var id = FlowRouter.getParam("id");
        return Participants.find({transactionId: id});
    }
});

Template.transaction.events({
    'click button': function () {
        //do something
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
    this.subscribe("participantsForTransaction", id);
});