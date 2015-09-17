var dbm = global.dbm || require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
	db.createTable( 'events', {
		id: { type: 'int', primaryKey: true, autoIncrement: true },
		attach: 'string',
		attendee: 'string',
		uid: 'string',
		comment: 'string',
		contact: 'string',
		description: 'text',
		created: 'timestamp',
		dtstamp: 'datetime',
		dtstart: 'datetime',
		dtend: 'date',
		duration: 'string',
		exdate: 'date',
		rxrule: 'string',
		last_modified: 'string', 
		sequence: 'int',
		summary: 'text',
		rdate: 'date',
		exception_date: 'date',
		recurence_id: 'int',
		related_to: 'string',
		resources: 'string',
		rrule: 'string',
		exception_rule: 'string',
		request_status: 'string',
		status: 'string',
		transp: 'string',
		timezone_name: 'string',
		allday: 'string',
		priority: 'string',
		organizer: 'string',
		url: 'string',
		x_tickets_url: 'string',
		x_instant_event: 'string',
		x_cost: 'decimal',
		x_class: 'string',
		show_map: 'boolean',
		show_coordinators: 'boolean',
		venue_id: 'int',
		organizer_id: 'int',
		ical_id: 'int',
		parent_event_id: 'int'
	}, callback);
};

exports.down = function(db, callback) {
  callback();
};
