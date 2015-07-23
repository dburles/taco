


Router.route('/', function () {
    this.render('home');
});

Router.route('/application', function () {
    this.render('application');
});

Router.route('/scenario', function () {
    this.render('scenarioForm');
});