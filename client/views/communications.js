Template.communications.helpers({
    communications: function() {
        var searchText = FlowRouter.getQueryParam('search');
        var searchObj = {};
        if(searchText) {
            searchObj.$or = [];
            searchObj.$or.push({name: new RegExp("^" + searchText + '.*', "i")});
            searchObj.$or.push({role: new RegExp("^" + searchText + '.*', "i")});
            searchObj.$or.push({type: new RegExp("^" + searchText + '.*', "i")});
        }
        return Communications.find(searchObj);
    },
    template: function() {
        var id = FlowRouter.getParam('id');
        return Communications.findOne({_id:id});
    },
    isSelected:function() {
        return ((FlowRouter.getParam('id') == this._id) ? 'selected-box': '');
    }
});

Template.communications.events({
    'click #add-template-button': function (e, t) {
        event.preventDefault();
        Meteor.call('addCommunication', function(err, result){
             if(result)
                 FlowRouter.go('/communications/' + result);
        })
    },
    'keyup #communication-search-text': function (e, t) {
        FlowRouter.setQueryParams({'search': e.target.value || null});
        FlowRouter.setParams({'id': null});
    },
    'click #delete-template-menu': function (e, t) {
        var self = this;
        bootbox.confirm("Are you sure you want to delete this template?", function(result) {
            if(result) {
                Meteor.call('deleteCommunication', self._id);
                FlowRouter.setParams({'id': null});
            }
        });
    },
    'click #clone-template-menu': function (e, t) {
        event.preventDefault();
        Meteor.call('cloneCommunication', this, function(err, result){
            if(err)
                toastr.error(err.reason);
            if(result)
                FlowRouter.go('/communications/' + result);
        })
    }
});

Template.communications.onCreated(function () {
    this.subscribe('communications');
});

Template.communications.onRendered(function () {
    //setTimeout(function(){
    //    $('.redactor').redactor({
    //        minHeight:180
    //    });
    //}, 1000)

});

Template.communicationsBody.onRendered(function () {
    //$('.redactor').redactor({
    //    minHeight:180
    //});
});