AdminConfig = {
  collections: {
    Books: {
      tableColumns: [
        {label: 'Title', name: 'title'},
        {label: 'Author', name: 'author'}
      ]
    }

  }
};

Router.route('/', function () {
  this.render('hello');
});

Router.route('/application', function () {
  this.render('application');
});

Router.route('/scenario', function () {
  this.render('scenarioForm');
});

Books = new Meteor.Collection('books');

Books.attachSchema(new SimpleSchema({
  title: {
    type: String,
    label: "Title",
    max: 200
  },
  author: {
    type: String,
    label: "Author"
  },
  copies: {
    type: Number,
    label: "Number of copies",
    min: 0
  },
  lastCheckedOut: {
    type: Date,
    label: "Last date this book was checked out",
    optional: true
  },
  summary: {
    type: String,
    label: "Brief summary",
    optional: true,
    max: 1000
  }
}));


if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.hello.helpers({
    counter: function () {
      return Session.get('counter');
    }
  });

  Template.hello.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });

  Meteor.publish(null, function (){
    return Meteor.roles.find({})
  })
}

