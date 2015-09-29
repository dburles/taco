

Template.teams.onCreated(function () {
    this.subscribe('teams');
});

Template.teams.onRendered(function () {

});

Template.teams.viewmodel(
    'teams',
    {
        teams: function() {
            var searchText = FlowRouter.getQueryParam('search');
            var searchObj = {};
            if (searchText) {
                searchObj.$or = [];
                searchObj.$or.push({name: new RegExp(".*" + searchText + '.*', "i")});
                // searchObj.$or.push({role: new RegExp("^" + searchText + '.*', "i")});
                //searchObj.$or.push({type: new RegExp("^" + searchText + '.*', "i")});
            }
            return Teams.find(searchObj);
        },
        add: function(){
            event.preventDefault();
            Meteor.call('addTeam', function(err, result){
                if(result)
                    FlowRouter.go('/teams/' + result);
            })
        },
        delete: function(){
            var self = this;
            bootbox.confirm("Are you sure you want to delete this team?", function(result) {
                if(result) {
                    Meteor.call('deleteTeam', self._id);
                    FlowRouter.setParams({'id': null});
                }
            });
        },
        team: function() {
            var id = FlowRouter.getParam('id');
            return Teams.findOne({_id:id});
        },
        typeSearch: function () {
            FlowRouter.setQueryParams({'search': this.searchText() || null });
            FlowRouter.setParams({'id': null});
        },
        searchText:null
    },
    ['teams', 'team']
);

Template.teamItem.viewmodel(function(data){
    return {
        name: this.name,
        isSelected:function() {
            return (FlowRouter.getParam('id') == data._id);
        },
        viewPath:function(){
            var path = '/teams/' + data._id;
            if(this.parent().searchText())
                path += '?search=' + this.parent().searchText();
            return path;
        }
    }
});

Template.teamView.viewmodel(function(data){
    return {
        delete: function(){
            var self = data;
            bootbox.confirm("Are you sure you want to delete this team?", function(result) {
                if(result) {
                    Meteor.call('deleteTeam', self._id);
                    FlowRouter.setParams({'id': null});
                }
            });
        },
        clone:function(){
            event.preventDefault();
            Meteor.call('cloneTeam', data, function(err, result) {
                if (err)
                    toastr.error(err.reason);
                if (result)
                    FlowRouter.go('/teams/' + result);
            });
        }
    }
});















//removed from this file...

Template.teams.helpers({
    //teams: function() {
    //    var searchText = FlowRouter.getQueryParam('search');
    //    var searchObj = {};
    //    if(searchText) {
    //        searchObj.$or = [];
    //        searchObj.$or.push({name: new RegExp("^" + searchText + '.*', "i")});
    //        searchObj.$or.push({role: new RegExp("^" + searchText + '.*', "i")});
    //        searchObj.$or.push({type: new RegExp("^" + searchText + '.*', "i")});
    //    }
    //    return teams.find(searchObj);
    //},
    //template: function() {
    //    var id = FlowRouter.getParam('id');
    //    return teams.findOne({_id:id});
    //}
    //isSelected:function() {
    //    return ((FlowRouter.getParam('id') == this._id) ? 'selected-box': '');
    //}
});

Template.teams.events({
    //'click #add-template-button': function (e, t) {
    //    event.preventDefault();
    //    Meteor.call('addteam', function(err, result){
    //         if(result)
    //             FlowRouter.go('/teams/' + result);
    //    })
    //},
    //'keyup #team-search-text': function (e, t) {
    //    FlowRouter.setQueryParams({'search': e.target.value || null});
    //    FlowRouter.setParams({'id': null});
    //},
    //'click #delete-template-menu': function (e, t) {
    //    var self = this;
    //    bootbox.confirm("Are you sure you want to delete this template?", function(result) {
    //        if(result) {
    //            Meteor.call('deleteteam', self._id);
    //            FlowRouter.setParams({'id': null});
    //        }
    //    });
    //},
    //'click #clone-template-menu': function (e, t) {
    //    event.preventDefault();
    //    Meteor.call('cloneteam', this, function(err, result){
    //        if(err)
    //            toastr.error(err.reason);
    //        if(result)
    //            FlowRouter.go('/teams/' + result);
    //    })
    //}
});