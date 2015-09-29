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

// Don't need this due to configureroute in accounts file.
//FlowRouter.route('/signin', {
//    action: function(params, queryParams) {
//        BlazeLayout.render('main', {content:  'signIn'});
//    }
//});

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

FlowRouter.route('/contacts/:id', {
    action: function(params, queryParams) {
        BlazeLayout.render('main', {content:  'contact'});
    }
});

FlowRouter.route('/application', {
    action: function(params, queryParams) {
        BlazeLayout.render('main', {content:  'application'});
    }
});

FlowRouter.route('/tasks', {
    action: function(params, queryParams) {
        BlazeLayout.render('main', {content:  'tasks'});
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

FlowRouter.route('/checklist/:id', {
    action: function(params, queryParams) {
        BlazeLayout.render('main', {content:  'checklist'});
    },
    name: 'checklist'
});

FlowRouter.route('/communications', {
    action: function(params, queryParams) {
        BlazeLayout.render('main', {content:  'communications'});
    }
});

FlowRouter.route('/communications/:id', {
    action: function(params, queryParams) {
        BlazeLayout.render('main', {content:  'communications'});
    }
});

FlowRouter.route('/teams', {
    action: function(params, queryParams) {
        BlazeLayout.render('main', {content:  'teams'});
    }
});

FlowRouter.route('/teams/:id', {
    action: function(params, queryParams) {
        BlazeLayout.render('main', {content:  'teams'});
    }
});

// *** Note: signIn route is handled by user-accounts.js ***


//Router.route('/scenario', function () {
//    this.render('scenarioForm');
//});
