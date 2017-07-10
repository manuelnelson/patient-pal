import mongoose from 'mongoose';
import SeedTargetType from './seed/targetType';
import SeedDdt from './seed/ddtType';

export default callback => {
	mongoose.Promise = require('bluebird');
	mongoose.connect('mongodb://localhost/boilerplate');
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', () => {
		//check update scripts
		SeedTargetType
			.any()
			.then(targets => SeedTargetType.run(targets))

		SeedDdt
			.any()
			.then(ddts => SeedDdt.run(ddts))

		  // we're connected!
		  callback(db);
	});

}
