if (Meteor.isClient) {


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
    
    Template.sites.rendered = function () {
    var map = L.map('map').setView([32.07593833337078, 34.799848388671875], 16);

    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
                     '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
        maxZoom: 18
    }).addTo(map);

    var MapIcon = L.Icon.extend({
        options: {
            shadowUrl: 'img/map/shadow.png'
        }
    });

    Sites.find().fetch().forEach(function(site) {
        var icon = new MapIcon({iconUrl: 'img/map/map-icon-undefined.png'});
        var marker = L.marker([site.location.coords[0], site.location.coords[1]], {icon: icon});
        marker.bindPopup('<strong>' + site.name + '</strong><br />' + site.location.address);
        marker.addTo(map);
    });
};
}
