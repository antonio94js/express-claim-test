import R from 'ramda';

class RecordController {
    async get(req, res) {
        const { recordId } = req.params;
        const record = await Record.get(recordId);
        res.json(record);
    }

}

const controller = new RecordController();

export default controller;
