import { version } from '../../../package.json';
import { Router } from 'express';
import userRoutes from './user-routes';
import authRoutes from './auth-routes';
import patientRoutes from './patient-routes';
import professionalRoutes from './professional-routes';
import appointmentRoutes from './appointment-routes';
import targetTypeRoutes from './target-type-routes';
import dttTypeRoutes from './dtt-type-routes';
import skillRoutes from './skill-routes';
import curriculumRoutes from './curriculum-routes';
import clientCurriculumRoutes from './client-curriculum-routes';

export default ({ config, db }) => {
	let api = Router();

	// mount user routes at /users
	api.use('/users', userRoutes);
	api.use('/auth', authRoutes);
	api.use('/patients', patientRoutes);
	api.use('/professionals', professionalRoutes);
	api.use('/appointments', appointmentRoutes);
	api.use('/targettypes', targetTypeRoutes);
	api.use('/dtttypes', dttTypeRoutes);
	api.use('/skills', skillRoutes);
	api.use('/curriculums', curriculumRoutes);
	api.use('/clientcurriculums', clientCurriculumRoutes);

	// perhaps expose some API metadata at the root
	api.get('/', (req, res) => {
		res.json({ version });
	});

	return api;
}
