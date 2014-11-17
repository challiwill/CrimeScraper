if (Meteor.isClient) {

    var map;
    var dim = 4;
    var zones = new Array(dim);
    zones[1] = 0;
    

    function test(x) {
        var min = 37.8565551;
        var max = 37.880698;
        var interval = (max - min)/dim;
        var no = (x - min)/interval;
        return parseInt(no);
    }

    Meteor.subscribe('crimes', function() {

        Crimes.find().forEach(function(crime) {

            var latz = test(crime.lat)
            console.log(latz);
            if (latz < dim && latz > -1) {
                if (latz == 1) {
                    zones[1] += 1;
                }
                zones[latz] += 1;
                console.log(zones);
            }

            marker = L.marker([crime.lat, crime.long]).addTo(map);
            marker.bindPopup(crime.lat.toString()).openPopup();
        })

  	});

    //L.Icon.Default.imagePath = 'packages/mrt_leaflet/images';

    Template.body.helpers({
    	crime: function () {
      		return Crimes.find({});
    	}
   		});
    
    Template.map.rendered = function () {

        map = L.map('map').setView([37.869929, -122.265146], 13);

        L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
                         '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
            maxZoom: 18
        }).addTo(map);  

    };


}
