Template.profile.helpers({
    profile: function() {
        var id = FlowRouter.getParam("id");
        var doc =  Profiles.findOne(id);
        return doc;
    },
    contacts: function(){
        var id = FlowRouter.getParam("id");
        var docs = ProfileContacts.find({profileId:id});
        return docs;
    },
    properties: function(){
        var id = FlowRouter.getParam("id");
        var docs = ProfileProperties.find({profileId:id});
        return docs;
    },
    mortgages: function(){
        var id = FlowRouter.getParam("id");
        var docs = ProfileLiabilities.find({profileId:id, type:'Mortgage'});
        return docs;
    },
    loans: function(){
        var id = FlowRouter.getParam("id");
        var docs = ProfileLiabilities.find({profileId:id, type:'Loan'});
        return docs;
    },
    cards: function(){
        var id = FlowRouter.getParam("id");
        var docs = ProfileLiabilities.find({profileId:id, type:'Card'});
        return docs;
    },
    incomes: function(){
        var profileContactId = this._id;
        var docs = ProfileIncomes.find({profileContactId:profileContactId});
        return docs;
    },
    kids: function(){
        var id = FlowRouter.getParam("id");
        var docs = ProfileKids.find({profileId:id});
        return docs;
    },

    formId: function(){
        return 'profile-properties-' + this._id;
    }
});

Template.profile.events({
    'click #add-property-button': function (e, t) {
        event.preventDefault();
        var id = FlowRouter.getParam("id");
        ProfileProperties.insert({
            profileId: id
        })
    },
    'click .delete-property-button': function (e, t) {
        event.preventDefault();
        ProfileProperties.remove(this._id);
    },

    'click #add-mortgage-button': function (e, t) {
        event.preventDefault();
        var id = FlowRouter.getParam("id");
        ProfileLiabilities.insert({
            profileId: id,
            type:'Mortgage',
            frequency: 'Monthly'
        })
    },
    'click .delete-mortgage-button': function (e, t) {
        event.preventDefault();
        ProfileLiabilities.remove(this._id);
    },

    'click #add-loan-button': function (e, t) {
        event.preventDefault();
        var id = FlowRouter.getParam("id");
        ProfileLiabilities.insert({
            profileId: id,
            type:'Loan',
            frequency: 'Monthly'
        })
    },
    'click .delete-loan-button': function (e, t) {
        event.preventDefault();
        ProfileLiabilities.remove(this._id);
    },

    'click #add-card-button': function (e, t) {
        event.preventDefault();
        var id = FlowRouter.getParam("id");
        ProfileLiabilities.insert({
            profileId: id,
            type:'Card'
        })
    },
    'click .delete-liability-button': function (e, t) {
        event.preventDefault();
        ProfileLiabilities.remove(this._id);
    },

    'click .add-income-button': function (e, t) {
        event.preventDefault();
        var id = FlowRouter.getParam("id");
        var profileContactId = this._id;
        ProfileIncomes.insert({
            profileId: id,
            profileContactId: profileContactId
        })
    },
    'click .delete-income-button': function (e, t) {
        event.preventDefault();
        ProfileIncomes.remove(this._id);
    },

    'click #add-kid-button': function (e, t) {
        event.preventDefault();
        var id = FlowRouter.getParam("id");
        ProfileKids.insert({
            profileId: id
        })
    },
    'click #delete-kid-button': function (e, t) {
        event.preventDefault();
        var lastKid = ProfileKids.findOne({},{sort:{_id:-1}});
        ProfileKids.remove(lastKid._id);
    }
});

Template.profile.onCreated(function () {
    var id = FlowRouter.getParam("id");
    this.subscribe('profile', id);
    this.subscribe('profileContacts', id);
    this.subscribe('profileProperties', id);
    this.subscribe('profileLiabilities', id);
    this.subscribe('profileIncomes', id);
    this.subscribe('profileKids', id);
});

Template.profile.onRendered(function () {
    //do something...
});