Template.transactionModal.helpers({
    //editingtransactionDocument: function () {
    //    var editingtransaction = Session.get("editingtransaction");
    //    var editingtransactionDocument = transactions.findOne(editingtransaction);
    //    console.log(editingtransactionDocument);
    //    return editingtransactionDocument;
    //},
    //formType: function(){
    //    var editingtransaction = Session.get("editingtransaction");
    //    if(editingtransaction)
    //        return "update"
    //    else
    //        return "insert"
    //}
});

Template.transactionModal.events({
    'click #canceltransaction': function (e, t) {
        event.preventDefault();
        AutoForm.resetForm('transactionForm');
        Modal.hide("transactionModal");
    },
    'click #savetransaction': function (e, t) {

    }
});