import { version } from '../../../package.json';
import { Router } from 'express';
import userRoutes from './user-routes';

export default ({ config, db }) => {
	let api = Router();

	// mount user routes at /users
	api.use('/users', userRoutes);

	// perhaps expose some API metadata at the root
	api.get('/', (req, res) => {
		res.json({ version });
	});

	return api;
}
