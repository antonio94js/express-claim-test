import passport from 'passport';

class AuthenticationPolicies {

//   async isTokenInRequest(req, res, next) {
//       if (req.body.access_token || req.query.access_token || req.header.access_token) {
//           next();
//           return;
//       }
//       throw new AuthenticationError('MissingToken', 'You haven\'t provided an access token.');
//   }

  async jwt(req, res, next) {
    const sessionConfig = {
        jwtSession: {
            session: false,
        },
    };
    const cb = async (internalErr, user, tokenError) => {
      if (tokenError && tokenError.name === 'TokenExpiredError') {
        throw new AuthenticationError('InvalidAccessToken', 'The Authentication token has expired');
      }
      if (tokenError && tokenError.name === 'JsonWebTokenError') {
        throw new AuthenticationError('InvalidAccessToken', 'The Authentication token is invalid or was vulnerated');
      }
      if (tokenError) {
        throw new AuthenticationError('InvalidAccessToken', 'Invalid token, Format is Authorization: Bearer [token]');
      }
      if (internalErr) {
        next(internalErr);
      }
      req.logIn(user, sessionConfig, (errLogin) => {
        if (errLogin) {
            return next(internalErr);
        }
        return next();
    });
      await next();
    };
    return passport.authenticate('jwt', cb)(req, res, next);
  }

}

module.exports = AuthenticationPolicies;
