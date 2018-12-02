import { Router } from 'express';
import BaseRouter from './BaseRouter';
import ClaimRouter from './ClaimRouter';
import AuthRouter from './AuthRouter';
import AuthenticationPolicies from '../policies/AuthenticationPolicies';

const { jwt: isAuth } = AuthenticationPolicies;

const router = Router();

router
    .use('/v1/claim', isAuth, ClaimRouter)
    .use('/v1/base', isAuth, BaseRouter)
    .use('/v1/auth', AuthRouter)


export default router;
