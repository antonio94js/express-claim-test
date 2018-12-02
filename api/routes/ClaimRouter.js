import { Router } from 'express';
import ClaimController from '../controllers/ClaimController';
import AuthenticationPolicies from '../policies/AuthenticationPolicies';

// const { isRol } = AuthenticationPolicies;
// const isAdmin = isRol('admin');
// const isUser = isRol('user');
// const isUserOrAdmin = isRol(['user', 'admin']);

const router = Router();
router
    .post('/', errorWrap(ClaimController.create));

export default router;
