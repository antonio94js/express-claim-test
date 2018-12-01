import { Router } from 'express';
import BaseController from '../controllers/BaseController';

const router = Router();
router
    .get('/', errorWrap(BaseController.get));

export default router;
