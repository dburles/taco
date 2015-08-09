
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

