import R from 'ramda';

const justValidFields = R.pick(['question', 'record_id']);

class StoryController {
    async create(req, res) {
        // const { id: claimer } = req.user;
        const { recordId } = req.params;
        const payload = R.merge(justValidFields(req.body), { record_id: recordId });
        const story = await Story.create(payload);
        res.json(201, story);
    }
    // async create(req, res) {
    //     // const { id: claimer } = req.user;
    //     const { recordId } = req.params;
    //     const payload = R.merge(justValidFields(req.body), { record_id: recordId });
    //     const story = await Claim.create(payload);
    //     res.json(201, story);
    // }
    async reply(req, res) {
        const { recordId, storyId } = req.params;
        await Story.reply(recordId, storyId, req.body.answer);
        res.send(204);
    }

}

const controller = new StoryController();

export default controller;
