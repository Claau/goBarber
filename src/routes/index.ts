import { Router } from 'express';
import appointentsRouter from './appoiments.routes';

const routes = Router();

routes.use('/appointments', appointentsRouter)

export default routes;