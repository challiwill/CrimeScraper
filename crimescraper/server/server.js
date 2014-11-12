Meteor.startup(function () {
    var Request = Npm.require('request');
    var Cheerio = Npm.require('cheerio');
//    var gm = Npm.require('googlemaps');

    bmonth = '10';
    bday = '30';
    byear = '2014';
    emonth = '11';
    eday = '05';
    eyear = '2014';
    xmin = '-13616311.669473337';
    ymin = '4558847.172438941';
    xmax = '-13603260.046893662';
    ymax = '4563184.9737941185';

    crime_types = {
	'arson' : 'AR',
	'assault' : 'AS',
	'burglary' : 'BU',
	'disturbing the peace' : 'DP',
	'drugs/alcohol violations' : 'DR',
	'dui' : 'DU',
	'fraud' : 'FR',
	'homicide' : 'HO',
	'motor vehicle theft' : 'VT',
	'robbery' : 'RO',
	'sec crimes' : 'SX',
	'theft/larceny' : 'TH',
	'vandalism' : 'VA',
	'vehicle break-in/theft' : 'VB',
	'weapons' : 'WE'
    };

    order = ['description','case','address','agency','date'];

    for (crime in crime_types) {
	var url = 'http://www.crimemapping.com/DetailedReport.aspx?db='+
	    bmonth+'/'+bday+'/'+byear+'+00:00:00&de='+emonth+'/'+eday+'/'+
	    eyear+'+23:59:00&ccs='+crime_types[crime]+'&xmin='+xmin+'&ymin='+
	    ymin+'&xmax='+xmax+'&ymax='+ymax;
	result = Meteor.http.get(url);
//	Request(url, (function(crime) { return function(err, resp, body) {
    	$ = Cheerio.load(result.content);
    	$('.report tr').each(function() {
	    var incident = {'crimetype': crime_types[crime]};
    	    $(this).find('td span').each(function(i) {
		var field = order[i];		
		incident[field] = $(this).text().trim();
    	    });
	    Crimes.insert(incident);
    	});
//    }})(crime));
    }

});
