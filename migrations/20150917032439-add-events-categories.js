var dbm = global.dbm || require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
	db.createTable( 'events_categories', {
		event_id: 'int',
		category_id: 'int'
	}, callback );
};

exports.down = function(db, callback) {
  callback();
};
