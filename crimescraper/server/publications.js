Meteor.publish('crimes', function() {
    return Crimes.find();
});

