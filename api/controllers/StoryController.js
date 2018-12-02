import R from 'ramda';

const justValidFields = R.pick(['question', 'record_id']);

class StoryController {
    async create(req, res) {
        // const { id: claimer } = req.user;
        const { recordId } = req.params;
        const payload = R.merge(justValidFields(req.body), { record_id: recordId });
        const story = await Claim.create(payload);
        res.json(201, story);
    }
    // async create(req, res) {
    //     // const { id: claimer } = req.user;
    //     const { recordId } = req.params;
    //     const payload = R.merge(justValidFields(req.body), { record_id: recordId });
    //     const story = await Claim.create(payload);
    //     res.json(201, story);
    // }
    async close(req, res) {
        const { id: claimId } = req.params;
        const { id: attendantId } = req.user;
        await Claim.close(claimId, attendantId);
        res.send(204);
    }

}

const controller = new StoryController();

export default controller;
