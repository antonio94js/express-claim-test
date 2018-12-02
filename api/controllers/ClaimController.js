import R from 'ramda';

const justValidFields = R.pick(['fligth_code', 'description', 'record_id']);

class ClaimController {
    async create(req, res) {
        const { id: claimer } = req.user;
        const payload = R.merge(justValidFields(req.body), { claimer });
        const claim = await Claim.create(payload);
        res.json(201, claim);
    }
    async assign(req, res) {
        const { id: claimId } = req.params;
        const { id: attendantId } = req.user;
        await Claim.assignToAttendant(claimId, attendantId);
        res.send(204);
    }
    async close(req, res) {
        const { id: claimId } = req.params;
        const { id: attendantId } = req.user;
        await Claim.close(claimId, attendantId);
        res.send(204);
    }

}

const controller = new ClaimController();

export default controller;
