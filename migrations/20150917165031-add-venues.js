var dbm = global.dbm || require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
	db.createTable( 'venues', {
		id: { type: 'int', primaryKey: true, autoIncrement: true },
		name: 'string',
		address: 'string',
		city: 'string',
		province: 'string',
		postal_code: 'string',
		country: 'string',
		longitude: 'string',
		latitude: 'string'
	}, callback );
};

exports.down = function(db, callback) {
  callback();
};
