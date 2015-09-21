var http = require('http');
var fs = require('fs');
var express = require('express');
var router = express.Router();
var icalendar = require('icalendar');
var Sequelize = require('sequelize');
var csv = require('fast-csv');
var request = require('request');
var pg = require('pg');
var hstore = require('pg-hstore')();


/* GET home page. */
router.get('/', function(req, res, next) {
	// Read all the files in the folder holding all the ics files
	fs.readdir('./icsfiles/', function(err, files){
		// Loop through each file
		files.forEach(function(file){
			// Read each file
			fs.readFile('./icsfiles/'+file, 'utf8', function (err,data) {
				// console.log(file);
			  if (err) {
			    return console.log(err); // Throw error if we get one.
			  } else {	
			  	// IF to make sure that it is a calendar using the string that exists in calendar
			  	if (data.match(/END:VCALENDAR/g)) {
			  		var ical = new icalendar.parse_calendar(data); // Parse the calendar into actual data we can use
				  	var events = ical.events(); // Look at the events
				  	// console.log(events.length);
				  	
					// var sequelize = new Sequelize('mysql://root:admin@localhost:3306/timely-dev');  // DB connection credentials	
					var sequelize = new Sequelize('timely-dev', 'donaldlee', '', {
						host: 'localhost',
						dialect: 'postgres',
						pool: {
							maxConnections: 5, 
							minConnections: 0, 
							maxIdleTime: 10000
						}
					});  

					// Define the Event
				  	var Event = sequelize.define( 'event', {
						uid: {type: Sequelize.STRING},
						contact: {type: Sequelize.STRING},
						description: {type: Sequelize.TEXT},
						dtstamp: {type: Sequelize.DATE},
						dtstart: {type: Sequelize.DATE},
						dtend: {type: Sequelize.DATE},
						exdate: {type: Sequelize.DATE},
						sequence: {type: Sequelize.INTEGER},
						summary: {type: Sequelize.TEXT},
						rdate: {type: Sequelize.DATE},
						rrule: {type: Sequelize.ARRAY(Sequelize.STRING)},		
						url: {type: Sequelize.STRING},
						x_tickets_url: {type: Sequelize.STRING},
						x_instant_event: {type: Sequelize.STRING},
						x_cost: {type: Sequelize.STRING},
						parent_event_id: {type: Sequelize.INTEGER}
					});
					// Define the Category	
					var Category = sequelize.define( 'category', {
						category_name: {type: Sequelize.STRING}
					});
					// Define the Venue
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

					Venue.hasMany(Event); // Association between Venue and Event
					Event.belongsTo(Venue); // Association between Event and Venue

					Event.belongsToMany(Category, {through: 'EventCategory'}); // Association between Event and Category
					Category.belongsToMany(Event, {through: 'EventCategory'}); // Association between Category and Event

					sequelize.transaction(function (t1){
						return sequelize.transaction(function (t2) {

							return Promise.all([
								events.forEach (function (e){
							  		var newRecord = {};

							  		if (e.properties["UID"]) {
							  			newRecord.uid = e.properties["UID"][0]["value"];
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
							  	
							  		if (e.properties["DURATION"]) {
							  			newRecord.duration = e.properties["DURATION"][0]["value"];
							  		}
							  		if (e.properties["EXDATE"]) {
							  			newRecord.exdate = e.properties["EXDATE"][0]["value"];
							  		}
							  		if (e.properties["RRULE"]) {
							  			newRecord.rrule = e.properties["RRULE"][0]["value"];
							  		}
							  		if (e.properties["RDATE"]) {
							  			newRecord.rdate = e.properties["RDATE"][0]["value"];
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
							  			
							  			formatted_address = String(locale[0]).split("@"); // Formatting issue
							  			var location = {
							  				name: formatted_address[0],
							  				address: formatted_address[1],
							  				city: locale[1],
							  				country: locale[3],
							  				longitude: geo[1],
							  				latitude: geo[0]
						 	  			}
						 	  			
						 	  			if (locale[2]){
							  				prov = locale[2].split(" ");
							  				location["province"] = prov[1];
							  				location["postal_code"] = String(prov[2]+" "+prov[3]);
							  			} else {
							  				location["province"] = "";
							  				location["postal_code"] = "";
							  			}
							  		}

							  		Event.findOrCreate({where: {uid: newRecord.uid}, defaults: newRecord}).spread( function(tevent, event_created){
									    if(event_created) {
									   		for (x in categories) { // Loop through categories
									    		if (categories[x].length > 0 ) { // If category is not empty
									    			// Find the category in DB / create it
									    			Category.findOrCreate({where: {category_name: categories[x].trim()}, defaults: {category_name: categories[x].trim()}}).spread( function(cat, created){
											  			console.log(cat.get({
													      plain: true
													    }))
													    if(created) { // If it was created, assoiate it with event
													    	tevent.addCategory(created);
													    } else { // It existed, associated it with event.
													    	tevent.addCategory(cat);
													    }
													})
									    		}
									    	}

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
									    	for (x in categories) { // Loop through categories
									    		if (categories[x].length > 0 ) { // If category is not empty
									    			// Find the category in DB / create it
									    			Category.findOrCreate({where: {category_name: categories[x].trim()}, defaults: {category_name: categories[x].trim()}}).spread( function(cat, created){
											  			console.log(cat.get({
													      plain: true
													    }))
													    if(created) { // If it was created, assoiate it with event
													    	tevent.addCategory(created);
													    } else { // It existed, associated it with event.
													    	tevent.addCategory(cat);
													    }
													})
									    		}
									    	}
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
							  	})
							]);													
						});
					});
				}
			  } 
			});
		});
		
	});
	
  	res.render('index', { title: 'Expression' });
});

router.get('/modelDefine', function(req, res, next) {
	var sequelize = new Sequelize('postgres://donaldlee@localhost:5432/timely-dev');  	

  	var Event = sequelize.define( 'event', {
		uid: {type: Sequelize.STRING},
		contact: {type: Sequelize.STRING},
		description: {type: Sequelize.TEXT},
		dtstamp: {type: Sequelize.DATE},
		dtstart: {type: Sequelize.DATE},
		dtend: {type: Sequelize.DATE},
		exdate: {type: Sequelize.DATE},
		sequence: {type: Sequelize.INTEGER},
		summary: {type: Sequelize.TEXT},
		rdate: {type: Sequelize.DATE},
		rrule: {type: Sequelize.ARRAY(Sequelize.STRING)},		
		url: {type: Sequelize.STRING},
		x_tickets_url: {type: Sequelize.STRING},
		x_instant_event: {type: Sequelize.STRING},
		x_cost: {type: Sequelize.STRING},
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

	console.log('Got to here');

	sequelize
	  .sync({ force: true })
	  .then(function(err) {
	    console.log('It worked!');
	  }, function (err) { 
	    console.log('An error occurred while creating the table:', err);
	  });


	res.render('modelDefine');
});


router.get('/read', function(req, res, next) {
	
	var counter = 0;
	var stream = fs.createReadStream('/Users/donaldlee/Desktop/wordpress_calendars.csv');
	var csvStream = csv()
    .on("data", function(data){
    	url = String(data).replace(/\/$/, "")+"/?plugin=all-in-one-event-calendar&controller=ai1ec_exporter_controller&action=export_events";
    	counter = counter + 1;
    	var re = require('request-enhanced');
    	re.get(url, "./icsfiles/"+counter+".ics", function(error, filename){
    		console.log('Saved content to:', filename);	
    	});
    })
    .on("end", function(){
         console.log("done");
    });
    stream.pipe(csvStream);
    res.render('modelDefine');
});

module.exports = router;


// Loop through CSV file
// Append ?plugin=all-in-one-event-calendar&controller=ai1ec_exporter_controller&action=export_events to end of link
// Download File in Location
// Run Script
// Delete File

