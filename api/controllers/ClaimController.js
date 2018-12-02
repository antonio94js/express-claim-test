import R from 'ramda';

const justValidFields = R.pick(['fligth_code', 'description', 'record_id']);

class ClaimController {
    async create(req, res) {
        const { id: claimer_id } = req.user;
        const payload = R.merge(justValidFields(req.body), { claimer_id });
        const claim = await Claim.create(payload);
        res.json(201, claim);
    }
    async getAll(req, res) {
        const claims = await Claim.getAll(req.query);
        res.json(claims);
    }
    async getMyClaim(req, res) {
        const { id: userId } = req.user;
        const claims = await Claim.giveMeMy(userId);
        res.json(claims);
    }

    async getById(req, res) {
        const { claimId } = req.params;
        const { id: userId } = req.user;
        const claim = await Claim.getByIdAndUser(claimId, userId);
        res.json(claim);
    }

    async assign(req, res) {
        const { claimId } = req.params;
        const { id: attendantId } = req.user;
        await Claim.assignToAttendant(claimId, attendantId);
        res.send(204);
    }
    async close(req, res) {
        const { claimId } = req.params;
        const { id: attendantId } = req.user;
        await Claim.close(claimId, attendantId);
        res.send(204);
    }
    async remove(req, res) {
        const { claimId } = req.params;
        await Claim.remove(claimId);
        res.send(204);
    }

}

const controller = new ClaimController();

export default controller;
