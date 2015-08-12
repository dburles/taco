Router.configure({
    layoutTemplate: 'main'
});

Router.route('/', {
    name: "root",
    template: "home"
});

// *** Note: signIn route is handled by user-accounts.js ***

Router.route('/application', function () {
    this.render('application');
});

Router.route('/scenario', function () {
    this.render('scenarioForm');
});

Router.route('/transactions', function () {
    this.render('transactions');
});

//Router.route('/transactions/:_id', {
//    name: 'transaction',
//    template: 'transaction',
//    data: function() {
//        var id = this.params._id;
//        return Transactions.findOne({_id: id});
//        debugger;
//    }
//});

Router.route('/transactions/:_id', function () {
    this.render('transaction')
}, {
    name: 'transaction'
});

