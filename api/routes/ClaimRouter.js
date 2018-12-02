import { Router } from 'express';
import ClaimController from '../controllers/ClaimController';
import AuthorizationPolicies from '../policies/AuthorizationPolicies';
import ClaimPolicies from '../policies/ClaimPolicies';

const { isRol } = AuthorizationPolicies;
const { isMyClaim } = ClaimPolicies;

const isAdmin = isRol('admin');
const isUser = isRol('user');
const isMyClaimLikeAttendant = isMyClaim('attendant');

const router = Router();
router
    .post('/', isUser, errorWrap(ClaimController.create))
    .put('/:id/assign', isAdmin, errorWrap(ClaimController.assign))
    .put('/:id/close', isAdmin, isMyClaimLikeAttendant, errorWrap(ClaimController.close))

export default router;
