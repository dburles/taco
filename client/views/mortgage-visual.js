Template.mortgageVisual.helpers({
    mortgage: function() {
        var id = FlowRouter.getParam("id");
        return Mortgages.findOne({transactionId:id})
    }
});

Template.mortgageVisual.events({
    //'click #clearSearchButton': function (e, t) {
    //    event.preventDefault();
    //}
});

Template.mortgageVisual.onCreated(function () {

        var transactionId = FlowRouter.getParam("id");
        this.subscribe('mortgagesForTransaction', transactionId);

});

Template.mortgageVisual.onRendered(function () {
    //do something...
});