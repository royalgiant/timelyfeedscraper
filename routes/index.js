var fs = require('fs');
var express = require('express');
var router = express.Router();
var icalendar = require('icalendar');
var Sequelize = require('sequelize');
/* GET home page. */
router.get('/', function(req, res, next) {
	fs.readFile('/Users/donaldlee/Downloads/+_95KnQ1.ics', 'utf8', function (err,data) {
	  if (err) {
	    return console.log(err);
	  } else {
	  	var ical = new icalendar.parse_calendar(data);
	  	var events = ical.events();

	  	var app = express

		var sequelize = new Sequelize('mysql://root:admin@localhost:3306/timely-dev');  	

	  	var Event = sequelize.define( 'event', {
			attendee: {type: Sequelize.STRING},
			uid: {type: Sequelize.STRING},
			comment: {type: Sequelize.STRING},
			contact: {type: Sequelize.STRING},
			description: {type: Sequelize.TEXT},
			created: {type: Sequelize.DATE},
			dtstamp: {type: Sequelize.DATE},
			dtstart: {type: Sequelize.DATE},
			dtend: {type: Sequelize.DATE},
			duration: {type: Sequelize.STRING},
			exdate: {type: Sequelize.DATE },
			rxrule: {type: Sequelize.STRING},
			last_modified: {type: Sequelize.STRING},
			sequence: {type: Sequelize.INTEGER},
			summary: {type: Sequelize.TEXT},
			rdate: {type: Sequelize.DATE},
			exception_date: {type: Sequelize.DATE},
			recurrence_id: {type: Sequelize.INTEGER},
			related_to: {type: Sequelize.STRING},
			resources: {type: Sequelize.STRING},
			rrule: {type: Sequelize.STRING},
			exception_rule: {type: Sequelize.STRING},
			request_status: {type: Sequelize.STRING},
			status: {type: Sequelize.STRING},
			transp: {type: Sequelize.STRING},
			timezone_name: {type: Sequelize.STRING},
			allday: {type: Sequelize.STRING},
			priority: {type: Sequelize.STRING},
			organizer: {type: Sequelize.STRING},
			url: {type: Sequelize.STRING},
			x_tickets_url: {type: Sequelize.STRING},
			x_instant_event: {type: Sequelize.STRING},
			x_cost: {type: Sequelize.STRING},
			x_class: {type: Sequelize.STRING},
			show_map: {type: Sequelize.BOOLEAN},
			show_coordinates: {type: Sequelize.BOOLEAN},
			venue_id: {type: Sequelize.INTEGER},
			organizer_id: {type: Sequelize.INTEGER},
			ical_id: {type: Sequelize.INTEGER},
			parent_event_id: {type: Sequelize.INTEGER},
		});
			
		var Category = sequelize.define( 'category', {
			category_name: {type: Sequelize.STRING}
		});

		// Event.hasMany('categories', Category, { why: String }, { reverse: 'events', key: true })

		var Venue = sequelize.define( 'venue', {
			name: {type: Sequelize.STRING},
			address: {type: Sequelize.STRING},
			city: {type: Sequelize.STRING},
			province: {type: Sequelize.STRING},
			postal_code: {type: Sequelize.STRING},
			country: {type: Sequelize.STRING},
			longitude: {type: Sequelize.STRING},
			latitude: {type: Sequelize.STRING},
		});

		Venue.hasMany(Event);
		Event.belongsTo(Venue);

		Event.belongsToMany(Category, {through: 'EventCategory'});
		Category.belongsToMany(Event, {through: 'EventCategory'});

		// Event.hasOne("venue", Venue)

		events.forEach (function (e){
	  		var newRecord = {};

	  		if (e.properties["UID"]) {
	  			newRecord.uid = e.properties["UID"][0]["value"];
	  		}
	  		if (e.properties["ATTACH"]) {
	  			newRecord.attach = e.properties["ATTACH"][0]["value"];
	  		}
	  		if (e.properties["ATTENDEE"]) {
	  			newRecord.attendee = e.properties["ATTENDEE"][0]["value"];
	  		}
	  		if (e.properties["DESCRIPTION"]) {
	  			newRecord.description = String(e.properties["DESCRIPTION"][0]["value"]);
	  		}
	  		if (e.properties["DTSTAMP"]) {
	  			newRecord.dtstamp = e.properties["DTSTAMP"][0]["value"];
	  		}
	  		if (e.properties["DTSTART"]) {
	  			newRecord.dtstart = e.properties["DTSTART"][0]["value"];
	  		}
	  		if (e.properties["DTEND"]) {
	  			newRecord.dtend = e.properties["DTEND"][0]["value"];
	  		}
	  		if (e.properties["CONTACT"]) {
	  			newRecord.contact = e.properties["CONTACT"][0]["value"];
	  		}
	  		if (e.properties["COMMENT"]) {
	  			newRecord.comment = e.properties["COMMENT"][0]["value"];
	  		}
	  		if (e.properties["CREATED"]) {
	  			newRecord.created = e.properties["CREATED"][0]["value"];
	  		}
	  		if (e.properties["CLASS"]) {
	  			newRecord.x_class= e.properties["CLASS"][0]["value"];
	  		}
	  		if (e.properties["DURATION"]) {
	  			newRecord.duration = e.properties["DURATION"][0]["value"];
	  		}
	  		if (e.properties["EXDATE"]) {
	  			newRecord.exdate = e.properties["EXDATE"][0]["value"];
	  		}
	  		if (e.properties["RXRULE"]) {
	  			newRecord.rxrule = e.properties["RXRULE"][0]["value"];
	  		}
	  		if (e.properties["RRULE"]) {
	  			newRecord.rrule = e.properties["RRULE"][0]["value"];
	  		}
	  		if (e.properties["RDATE"]) {
	  			newRecord.rdate = e.properties["RDATE"][0]["value"];
	  		}
	  		if (e.properties["RECURRENCE-ID"]) {
	  			newRecord.recurrrence_id = e.properties["RECURRENCE-ID"][0]["value"];
	  		}
	  		if (e.properties["RELATED-TO"]) {
	  			newRecord.related_to = e.properties["RELATED-TO"][0]["value"];
	  		}
	  		if (e.properties["RESOURCES"]) {
	  			newRecord.resources = e.properties["RESOURCES"][0]["value"];
	  		}
	  		if (e.properties["REQUESTED-STATUS"]) {
	  			newRecord.requested_status = e.properties["REQUESTED-STATUS"][0]["value"];
	  		}
	  		if (e.properties["STATUS"]) {
	  			newRecord.status = e.properties["STATUS"][0]["value"];
	  		}
	  		if (e.properties["TRANSP"]) {
	  			newRecord.transp = e.properties["TRANSP"][0]["value"];
	  		}
	  		if (e.properties["PRIORITY"]) {
	  			newRecord.priority = e.properties["PRIORITY"][0]["value"];
	  		}
	  		if (e.properties["ORGANIZER"]) {
	  			newRecord.organizer = e.properties["ORGANIZER"][0]["value"];
	  		}
	  		if (e.properties["LOCATION"]) {
	  			newRecord.location = e.properties["LOCATION"][0]["value"];
	  		}	  		
	  		if (e.properties["SEQUENCE"]) {
	  			newRecord.sequence = e.properties["SEQUENCE"][0]["value"];
	  		}
	  		if (e.properties["SUMMARY"]) {
	  			newRecord.summary = e.properties["SUMMARY"][0]["value"];
	  		}
	  		if (e.properties["URL"]) {
	  			newRecord.url = e.properties["URL"][0]["value"];
	  		}
	  		if (e.properties["LAST-MODIFIED"]) {
	  			newRecord.last_modified = e.properties["LAST-MODIFIED"][0]["value"];	
	  		}
	  		if (e.properties["X-TICKETS-URL"]) {
	  			newRecord.x_tickets_url = e.properties["X-TICKETS-URL"][0]["value"];
	  		}
	  		if (e.properties["X-INSTANT-EVENT"]) {
	  			newRecord.x_instant_event = e.properties["X-INSTANT-EVENT"][0]["value"];
	  		}
	  		if (e.properties["X-COST"]) {
	  			newRecord.x_cost = e.properties["X-COST"][0]["value"];
	  		}
	  		if (e.properties["CATEGORIES"]) {
	  			var categories = String(e.properties["CATEGORIES"][0]["value"]).split("\,");
	  			for (var i in categories){
	  				categories[i] = categories[i].replace("\\", "");
	  				categories[i] = decodeURI(categories[i]);
	  			};
	  		}
	  		if (e.properties["GEO"]) {
	  			var geo = String(e.properties["GEO"][0]["value"]).split(";");
	  			locale = String(newRecord.location).split(","); // Split by ,
	  			prov = locale[2].split(" ");
	  			formatted_address = String(locale[0]).split("@"); // Formatting issue
	  			var location = {
	  				name: formatted_address[0],
	  				address: formatted_address[1],
	  				city: locale[1],
	  				province: prov[1],
	  				postal_code: String(prov[2]+" "+prov[3]),
	  				country: locale[3],
	  				longitude: geo[1],
	  				latitude: geo[0]
 	  			}
	  			
	  		}

	  		Event.findOrCreate({where: {uid: newRecord.uid}, defaults: newRecord}).spread( function(tevent, event_created){
			    if(event_created) {
			   //  	for (x in categories) {
			   //  		Category.findOrCreate({where: {category_name: categories[x]}, defaults: {category_name: categories[x]}}).spread( function(cat, created){
				  // 			console.log(cat.get({
						//       plain: true
						//     }))
						//     if(created) {
						//     	console.log("Created: "+created);
						//     	Event.addCategory(created);
						//     } else {
						//     	Event.addCategory(cat);
						//     	console.log("Added: "+cat);
						//     }
						// })
			   //  	}

			   		// If location actually had a value.
			   		if (location) {
			   			// Find the Venue or Create it and Associate it with the Event.
			   			Venue.findOrCreate({where: location, defaults: location}).spread( function(venue, venue_created){
				   			if (venue_created){ // Venue did not exist, create it, and then associate to event.
				   				event_created.venueId = venue_created.id;
			   					event_created.save();
				   			} else{ // Venue existed, associate to even
				   				event_created.venueId = venue.id;
			   					event_created.save();
				   			}
				   		})
			   		}	
			    } else {
			    	if (location) {
			    		// Find the Venue or Create it and Associate it with the Event.
				    	Venue.findOrCreate({where: location, defaults: location}).spread( function(venue, venue_created){
				   			if (venue) { // Venue existed, associate to event
				   				tevent.venueId = venue.id;
				   				tevent.save();
				   			} else {	// Venue did not exist, create it, and then associate to event.
				   				tevent.venueId = venue_created.id;
				   				tevent.save();
				   			}	
					   	})
			    	}	
			    }
	  		})
	  	});
		
		console.log('Done');
	  } 
	});
  	res.render('index', { title: 'Expression' });
});

router.get('/modelDefine', function(req, res, next) {
	var sequelize = new Sequelize('mysql://root:admin@localhost:3306/timely-dev');  	

  	var Event = sequelize.define( 'event', {
		attendee: {type: Sequelize.STRING},
		uid: {type: Sequelize.STRING},
		comment: {type: Sequelize.STRING},
		contact: {type: Sequelize.STRING},
		description: {type: Sequelize.TEXT},
		created: {type: Sequelize.DATE},
		dtstamp: {type: Sequelize.DATE},
		dtstart: {type: Sequelize.DATE},
		dtend: {type: Sequelize.DATE},
		duration: {type: Sequelize.STRING},
		exdate: {type: Sequelize.DATE },
		rxrule: {type: Sequelize.STRING},
		last_modified: {type: Sequelize.STRING},
		sequence: {type: Sequelize.INTEGER},
		summary: {type: Sequelize.TEXT},
		rdate: {type: Sequelize.DATE},
		exception_date: {type: Sequelize.DATE},
		recurrence_id: {type: Sequelize.INTEGER},
		related_to: {type: Sequelize.STRING},
		resources: {type: Sequelize.STRING},
		rrule: {type: Sequelize.STRING},
		exception_rule: {type: Sequelize.STRING},
		request_status: {type: Sequelize.STRING},
		status: {type: Sequelize.STRING},
		transp: {type: Sequelize.STRING},
		timezone_name: {type: Sequelize.STRING},
		allday: {type: Sequelize.STRING},
		priority: {type: Sequelize.STRING},
		organizer: {type: Sequelize.STRING},
		url: {type: Sequelize.STRING},
		x_tickets_url: {type: Sequelize.STRING},
		x_instant_event: {type: Sequelize.STRING},
		x_cost: {type: Sequelize.STRING},
		x_class: {type: Sequelize.STRING},
		show_map: {type: Sequelize.BOOLEAN},
		show_coordinates: {type: Sequelize.BOOLEAN},
		venue_id: {type: Sequelize.INTEGER},
		organizer_id: {type: Sequelize.INTEGER},
		ical_id: {type: Sequelize.INTEGER},
		parent_event_id: {type: Sequelize.INTEGER},
	});
		
	var Category = sequelize.define( 'category', {
		category_name: {type: Sequelize.STRING}
	});

	// Event.hasMany('categories', Category, { why: String }, { reverse: 'events', key: true })

	var Venue = sequelize.define( 'venue', {
		name: {type: Sequelize.STRING},
		address: {type: Sequelize.STRING},
		city: {type: Sequelize.STRING},
		province: {type: Sequelize.STRING},
		postal_code: {type: Sequelize.STRING},
		country: {type: Sequelize.STRING},
		longitude: {type: Sequelize.STRING},
		latitude: {type: Sequelize.STRING},
	});

	Venue.hasMany(Event);
	Event.belongsTo(Venue);

	Event.belongsToMany(Category, {through: 'EventCategory'});
	Category.belongsToMany(Event, {through: 'EventCategory'});

	sequelize
	  .sync({ force: true })
	  .then(function(err) {
	    console.log('It worked!');
	  }, function (err) { 
	    console.log('An error occurred while creating the table:', err);
	  });


	res.render('modelDefine');
});

module.exports = router;
