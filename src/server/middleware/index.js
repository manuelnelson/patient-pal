import { Router } from 'express';
import path  from 'path';
export default ({ config, db }) => {
	let routes = Router();

	// add middleware here
	routes.get('/', ({req,res}) => {res.sendFile(path.resolve('dist/public/index.html'));})

	return routes;
}
