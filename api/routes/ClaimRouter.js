import { Router } from 'express';
import ClaimController from '../controllers/ClaimController';
import AuthorizationPolicies from '../policies/AuthorizationPolicies';
import ClaimPolicies from '../policies/ClaimPolicies';

const { isRol } = AuthorizationPolicies;
const { isMyClaim } = ClaimPolicies;

const isAdmin = isRol('admin');
const isUser = isRol('user');
const isMyClaimLikeAttendant = isMyClaim('attendant');
const isMyClaimLikeClaimer = isMyClaim('claimer');

const router = Router();
router
    .post('/', isUser, errorWrap(ClaimController.create))
    .get('/', isAdmin, errorWrap(ClaimController.getAll))
    .get('/:id', errorWrap(ClaimController.getById))
    .put('/:id/assign', isAdmin, errorWrap(ClaimController.assign))
    .put('/:id/close', isAdmin, isMyClaimLikeAttendant, errorWrap(ClaimController.close))
    .delete('/:id', isUser, isMyClaimLikeClaimer, errorWrap(ClaimController.remove))

export default router;
