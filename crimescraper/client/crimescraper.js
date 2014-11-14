if (Meteor.isClient) {
    // counter starts at 0
    Session.setDefault("counter", 0);

    Template.hello.helpers({
	counter: function () {
	    return Session.get("counter");
	}
    });

    Template.hello.events({
	'click button': function () {
	    // increment the counter when button is clicked
	    Session.set("counter", Session.get("counter") + 1);
	}
    });

    var crimelist;

    Meteor.subscribe('crimes', function() {
    	//Template.body.crime = function() { return Crimes.find(); };
    	/*crimelist = Crimes.find().fetch();
    	console.log(crimelist);*/

    	
  	});

    Template.body.helpers({
    	crime: function () {
      		return Crimes.find({});
    	}
   		});
    
}
