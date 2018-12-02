import R from 'ramda';

class ClaimPolicies {
    isMyClaim(type) {
        type = type === 'claimer' ? 'claimer_id' : 'attendant_id';
        const isClaimMiddleware = async (req, res, next) => {
            const { user: { id } } = req;
            const { id: claimId } = req.params;
            const claim = await Claim.findOne({ where: { [type]: id, id: claimId } });
            if (!claim) {
                next(new ClaimError('NotAssignedClaim', 'This claim does not belong to you.'));
            }
            return next();
        };
        return isClaimMiddleware;
    }
}
const policy = new ClaimPolicies();

module.exports = policy;
