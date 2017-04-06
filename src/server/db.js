import mongoose from 'mongoose';
export default callback => {
	mongoose.connect('mongodb://localhost/boilerplate');
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', () => {
	  // we're connected!
	  callback(db);
	});

}
