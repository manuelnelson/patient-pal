import mongoose from 'mongoose';
import SeedTargetType from './seed/targetType';
import SeedDdt from './seed/dttType';
import SeedOrganization from './seed/organization';

export default callback => {
	mongoose.Promise = require('bluebird');
	let mongoUri = process.env.MONGODB_URI || process.env.MONGO_HOST;
	mongoose.connect(mongoUri);
	let db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', () => {
		//check update scripts
		SeedTargetType
			.any()
			.then(targets => SeedTargetType.run(targets))

		SeedDdt
			.any()
			.then(ddts => SeedDdt.run(ddts))

			SeedOrganization
			.noEmail()
			.then(organizations => SeedOrganization.run(organizations))

		// we're connected!
		  callback(db);
	});

}
