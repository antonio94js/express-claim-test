import { Router } from 'express';
import ClaimController from '../controllers/ClaimController';
import AuthorizationPolicies from '../policies/AuthorizationPolicies';

const { isRol } = AuthorizationPolicies;
const isAdmin = isRol('admin');
const isUser = isRol('user');
// const isUserOrAdmin = isRol(['user', 'admin']);

const router = Router();
router
    .post('/', isUser, errorWrap(ClaimController.create))
    .put('/:id/assign', isAdmin, errorWrap(ClaimController.assign))

export default router;
