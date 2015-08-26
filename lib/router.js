//Router.configure({
//    layoutTemplate: 'main'
//});

//Router.route('/', {
//    name: "root",
//    template: "home"
//});

FlowRouter.route('/', {
    action: function(params, queryParams) {
        BlazeLayout.render('main', {content: 'home'});
    }
});

FlowRouter.route('/signin', {
    action: function(params, queryParams) {
        BlazeLayout.render('main', {content:  'signIn'});
    }
});

FlowRouter.route('/profiles/:user', {
    action: function(params, queryParams) {
        BlazeLayout.render('main', {content:  'profile'});
    }
});

FlowRouter.route('/profile', {
    action: function(params, queryParams) {
        var userId = Meteor.userId();
        FlowRouter.redirect('/profiles/' + userId);
    }
});

FlowRouter.route('/application', {
    action: function(params, queryParams) {
        BlazeLayout.render('main', {content:  'application'});
    }
});

FlowRouter.route('/transactions', {
    action: function(params, queryParams) {
        BlazeLayout.render('main', {content:  'transactions'});
    }
});

FlowRouter.route('/transactions/:id', {
    action: function(params, queryParams) {
        BlazeLayout.render('main', {content:  'transaction'});
    }
});

// *** Note: signIn route is handled by user-accounts.js ***


//Router.route('/scenario', function () {
//    this.render('scenarioForm');
//});
