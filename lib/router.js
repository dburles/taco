Router.route('/', function () {
    this.render('hello');
});

Router.route('/application', function () {
    this.render('application');
});

Router.route('/scenario', function () {
    this.render('scenarioForm');
});