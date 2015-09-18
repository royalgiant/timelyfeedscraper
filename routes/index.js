var fs = require('fs');
var express = require('express');
var router = express.Router();
var orm = require('orm');
var icalendar = require('icalendar');

/* GET home page. */
router.get('/', function(req, res, next) {
	fs.readFile('/Users/donaldlee/Downloads/+_95KnQ1.ics', 'utf8', function (err,data) {
	  if (err) {
	    return console.log(err);
	  } else {
	  	var ical = new icalendar.parse_calendar(data);
	  	var events = ical.events();

	  	var app = express
	  	

		orm.connect('mysql://root:admin@127.0.0.1/timely-dev', function(err, db) {
		  	if (err) return console.error('Connection error: ' + err);

		  	var Event = db.define( 'event', {
				id:  {type: 'serial', key: true}, // the auto-incrementing primary key
				attach: {type: 'text'},
				attendee: {type: 'text'},
				uid: {type: 'text'},
				comment: {type: 'text'},
				contact: {type: 'text'},
				description: {type: 'text', size: 5000 },
				created: {type: 'date', time: true},
				dtstamp: {type: 'date', time: true},
				dtstart: {type: 'date', time: true},
				dtend: {type: 'date'},
				duration: {type: 'text'},
				exdate: {type: 'date' },
				rxrule: {type: 'text'},
				last_modified: {type: 'text'},
				sequence: {type: 'integer'},
				summary: {type: 'text', size: 5000 },
				rdate: {type: 'date'},
				exception_date: {type: 'date'},
				recurrence_id: {type: 'integer'},
				related_to: {type: 'text'},
				resources: {type: 'text'},
				rrule: {type: 'text'},
				exception_rule: {type: 'text'},
				request_status: {type: 'text'},
				status: {type: 'text'},
				transp: {type: 'text'},
				timezone_name: {type: 'text'},
				allday: {type: 'text'},
				priority: {type: 'text'},
				organizer: {type: 'text'},
				url: {type: 'text'},
				x_tickets_url: {type: 'text'},
				x_instant_event: {type: 'text'},
				x_cost: {type: 'number'},
				x_class: {type: 'text'},
				show_map: {type: 'boolean'},
				show_coordinates: {type: 'boolean'},
				venue_id: {type: 'integer'},
				organizer_id: {type: 'integer'},
				ical_id: {type: 'integer'},
				parent_event_id: {type: 'integer'},
			});
			
			var Category = db.define( 'category', {
				id:  {type: 'serial', key: true},
				category_name: {type: 'text'}
			});

			Event.hasMany('categories', Category, { why: String }, { reverse: 'events', key: true })

			var Venue = db.define( 'venue', {
				id:  {type: 'serial', key: true},
				name: {type: 'text'},
				address: {type: 'text'},
				city: {type: 'text'},
				province: {type: 'text'},
				postal_code: {type: 'text'},
				country: {type: 'text'},
				longitude: {type: 'text'},
				latitude: {type: 'text'},
			});

			Event.hasOne("venue", Venue)

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

		  		db.sync(function(err) {
					
					Event.find({uid:newRecord.uid}, function(err, results){
						if(results.length == 0){ // Record doesn't exist; create it.
							Event.create(newRecord, function(err, results){
								// Loop through categories
								Event.addCategory(categories, function(err){});
								for (var x in categories) {
									// Check if it exists in database
									// Efficiency note - can we do a bulk find, and then add categories to events?
									Category.find({category_name:String(categories[x])}, function(err, results) {
										if(results.length == 1){
										// 	// If it's already associated with the category do nothing
											console.log([categories[x]]);
											Event.hasCategories([categories[x]], function(err, eventHasCategoryx) {
												if (eventHasCategoryx){}
												else{ // Else associate the category 
													Event.addCategory(category, {why: String(categories[x])}, function(err){});
												}
											}); 							
										} 
										else { //Category didn't exist, create it, and associate it with the Event
											console.log(results);
											results.addCategory([categories[x]], function(err){});
											categorys.addEvents(Event, function(err){});
										}
									});
									// If it does, take categories_id and events_id and pop it in db
									// Else it doesn't, add it to categories and pop its id and Event.id
									// into events-categories
								}
							});
						}
					});
				});
		  		

		  		

		  		// if (e.properties["GEO"]) {
		  		// 	var geo = String(e.properties["GEO"][0]["value"].split(";")
		  		// 	console.log(geo);
		  		// }
		  		// console.log(= e.properties);
		  	});
		});

		console.log('Done');
	  } 
	});
  	res.render('index', { title: 'Expression' });
});

router.get('/modelDefine', function(req, res, next) {
	orm.connect('mysql://root:admin@127.0.0.1/timely-dev', function(err, db) {
		if (err) return console.error('Connection error: ' + err);

	  	var Event = db.define( 'event', {
			id:  {type: 'serial', key: true}, // the auto-incrementing primary key
			attach: {type: 'text'},
			attendee: {type: 'text'},
			uid: {type: 'text'},
			comment: {type: 'text'},
			contact: {type: 'text'},
			description: {type: 'text', size: 5000 },
			created: {type: 'date', time: true},
			dtstamp: {type: 'date', time: true},
			dtstart: {type: 'date', time: true},
			dtend: {type: 'date'},
			duration: {type: 'text'},
			exdate: {type: 'date' },
			rxrule: {type: 'text'},
			last_modified: {type: 'text'},
			sequence: {type: 'integer'},
			summary: {type: 'text', size: 5000 },
			rdate: {type: 'date'},
			exception_date: {type: 'date'},
			recurrence_id: {type: 'integer'},
			related_to: {type: 'text'},
			resources: {type: 'text'},
			rrule: {type: 'text'},
			exception_rule: {type: 'text'},
			request_status: {type: 'text'},
			status: {type: 'text'},
			transp: {type: 'text'},
			timezone_name: {type: 'text'},
			allday: {type: 'text'},
			priority: {type: 'text'},
			organizer: {type: 'text'},
			url: {type: 'text'},
			x_tickets_url: {type: 'text'},
			x_instant_event: {type: 'text'},
			x_cost: {type: 'text'},
			x_class: {type: 'text'},
			show_map: {type: 'boolean'},
			show_coordinates: {type: 'boolean'},
			venue_id: {type: 'integer'},
			organizer_id: {type: 'integer'},
			ical_id: {type: 'integer'},
			parent_event_id: {type: 'integer'},
		});
		
		var Category = db.define( 'category', {
			id:  {type: 'serial', key: true},
			category_name: {type: 'text'}
		});

		Event.hasMany('categories', Category, { why: String }, { reverse: 'events', key: true })

		var Venue = db.define( 'venue', {
			id:  {type: 'serial', key: true},
			name: {type: 'text'},
			address: {type: 'text'},
			city: {type: 'text'},
			province: {type: 'text'},
			postal_code: {type: 'text'},
			country: {type: 'text'},
			longitude: {type: 'text'},
			latitude: {type: 'text'},
		});

		Event.hasOne("venue", Venue)

		db.sync(function(err) {
			if (err) throw err;		
		});
	});

	res.render('modelDefine');
});

module.exports = router;
