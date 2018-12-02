import './log';
import R from 'ramda';
import middlewares from './middlewares';
import web from './web';
import error from './errors';
import router from './router';
import db from './db';
import passport from './passport';

/* Graceful Shutdown our Http Server */
const gracefulShutdown = async (db) => {
    //close the db connection gracefully when the process is ended by an specific signal
    try {
        await db.close();
        winston.info('The connection to the DB was closed gracefully')
        process.exit(0)

    } catch (error) {
        winston.error('Error closing the DB connection')
        process.exit(1)
    }
} 

const SIGNALS = ['SIGINT', 'SIGQUIT', 'SIGTERM'];

const setSignals = gracefully => R.reduce((process, signal) => {
    // Remove all the previous listener to avoid an unnecesary memory leak;
    process.removeAllListeners(signal);
    // Set new listener to execute the gracefulShutdown function
    process.on(signal, gracefully);
    // return the accumulator
    return process;
}, process);

export default {
    setAppConfig: R.compose(
        error,
        router,
        middlewares,
    ),
    async startServer(app) {
        try {
            const sequelize = await db.startConnection();
            winston.info('DB connection has been established successfully.');
            const server = app.listen(web.port, '0.0.0.0', async (err) => {
                if (err) {
                    // In case of an error, close the previous connection
                    await sequelize.connectionManager.close();
                    throw err;
                } 
                setSignals(gracefulShutdown.bind(null, sequelize))(SIGNALS);
                passport.loadStrategies();
                winston.info(`Server is running on port ${web.port} :)`);
            });
            return server;
        } catch (error) {
            winston.error(error)  
        }
    },
};
