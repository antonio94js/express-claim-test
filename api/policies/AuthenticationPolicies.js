import passport from 'passport';

const sessionConfig = {
        session: false,
};
class AuthenticationPolicies {

    async localAuth(req, res, next) {
        const cb = (err, accessToken, missingCredentials) => {
            if (missingCredentials) {
                return next(new AuthenticationError('MissingCredentials', 'You have missing some credentials fields.'));
            } else if (err) {
                return next(err);
            }
            req.logIn(accessToken, sessionConfig, (e) => {
                if (e) return next(e);
                return next();
            });
        };
        passport.authenticate('local', cb)(req, res, next);
    }

    async jwt(req, res, next) {

        const cb = async (internalErr, user, tokenError) => {
            if (tokenError && tokenError.name === 'TokenExpiredError') {
                next(new AuthenticationError('InvalidAccessToken', 'The Authentication token has expired'));
            }
            if (tokenError && tokenError.name === 'JsonWebTokenError') {
                next(new AuthenticationError('InvalidAccessToken', 'The Authentication token is invalid or was vulnerated'));
            }
            if (tokenError) {
                next(new AuthenticationError('InvalidAccessToken', 'Invalid token, Format is Authorization: Bearer [token]'));
            }
            if (internalErr) {
                next(internalErr);
            }
            req.logIn(user, sessionConfig, (errLogin) => {
                if (errLogin) return next(internalErr);
                return next();
            });
        };
        return passport.authenticate('jwt', cb)(req, res, next);
    }
}

const policy = new AuthenticationPolicies();

export default policy;
