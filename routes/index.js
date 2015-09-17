var fs = require('fs');
var express = require('express');
var router = express.Router();
var icalendar = require('icalendar')

/* GET home page. */
router.get('/', function(req, res, next) {
	fs.readFile('/Users/donaldlee/Downloads/+_95KnQ1.ics', 'utf8', function (err,data) {
	  if (err) {
	    return console.log(err);
	  } else {
	  	var ical = new icalendar.parse_calendar(data);
	  	var events = ical.events();
	  	events.forEach (function (e){
	  		if (e.properties["UID"]) {
	  			console.log(e.properties["UID"][0]["value"]);
	  		}
	  		if (e.properties["ATTACH"]) {
	  			console.log(e.properties["ATTACH"][0]["value"]);
	  		}
	  		if (e.properties["ATTENDEE"]) {
	  			console.log(e.properties["ATTENDEE"][0]["value"]);
	  		}
	  		if (e.properties["DESCRIPTION"]) {
	  			console.log(e.properties["DESCRIPTION"][0]["value"]);
	  		}
	  		if (e.properties["DTSTAMP"]) {
	  			console.log(e.properties["DTSTAMP"][0]["value"]);
	  		}
	  		if (e.properties["DTSTART"]) {
	  			console.log(e.properties["DTSTART"][0]["value"]);
	  		}
	  		if (e.properties["DTEND"]) {
	  			console.log(e.properties["DTEND"][0]["value"]);
	  		}
	  		if (e.properties["CONTACT"]) {
	  			console.log(e.properties["CONTACT"][0]["value"]);
	  		}
	  		if (e.properties["COMMENT"]) {
	  			console.log(e.properties["COMMENT"][0]["value"]);
	  		}
	  		if (e.properties["CREATED"]) {
	  			console.log(e.properties["CREATED"][0]["value"]);
	  		}
	  		if (e.properties["CLASS"]) {
	  			console.log(e.properties["CLASS"][0]["value"]);
	  		}
	  		if (e.properties["DURATION"]) {
	  			console.log(e.properties["DURATION"][0]["value"]);
	  		}
	  		if (e.properties["EXDATE"]) {
	  			console.log(e.properties["EXDATE"][0]["value"]);
	  		}
	  		if (e.properties["RXRULE"]) {
	  			console.log(e.properties["RXRULE"][0]["value"]);
	  		}
	  		if (e.properties["RRULE"]) {
	  			console.log(e.properties["RRULE"][0]["value"]);
	  		}
	  		if (e.properties["RDATE"]) {
	  			console.log(e.properties["RDATE"][0]["value"]);
	  		}
	  		if (e.properties["RECURRENCE-ID"]) {
	  			console.log(e.properties["RECURRENCE-ID"][0]["value"]);
	  		}
	  		if (e.properties["RELATED-TO"]) {
	  			console.log(e.properties["RELATED-TO"][0]["value"]);
	  		}
	  		if (e.properties["RESOURCES"]) {
	  			console.log(e.properties["RESOURCES"][0]["value"]);
	  		}
	  		if (e.properties["REQUESTED-STATUS"]) {
	  			console.log(e.properties["REQUESTED-STATUS"][0]["value"]);
	  		}
	  		if (e.properties["STATUS"]) {
	  			console.log(e.properties["STATUS"][0]["value"]);
	  		}
	  		if (e.properties["TRANSP"]) {
	  			console.log(e.properties["TRANSP"][0]["value"]);
	  		}
	  		if (e.properties["PRIORITY"]) {
	  			console.log(e.properties["PRIORITY"][0]["value"]);
	  		}
	  		if (e.properties["ORGANIZER"]) {
	  			console.log(e.properties["ORGANIZER"][0]["value"]);
	  		}
	  		if (e.properties["LOCATION"]) {
	  			console.log(e.properties["LOCATION"][0]["value"]);
	  		}	  		
	  		if (e.properties["SEQUENCE"]) {
	  			console.log(e.properties["SEQUENCE"][0]["value"]);
	  		}
	  		if (e.properties["SUMMARY"]) {
	  			console.log(e.properties["SUMMARY"][0]["value"]);
	  		}
	  		if (e.properties["URL"]) {
	  			console.log(e.properties["URL"][0]["value"]);
	  		}
	  		if (e.properties["LAST-MODIFIED"]) {
	  			console.log(e.properties["LAST-MODIFIED"][0]["value"]);	
	  		}
	  		if (e.properties["X-TICKETS-URL"]) {
	  			console.log(e.properties["X-TICKETS-URL"][0]["value"]);
	  		}
	  		if (e.properties["X-INSTANT-EVENT"]) {
	  			console.log(e.properties["X-INSTANT-EVENT"][0]["value"]);
	  		}
	  		if (e.properties["X-COST"]) {
	  			console.log(e.properties["X-COST"][0]["value"]);
	  		}
	  		// console.log(console.log(e.properties);
	  	});
	  } 
	});



  	res.render('index', { title: 'Expression' });


});

module.exports = router;
