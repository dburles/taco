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

//Router.route('/application', function () {
//    this.render('application');
//});
//
//Router.route('/scenario', function () {
//    this.render('scenarioForm');
//});
//
//Router.route('/transactions', function () {
//    this.render('transactions');
//});

//Router.route('/transactions/:_id', {
//    name: 'transaction',
//    template: 'transaction',
//    data: function() {
//        var id = this.params._id;
//        return Transactions.findOne({_id: id});
//        debugger;
//    }
//});

//Router.route('/transactions/:_id', function () {
//    this.render('transaction')
//}, {
//    name: 'transaction'
//});

