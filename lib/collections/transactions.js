Transactions = new Mongo.Collection("transactions");

//Transactions.deny({
//    insert: function (userId, doc) {
//        doc.createdAt = new Date();
//        return false;
//    }
//})
//
//Transactions.allow({
//    insert: function (userId, doc) {
//        return true;
//    }
//})
//
//Transactions.allow({
//    remove: function (userId, doc) {
//        return true;
//    }
//})

transactionsSchema = new SimpleSchema({
    client: {
        type: String,
        label: "Client Name/s",
        max: 300,
        optional: false
    },
    title: {
        type: String,
        label: "Title",
        max: 100,
        optional: false
    },
    description: {
        type: String,
        label: "Description",
        max: 500,
        optional: true,
        autoform: {
            afFieldInput: {
                type: 'textarea',
                rows: 4
            }
        }
    },
    leadSource:{
        type: String,
        optional: true,
        autoform: {
            options: function () {
                return ApplicationHelpers.LeadSourceOptions();
            }
        }
    },
    transactionProfiles:{
        type:[String],
        optional: true,
        autoform: {
            type: "select-checkbox",
            options: function () {
                return ApplicationHelpers.transactionProfileOptions();
            }
        }
    }
});

Transactions.attachSchema(transactionsSchema);

Transactions.helpers({
    clients: function(){
        return Members.find({transactionId:this._id, role:'Client'});
    },
    getClientNames: function(){
        var clientCount = this.clients().count();
        if(clientCount > 1)
            return this.clients().fetch()[0].contactName + ' & ' + this.clients().fetch()[1].contactName;
        if(clientCount > 0)
            return this.clients().fetch()[0].contactName;
        else
            return '[No Clients]';
    },
    updateClientNames: function(){
        Transactions.update({_id:this._id}, {$set:{client:this.getClientNames()}});
    }
    //transactionProfileOptions: function(){
    //    var teamTypes = Profile.Team().transactionTypes;
    //    var tranTypes = this.transactionTypes;
    //    teamTypes.forEach(function(teamType) {
    //        console.log(teamType)
    //    })
    //    return [{label:'a', value: 'a'},{label:'b', value: 'b'}]
    //}
});

