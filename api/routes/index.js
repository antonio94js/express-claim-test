import { Router } from 'express';
import BaseRouter from './BaseRouter';

const router = Router();

router
    .use('/v1/base', BaseRouter)


export default router;
