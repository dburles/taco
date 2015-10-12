Template.teams.helpers({
    teams: function() {
        var searchText = FlowRouter.getQueryParam('search');
        var searchObj = {};
        if (searchText) {
            searchObj.$or = [];
            searchObj.$or.push({name: new RegExp(".*" + searchText + '.*', "i")});
        }
        return Teams.find(searchObj);
    }
});

Template.teams.events({
    'click #add-template-button': function(){
        event.preventDefault();
        Meteor.call('addTeam', function(err, result){
            if(result)
                FlowRouter.go('/teams/' + result);
        })
    },
    'keyup #team-search-text': function(e,t){
        FlowRouter.setQueryParams({'search': e.target.value || null });
        FlowRouter.setParams({'id': null});
    }
});

Template.teams.onCreated(function () {
    this.subscribe('teams');
});

Template.teamItem.helpers({
    isSelected:function() {
        return (FlowRouter.getParam('id') == this._id);
    },
    viewPath:function(){
        var path = '/teams/' + this._id;
        if(FlowRouter.getQueryParam('search'))
            path += '?search=' + FlowRouter.getQueryParam('search') ;
        return path;
    }
});



Template.teamView.helpers({
    team: function() {
        var id = FlowRouter.getParam("id");
        return Teams.findOne(id);
    }
});

Template.teamView.events({
    'click #delete-template-menu': function(){
        var self = this;
        bootbox.confirm("Are you sure you want to delete this team?", function(result) {
            if(result) {
                Meteor.call('deleteTeam', self._id);
                FlowRouter.setParams({'id': null});
            }
        });
    },
    'click #clone-template-menu':function(){
        event.preventDefault();
        Meteor.call('cloneTeam', this, function(err, result) {
            if (err)
                toastr.error(err.reason);
            if (result)
                FlowRouter.go('/teams/' + result);
        });
    }
});

Template.teamView.onCreated(function () {
    //var self = this;
    //self.autorun(function () {
    //    var groupName = FlowRouter.getQueryParam("group");
    //    self.subscribe('contactsSelected', selectedContacts);
    //});
});

Template.teamView.onRendered(function () {
    //do something...
});












//Template.teams.viewmodel(
//    'teams',
//    {
//        //teams: function() {
//        //    var searchText = FlowRouter.getQueryParam('search');
//        //    var searchObj = {};
//        //    if (searchText) {
//        //        searchObj.$or = [];
//        //        searchObj.$or.push({name: new RegExp(".*" + searchText + '.*', "i")});
//        //        // searchObj.$or.push({role: new RegExp("^" + searchText + '.*', "i")});
//        //        //searchObj.$or.push({type: new RegExp("^" + searchText + '.*', "i")});
//        //    }
//        //    return Teams.find(searchObj);
//        //},
//        //add: function(){
//        //    event.preventDefault();
//        //    Meteor.call('addTeam', function(err, result){
//        //        if(result)
//        //            FlowRouter.go('/teams/' + result);
//        //    })
//        //},
//        delete: function(){
//            var self = this;
//            bootbox.confirm("Are you sure you want to delete this team?", function(result) {
//                if(result) {
//                    Meteor.call('deleteTeam', self._id);
//                    FlowRouter.setParams({'id': null});
//                }
//            });
//        },
//        team: function() {
//            var id = FlowRouter.getParam('id');
//            return Teams.findOne({_id:id});
//        },
//        //typeSearch: function () {
//        //    FlowRouter.setQueryParams({'search': this.searchText() || null });
//        //    FlowRouter.setParams({'id': null});
//        //},
//        searchText:null
//    },
//    ['teams', 'team']
//);
//
//Template.teamItem.viewmodel(function(data){
//    return {
//        name: this.name,
//        isSelected:function() {
//            return (FlowRouter.getParam('id') == data._id);
//        },
//        viewPath:function(){
//            var path = '/teams/' + data._id;
//            if(this.parent().searchText())
//                path += '?search=' + this.parent().searchText();
//            return path;
//        }
//    }
//});
//
//Template.teamView.viewmodel(function(data){
//    return {
//        delete: function(){
//            var self = data;
//            bootbox.confirm("Are you sure you want to delete this team?", function(result) {
//                if(result) {
//                    Meteor.call('deleteTeam', self._id);
//                    FlowRouter.setParams({'id': null});
//                }
//            });
//        },
//        clone:function(){
//            event.preventDefault();
//            Meteor.call('cloneTeam', data, function(err, result) {
//                if (err)
//                    toastr.error(err.reason);
//                if (result)
//                    FlowRouter.go('/teams/' + result);
//            });
//        }
//    }
//});