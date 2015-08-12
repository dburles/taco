Template.transaction.helpers({
    transaction: function () {
        debugger;
        return Transaction.findOne(this.params.query._id);
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

    var self = this;

    // Use self.subscribe with the data context reactively
    self.autorun(function () {
        self.subscribe("oneTransaction", Router.getCurrent().params._id);
    });
});