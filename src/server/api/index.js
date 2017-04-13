import { version } from '../../../package.json';
import { Router } from 'express';
import userRoutes from './user-routes';
import authRoutes from './auth-routes';
import patientRoutes from './patient-routes';

export default ({ config, db }) => {
	let api = Router();

	// mount user routes at /users
	api.use('/users', userRoutes);
	api.use('/auth', authRoutes);
	api.use('/patients', patientRoutes);

	// perhaps expose some API metadata at the root
	api.get('/', (req, res) => {
		res.json({ version });
	});

	return api;
}
