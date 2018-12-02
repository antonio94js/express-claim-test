class RecordController {
    async get(req, res) {
        const { claimId } = req.params;
        const record = await Record.getByClaim(claimId);
        res.json(record);
    }

}

const controller = new RecordController();

export default controller;
