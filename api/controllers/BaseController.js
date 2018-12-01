
class BaseController {
    async get(req, res, next) {
        // const { Base  } = models;
        const Base = await Base.findAll();
        res.json(Base);
    }

}

const controller = new AuthorController();

export default controller;