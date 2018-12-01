import config from './config';

/**
 * @class ErrorCore
 * @classdesc Error main core for the express app
 * @author Antonio Mejias 
 */
class ErrorCore {

    constructor() {
        config.buildErrors();
    }
    /**
	 * @method notFoundRouter
	 * @description Catch every 404 request for the API
	 * @author AntonioMejias 
	 */
    notFoundRouter(req, res, next) {
        res.status(404).send({
            message: 'There is not a resource that matches with the request URI',
            endpoint: req.url,
            method: req.method,
        });
    }

    /**
	 * @method globalErrorHandler
	 * @description This global handler catch every error thrown by an async function
	 * @author AntonioMejias 
	 */
    globalErrorHandler(err, req, res, next) {
        winston.error(err);
        res.status(err.status || 500).json(err.fullContent || err);
    }

}

const error = new ErrorCore();

export default (app) => {
    app.use(error.notFoundRouter);
    app.use(error.globalErrorHandler);
    return app;
};
