var dbm = global.dbm || require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
	db.createTable( 'categories', {
		id: { type: 'int', primaryKey: true, autoIncrement: true },
		category_name: 'string'
	}, callback );
};

exports.down = function(db, callback) {
  callback();
};
