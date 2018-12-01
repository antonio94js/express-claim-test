
class BaseController {
    async get(req, res, next) {
        // await Base.findAll();
        res.json({});
    }

}

const controller = new BaseController();

export default controller;