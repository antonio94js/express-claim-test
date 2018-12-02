import R from 'ramda';
import uuidv4 from 'uuid/v4';

const justValidFields = R.pick(['fligth_code', 'description', 'record_id']);

class ClaimController {
    async create(req, res) {
        const { id: claimer } = req.user;
        const id = uuidv4();
        const payload = R.merge(justValidFields(req.body), { claimer, id });
        const claim = await Claim.create(payload);
        res.json(201, claim);
    }

}

const controller = new ClaimController();

export default controller;
